import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    // 🔗 Later: connect this with your MongoDB API endpoint
  };

  return (
    <div className="auth-container">
      <h1 className="auth-logo">
        codePrep<span className="x-3d">X</span>
      </h1>
      <div className="auth-box">
        <h2>Create Your Account</h2>
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
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-auth">Sign Up</button>
        </form>

        <p className="redirect-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
