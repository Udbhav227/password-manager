import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsername(res.data.username);
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome {username ? `, ${username}` : ""} 👋</h2>
      <p>What would you like to do today?</p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "300px",
          margin: "0 auto",
          marginTop: "30px",
        }}
      >
        <button onClick={() => navigate("/add-password")}>
          Add New Password
        </button>

        <button onClick={() => navigate("/view-passwords")}>
          View Saved Passwords
        </button>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#ff4d4d",
            color: "white",
            marginTop: "20px",
          }}
        >
          Logout Securely
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
