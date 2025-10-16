import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import FolderSidebar from "../components/FolderSidebar";
import CodeEditor from "../components/CodeEditor";
import CreateFolderModal from "../components/CreateFolderModal";
import CreateFileModal from "../components/CreateFileModal";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [folders, setFolders] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [activeFolderId, setActiveFolderId] = useState(null);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    const res = await api.getFolders();
    setFolders(res.data);
  };

  const handleSelectFile = (file) => {
    setSelectedFile(file);
  };

  const handleSaveFile = async (file) => {
    await api.saveFile(activeFolderId, file);
    fetchFolders();
  };

  const handleRunCode = async (file) => {
    const res = await api.runCode(file);
    return res;
  };

  // ------------------- CREATE -------------------
  const handleCreateFolder = async (name) => {
    if (!name) return;
    await api.createFolder(name);
    setShowFolderModal(false);
    fetchFolders();
  };

  const handleCreateFile = async (folderId, fileName, language) => {
    if (!fileName) return;
    await api.createFile(folderId, fileName, language);
    setShowFileModal(false);
    fetchFolders();
  };

  // ------------------- DELETE -------------------
  const handleDeleteFolder = async (folderId) => {
    if (!window.confirm("Are you sure you want to delete this folder?")) return;
    await api.deleteFolder(folderId);
    if (selectedFile?.folderId === folderId) setSelectedFile(null);
    fetchFolders();
  };

  const handleDeleteFile = async (folderId, fileId) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    await api.deleteFile(folderId, fileId);
    if (selectedFile?.id === fileId) setSelectedFile(null);
    fetchFolders();
  };

  return (
    <div className="d-flex">
      <div style={{ width: 320 }} className="folder-sidebar">
        <FolderSidebar
          folders={folders}
          onSelectFile={handleSelectFile}
          onCreateFolder={() => setShowFolderModal(true)}
          onOpenCreateFile={(folderId) => { setActiveFolderId(folderId); setShowFileModal(true); }}
          onDeleteFolder={handleDeleteFolder}
          onDeleteFile={handleDeleteFile}
        />
      </div>

      <div className="flex-grow-1">
        <Navbar />
        <div className="p-3">
          {selectedFile ? (
            <CodeEditor
              file={selectedFile}
              onSave={handleSaveFile}
              onRun={handleRunCode}
            />
          ) : (
            <div className="text-center text-muted mt-5">
              Welcome {user?.name || "Student"}. Select or create a file to start coding.
            </div>
          )}
        </div>
      </div>

      <CreateFolderModal
        show={showFolderModal}
        onHide={() => setShowFolderModal(false)}
        onCreate={handleCreateFolder}
      />

      <CreateFileModal
        show={showFileModal}
        onHide={() => setShowFileModal(false)}
        folderId={activeFolderId}
        onCreate={handleCreateFile}
      />
    </div>
  );
}

export default Dashboard;
