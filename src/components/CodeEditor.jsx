import { useEffect, useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CodeEditor({ file, onSave }) {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [loading, setLoading] = useState(false);
  const [panelHeight, setPanelHeight] = useState(130);
  const [fullscreen, setFullscreen] = useState(false);

  const panelRef = useRef(null);
  const editorContainerRef = useRef(null);
  const isResizing = useRef(false);

  useEffect(() => {
    if (file) setCode(file.code || "");
    else setCode("");
    setOutput("");
  }, [file]);

  const mapToMonaco = (lang) => {
    switch (lang.toLowerCase()) {
      case "java": return "java";
      case "python": return "python";
      case "c++": return "cpp";
      case "javascript": return "javascript";
      default: return "plaintext";
    }
  };

  const mapLanguageId = (lang) => {
    switch (lang.toLowerCase()) {
      case "c++": return 54;
      case "python": return 71;
      case "java": return 62;
      case "javascript": return 63;
      default: return 1;
    }
  };

  const handleRun = async () => {
    if (!file) return;
    setLoading(true);
    setOutput("");

    try {
      const response = await fetch(
        "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source_code: code,
            language_id: mapLanguageId(file.language),
            stdin: input || "",
          }),
        }
      );

      const result = await response.json();

      if (result.stdout) setOutput(result.stdout);
      else if (result.stderr) setOutput(result.stderr);
      else if (result.compile_output) setOutput(result.compile_output);
      else setOutput("No output");
    } catch (err) {
      setOutput("Error: " + err.message);
    }

    setLoading(false);
  };

  const handleSave = async () => {
    if (!file) return;
    await onSave({ ...file, code });
    toast.success("Code saved successfully!");
  };

  const startResize = (e) => {
    isResizing.current = true;
    document.addEventListener("mousemove", resizePanel);
    document.addEventListener("mouseup", stopResize);
  };

  const resizePanel = (e) => {
    if (!isResizing.current) return;
    const editorTop = editorContainerRef.current.getBoundingClientRect().top;
    const newHeight = window.innerHeight - e.clientY - 20;
    if (newHeight > 60 && newHeight < window.innerHeight / 2) {
      setPanelHeight(newHeight);
    }
  };

  const stopResize = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", resizePanel);
    document.removeEventListener("mouseup", stopResize);
  };

  const toggleFullscreen = () => setFullscreen(!fullscreen);

  if (!file) {
    return (
      <div
        className="d-flex justify-content-center align-items-center text-muted"
        style={{
          flex: 1,
          backgroundColor: "#0b0f14",
          borderRadius: 8,
          color: "white",
          height: "80vh",
        }}
      >
        <h5>Select or create a file to start coding...</h5>
      </div>
    );
  }

  return (
    <div
      ref={editorContainerRef}
      style={{
        height: fullscreen ? "100vh" : "85vh",
        width: fullscreen ? "100vw" : "100%",
        position: fullscreen ? "fixed" : "relative",
        top: fullscreen ? 0 : "auto",
        left: fullscreen ? 0 : "auto",
        zIndex: fullscreen ? 9999 : "auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0b0f14",
        borderRadius: "12px",
        boxShadow: "0 0 20px rgba(0,255,255,0.15)",
        padding: "10px",
      }}
    >
      <ToastContainer position="top-right" autoClose={1500} />

      {/* ---------- Top Bar ---------- */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="text-info mb-0">{file.name}</h6>
        <div className="d-flex align-items-center gap-2">
          <select
            className="form-select form-select-sm bg-dark text-light border-secondary"
            style={{ width: 130 }}
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="vs-dark">Dark</option>
            <option value="light">Light</option>
            <option value="hc-black">High Contrast</option>
            <option value="vs">Classic</option>
          </select>

          <input
            type="range"
            min="12"
            max="24"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="form-range"
            style={{ width: "100px" }}
          />

          <button
            className="btn btn-sm px-3"
            onClick={handleRun}
            disabled={loading}
            style={{
              fontWeight: 600,
              background: "linear-gradient(90deg, #1E90FF, #00BFFF)",
              border: "none",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm text-light"></span>
            ) : (
              "▶ Run"
            )}
          </button>

          <button
            className="btn btn-sm btn-outline-info px-3"
            onClick={handleSave}
            style={{ fontWeight: 600 }}
          >
            💾 Save
          </button>

          <button
            className="btn btn-sm btn-outline-warning px-3"
            onClick={toggleFullscreen}
          >
            {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
        </div>
      </div>

      {/* ---------- Editor ---------- */}
      <div style={{ flex: 1, borderRadius: "8px", overflow: "hidden" }}>
        <Editor
          height="100%"
          language={mapToMonaco(file.language)}
          value={code}
          theme={theme}
          onChange={(value) => setCode(value)}
          options={{
            automaticLayout: true,
            fontSize: fontSize,
            minimap: { enabled: false },
          }}
        />
      </div>

      {/* ---------- Resizable Input & Output ---------- */}
      <div
        ref={panelRef}
        className="mt-3 d-flex gap-3"
        style={{ height: panelHeight }}
      >
        <div
          className="p-2 rounded bg-dark text-light"
          style={{ flex: 1 }}
        >
          <h6 className="text-warning mb-1">Input:</h6>
          <textarea
            className="form-control bg-black text-light border-secondary"
            style={{ height: "100%", resize: "none" }}
            placeholder="Enter input values..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div
          className="p-2 rounded bg-dark text-light"
          style={{ flex: 1 }}
        >
          <h6 className="text-success mb-1">Output:</h6>
          <pre
            className="text-success"
            style={{
              fontFamily: "Courier New",
              height: "100%",
              overflowY: "auto",
              backgroundColor: "#000",
              padding: "8px",
              borderRadius: "6px",
            }}
          >
            {output || "Output will appear here..."}
          </pre>
        </div>

        {/* ---------- Drag Handle ---------- */}
        {/* <div
          style={{
            width: "5px",
            cursor: "row-resize",
            backgroundColor: "#0ff",
            borderRadius: "2px",
          }}
          onMouseDown={startResize}
        /> */}
      </div>
    </div>
  );
}

export default CodeEditor;
