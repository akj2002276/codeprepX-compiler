import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Landing.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Landing() {
  const compilerData = [
    {
      lang: "C++",
      codeLines: [
        "#include <iostream>",
        "using namespace std;",
        "bool isPrime(int n) {",
        "  if (n < 2) return false;",
        "  for (int i = 2; i * i <= n; i++)",
        "    if (n % i == 0) return false;",
        "  return true;",
        "}",
        "int main() {",
        "  int n = 7;",
        "  cout << (isPrime(n) ? \"Prime\" : \"Not Prime\");",
        "  return 0;",
        "}"
      ]
    },
    {
      lang: "Python",
      codeLines: [
        "def is_prime(n):",
        "  if n < 2:",
        "    return False",
        "  for i in range(2, int(n ** 0.5) + 1):",
        "    if n % i == 0:",
        "      return False",
        "  return True",
        "",
        "print('Prime' if is_prime(7) else 'Not Prime')"
      ]
    },
    {
      lang: "Java",
      codeLines: [
        "public class Main {",
        "  static boolean isPrime(int n) {",
        "    if (n < 2) return false;",
        "    for (int i = 2; i * i <= n; i++)",
        "      if (n % i == 0) return false;",
        "    return true;",
        "  }",
        "  public static void main(String[] args) {",
        "    System.out.println(isPrime(7) ? \"Prime\" : \"Not Prime\");",
        "  }",
        "}"
      ]
    },
    {
      lang: "JavaScript",
      codeLines: [
        "function isPrime(n) {",
        "  if (n < 2) return false;",
        "  for (let i = 2; i * i <= n; i++)",
        "    if (n % i === 0) return false;",
        "  return true;",
        "}",
        "console.log(isPrime(7) ? 'Prime' : 'Not Prime');"
      ]
    }
  ];

  const logos = [
    {
      name: "C++",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
    },
    {
      name: "Python",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
    },
    {
      name: "Java",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
    },
    {
      name: "JavaScript",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
    }
  ];

  // Floating support chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    alert("Thanks for reaching out! We'll reply soon.");
    setMessage("");
    setChatOpen(false);
  };

  return (
    <div className="landing-dashboard">
      {/* HERO SECTION */}
      <header className="hero-section d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className="display-4 fw-bold text-glow">
          codePrep
          <span className="x-3d">X</span> Cloud Compiler
        </h1>
        <p className="formerly mt-2">
          Formerly <strong>CodePrep Academy</strong>
        </p>

        <div className="cta-buttons mt-4">
          <Link to="/signup" className="btn btn-primary btn-lg mx-2">
            Register for Free
          </Link>
          <Link to="/login" className="btn btn-outline-light btn-lg mx-2">
            Use Paid Version
          </Link>
        </div>

        {/* SUPPORTED LANGUAGES SECTION */}
        <p className="supported-text mt-5">
          Our Cloud Compiler supports <strong>4 programming languages</strong> ⚡
        </p>

        <div className="logo-row">
          {logos.map((logo, index) => (
            <div key={index} className="logo-3d">
              <img src={logo.url} alt={logo.name} />
              <p>{logo.name}</p>
            </div>
          ))}
        </div>

        {/* CLOUD CODING SECTION */}
        <section className="cloud-coding text-center mt-5">
          <h2 className="headline">Code. Save. Repeat.</h2>
          <p className="subtext">
            No setup. No installations. Just open your browser and start coding in
            <span className="highlight"> C++</span>,
            <span className="highlight"> Python</span>,
            <span className="highlight"> Java</span>, or
            <span className="highlight"> JavaScript</span>. Your code auto-saves in
            the cloud — ready whenever you are.
          </p>

          <button className="btn-coding mt-4">
            <span className="typing-text">Try Now ▶</span>
          </button>
        </section>

        {/* NEW PROMO SECTION */}
        {/* <section className="instant-access text-center mt-5">
          <h2 className="headline-short">Instant Access</h2>
          <p className="subtext-small">
            No installation. No setup. Just sign in and start coding instantly in your
            favorite language. Experience real-world coding — right in your browser.
          </p>
          <button className="btn btn-outline-success try-btn mt-3">
            Try Now &lt;/&gt;
          </button>
        </section> */}

        {/* COMPILER ANIMATION SECTION */}
        <div className="compiler-section mt-5">
          {compilerData.map((item, idx) => (
            <CompilerBox key={idx} lang={item.lang} codeLines={item.codeLines} />
          ))}
        </div>
      </header>

      {/* SUPPORT SECTION */}
      <section className="support-section text-center mt-5">
        <p className="support-text">
          Need help? Reach us at{" "}
          <a href="mailto:support@codeprep.in">support@codeprep.in</a>
        </p>
      </section>

      {/* FOOTER */}
      <footer className="footer text-center mt-5 py-3">
        <p>&copy; 2025 CodePrepX. All rights reserved.</p>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/919999999999" // replace with your number
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>

      {/* FLOATING SUPPORT CHAT */}
      <div className="floating-support">
        <button className="support-btn" onClick={() => setChatOpen(!chatOpen)}>
          <i className="fas fa-headset"></i>
        </button>

        {chatOpen && (
          <div className="support-chat-box">
            <h6>Support Chat</h6>
            <form onSubmit={handleSend}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                rows="3"
              ></textarea>
              <button type="submit" className="btn btn-sm btn-primary mt-2">
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function CompilerBox({ lang, codeLines }) {
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setVisibleLines(codeLines.slice(0, i + 1));
      i++;
      if (i === codeLines.length) clearInterval(interval);
    }, 300);
    return () => clearInterval(interval);
  }, [codeLines]);

  return (
    <div className="compiler-card">
      <div className="compiler-header">{lang}</div>
      <pre className="code-sample">
        {visibleLines.map((line, idx) => (
          <span key={idx}>{line + "\n"}</span>
        ))}
        <span className="cursor">|</span>
      </pre>
    </div>
  );
}

export default Landing;
