import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaLaptopCode } from "react-icons/fa"; // workspace icon

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent px-3">
      <div className="container-fluid">
        <span className="navbar-brand d-flex align-items-center">
          <FaLaptopCode size={24} className="me-2 text-light" />
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3ab0ff' }}>
            codePrep
            <span
              style={{
                color: 'silver',
                fontWeight: 'bold',
                textShadow: '1px 1px 2px #fff, 2px 2px 4px #aaa',
                transition: 'transform 0.3s, text-shadow 0.3s',
                fontSize: '1.5rem',
              }}
            >
              X
            </span>{" "}
            Workspace
          </span>
        </span>

        <div className="d-flex align-items-center">
          <button className="btn btn-sm btn-outline-light" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
