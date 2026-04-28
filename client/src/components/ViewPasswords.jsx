import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const ViewPasswords = () => {
  const [passwords, setPasswords] = useState([]);
  const [error, setError] = useState("");
  const [visiblePasswords, setVisiblePasswords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    website: "",
    accountUsername: "",
    storedPassword: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await api.get(
          "/passwords/",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setPasswords(response.data);
      } catch (err) {
        setError("Failed to load passwords.");
      }
    };
    fetchPasswords();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this password?"))
      return;

    try {
      await api.delete(`/passwords/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPasswords(passwords.filter((entry) => entry._id !== id));
    } catch (err) {
      alert("Error deleting password");
    }
  };

  const handleEditClick = (entry) => {
    setEditingId(entry._id);
    setEditFormData({
      website: entry.website,
      accountUsername: entry.accountUsername,
      storedPassword: entry.storedPassword,
    });
  };

  const toggleVisibility = (id) => {
    if (visiblePasswords.includes(id)) {
      setVisiblePasswords(
        visiblePasswords.filter((visibleId) => visibleId !== id),
      );
    } else {
      setVisiblePasswords([...visiblePasswords, id]);
    }
  };

  const handleSaveEdit = async (id) => {
    try {
      await api.put(
        `/passwords/${id}`,
        editFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const updatedPasswords = passwords.map((entry) =>
        entry._id === id ? { ...entry, ...editFormData } : entry,
      );

      setPasswords(updatedPasswords);
      setEditingId(null);
    } catch (err) {
      alert("Error updating password");
    }
  };

  return (
    <div>
      <h2>Your Password Vault</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {passwords.length === 0 && !error ? (
        <p>Your vault is empty. Go add some passwords!</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {passwords.map((entry) => (
            <div
              key={entry._id}
              style={{ border: "1px solid black", padding: "15px" }}
            >
              {editingId === entry._id ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <input
                    type="text"
                    value={editFormData.website}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        website: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    value={editFormData.accountUsername}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        accountUsername: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    value={editFormData.storedPassword}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        storedPassword: e.target.value,
                      })
                    }
                  />
                  <button
                    onClick={() => handleSaveEdit(entry._id)}
                    style={{ background: "green", color: "white" }}
                  >
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <p>
                    <strong>Website:</strong> {entry.website}
                  </p>
                  <p>
                    <strong>Username:</strong> {entry.accountUsername}
                  </p>

                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <strong>Password:</strong>
                    {visiblePasswords.includes(entry._id)
                      ? entry.storedPassword
                      : "••••••••••••"}

                    <button
                      onClick={() => toggleVisibility(entry._id)}
                      style={{
                        fontSize: "12px",
                        padding: "2px 5px",
                        cursor: "pointer",
                      }}
                    >
                      {visiblePasswords.includes(entry._id) ? "Hide" : "Show"}
                    </button>
                  </p>

                  <button onClick={() => handleEditClick(entry)}>Edit</button>
                  <button
                    onClick={() => handleDelete(entry._id)}
                    style={{
                      background: "red",
                      color: "white",
                      marginLeft: "10px",
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <br />
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
};

export default ViewPasswords;
