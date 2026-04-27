import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome to Your Secure Vault</h2>
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
        <button
          onClick={() => navigate("/add-password")}
          style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}
        >
          Add New Password
        </button>

        <button
          onClick={() => navigate("/view-passwords")}
          style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}
        >
          View Saved Passwords
        </button>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
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
