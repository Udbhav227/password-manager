import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  RiShieldKeyholeLine,
  RiAddLine,
  RiLogoutCircleRLine,
  RiSearchLine,
  RiLock2Line,
} from "react-icons/ri";
import "../styles/dashboard.css";
import CredentialCard from "./CredentialCard";
import AddCredentialModal from "./AddCredentialModal";
import usePasswords from "../hooks/usePasswords";
import FollowCursor from "./followCursor";

const Dashboard = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [visiblePasswords, setVisiblePasswords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    website: "",
    accountUsername: "",
    storedPassword: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEntry, setNewEntry] = useState({
    website: "",
    accountUsername: "",
    storedPassword: "",
  });

  const token = localStorage.getItem("token");

  const { passwords, error, addPassword, deletePassword, updatePassword } =
    usePasswords(token, navigate);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsername(res.data.username))
      .catch(() => navigate("/login"));
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this credential?")) return;

    try {
      await deletePassword(id);
    } catch {
      alert("Error deleting");
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

  const handleSaveEdit = async (id) => {
    try {
      await updatePassword(id, editFormData);
      setEditingId(null);
    } catch {
      alert("Error saving");
    }
  };

  const handleAddPassword = async () => {
    try {
      await addPassword(newEntry);
      setNewEntry({ website: "", accountUsername: "", storedPassword: "" });
      setShowAddModal(false);
    } catch {
      alert("Error adding");
    }
  };

  const toggleVisibility = (id) =>
    setVisiblePasswords((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = passwords.filter(
    (e) =>
      e.website.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.accountUsername.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="app">
      <main className="main">
        <header className="topbar">
          <div>
            <h1 className="topbar-title">
              {username
                ? `Hi, ${username.charAt(0).toUpperCase() + username.slice(1)}`
                : "Welcome"}
            </h1>
            <p className="topbar-sub">
              All your credentials, secured in your vault.
            </p>
          </div>

          <div className="header-actions">
            <button className="btn-solid" onClick={() => setShowAddModal(true)}>
              <RiAddLine /> New Credential
            </button>
            <button className="btn-ghost" onClick={handleLogout}>
              <RiLogoutCircleRLine /> Sign out
            </button>
          </div>
        </header>

        <div className="search-wrap">
          <RiSearchLine className="search-ico" />
          <input
            className="search-input"
            type="text"
            placeholder="Search by site or username…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {error && <p className="error-banner">{error}</p>}

        {passwords.length === 0 && !error ? (
          <div className="empty">
            <div className="empty-icon-wrap">
              <RiShieldKeyholeLine />
            </div>
            <h2>Your vault is empty</h2>
            <p>Add your first credential to securely store it here.</p>
            <button className="btn-solid" onClick={() => setShowAddModal(true)}>
              <RiAddLine /> Add Credential
            </button>
          </div>
        ) : (
          <div className="card-list">
            {filtered.map((entry) => (
              <CredentialCard
                key={entry._id}
                entry={entry}
                isEditing={editingId === entry._id}
                isVisible={visiblePasswords.includes(entry._id)}
                copiedId={copiedId}
                editFormData={editFormData}
                setEditFormData={setEditFormData}
                onEdit={() => {
                  setEditingId(entry._id);
                  setEditFormData(entry);
                }}
                onDelete={() => handleDelete(entry._id)}
                onSave={() => {
                  handleSaveEdit(entry._id);
                  setEditingId(null);
                }}
                onCancelEdit={() => setEditingId(null)}
                onToggleVisibility={() => toggleVisibility(entry._id)}
                onCopy={(text) => {
                  handleCopy(text, entry._id);
                  setCopiedId(entry._id);
                  setTimeout(() => setCopiedId(null), 2000);
                }}
              />
            ))}
          </div>
        )}
      </main>

      <AddCredentialModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        newEntry={newEntry}
        setNewEntry={setNewEntry}
        onSave={() => {
          handleAddPassword();
          setShowAddModal(false);
          setNewEntry({ website: "", accountUsername: "", storedPassword: "" });
        }}
      />

      <footer className="footer">
        <div className="footer-content">
          <p className="copyright">&copy; 2026 KeyKeep.</p>
          <div className="security-badge">
            <RiLock2Line />
            <span>All passwords are encrypted before being stored.</span>
          </div>
          <div className="footer-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#support">Support</a>
          </div>
        </div>
      </footer>

      <FollowCursor color="#8577f0" zIndex={9999} />
    </div>
  );
};

export default Dashboard;
