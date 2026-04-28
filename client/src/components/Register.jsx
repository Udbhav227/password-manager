import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FaSpinner } from "react-icons/fa";

const Register = () => {
  const [username, setUsername] = useState("");
  const [masterPassword, setMasterPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await api.post("/register", {
        username,
        masterPassword,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
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
          <h2>Create an account</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              className="auth-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
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

            <button
              className="auth-button"
              type="submit"
              disabled={isLoading}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {isLoading && <FaSpinner className="icon-spin" />}
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <p style={{ marginTop: "16px" }}>
            Already have an account?{" "}
            <span
              style={{ color: "#9f9cff", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
