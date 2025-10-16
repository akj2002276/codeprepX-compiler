import { useState } from "react";
import { Link } from "react-router-dom";
import  "../styles/Auth.css";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // 🔗 Later: connect this with MongoDB login endpoint
  };

  return (
    <div className="auth-container">
      <h1 className="auth-logo">
        codePrep<span className="x-3d">X</span>
      </h1>
      <div className="auth-box">
        <h2>Welcome Back!</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-auth">Login</button>
        </form>

        <p className="redirect-text">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
