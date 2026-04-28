import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [masterPassword, setMasterPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", {
        username,
        masterPassword,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <h1>KeyKeep</h1>
        <div>
          <p className="auth-tagline">Protected personal vault.</p>
          <p className="auth-description">
            Tired of resetting accounts? Centralize your credentials in a clean,
            intuitive dashboard designed to get you into your favorite apps
            faster.
          </p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form">
          <h2>Login to Your Vault</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              className="auth-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter username"
            />

            <label>Password</label>
            <input
              className="auth-input"
              type="password"
              value={masterPassword}
              onChange={(e) => setMasterPassword(e.target.value)}
              required
              placeholder="Enter your master password"
            />

            <button className="auth-button" type="submit">
              Login
            </button>
          </form>

          <p style={{ marginTop: "16px" }}>
            Don't have an account?{" "}
            <span
              style={{ color: "#9f9cff", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;
