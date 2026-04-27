import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddPassword = () => {
  const [website, setWebsite] = useState("");
  const [accountUsername, setAccountUsername] = useState("");
  const [storedPassword, setStoredPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/passwords/add",
        {
          website,
          accountUsername,
          storedPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage(response.data.message);
      setWebsite("");
      setAccountUsername("");
      setStoredPassword("");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError(err.response?.data?.message || "Failed to save password");
      }
    }
  };

  return (
    <div>
      <h2>Add a New Password</h2>

      {message && (
        <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>
      )}
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Website / App Name: </label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required
            placeholder="e.g., Netflix"
          />
        </div>
        <br />

        <div>
          <label>Account Username/Email: </label>
          <input
            type="text"
            value={accountUsername}
            onChange={(e) => setAccountUsername(e.target.value)}
            required
          />
        </div>
        <br />

        <div>
          <label>Password: </label>
          <input
            type="password"
            value={storedPassword}
            onChange={(e) => setStoredPassword(e.target.value)}
            required
          />
        </div>
        <br />

        <button type="submit">Save Securely</button>
      </form>

      <br />
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
};

export default AddPassword;
