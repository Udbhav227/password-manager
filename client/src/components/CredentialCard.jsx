import {
  RiEyeLine,
  RiEyeOffLine,
  RiEditLine,
  RiDeleteBin5Line,
  RiFileCopyLine,
  RiCheckLine,
  RiCloseLine,
  RiSaveLine,
  RiGlobalLine,
  RiUser3Line,
  RiLockLine,
} from "react-icons/ri";

const CredentialCard = ({
  entry,
  isEditing,
  isVisible,
  copiedId,
  editFormData,
  setEditFormData,
  onEdit,
  onDelete,
  onSave,
  onCancelEdit,
  onToggleVisibility,
  onCopy,
}) => {
  const getFavicon = (website) => {
    try {
      const url = website.startsWith("http") ? website : `https://${website}`;
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return null;
    }
  };

  const favicon = getFavicon(entry.website);

  return (
    <div className="cred-card">
      {isEditing ? (
        <div className="edit-body">
          <div className="edit-title">
            <span>Edit Credential</span>
            <button className="ico-btn" onClick={onCancelEdit}>
              <RiCloseLine />
            </button>
          </div>

          <div className="field">
            <label>
              <RiGlobalLine /> Website
            </label>
            <input
              value={editFormData.website}
              onChange={(e) =>
                setEditFormData({ ...editFormData, website: e.target.value })
              }
            />
          </div>

          <div className="field">
            <label>
              <RiUser3Line /> Username
            </label>
            <input
              value={editFormData.accountUsername}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  accountUsername: e.target.value,
                })
              }
            />
          </div>

          <div className="field">
            <label>
              <RiLockLine /> Password
            </label>
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
          </div>

          <div className="edit-footer">
            <button className="btn-ghost" onClick={onCancelEdit}>
              Cancel
            </button>
            <button className="btn-solid" onClick={onSave}>
              <RiSaveLine /> Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="card-top">
            <div className="card-identity">
              <div className="favicon-wrap">
                {favicon && (
                  <img
                    src={favicon}
                    alt=""
                    className="favicon"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                )}
                <div
                  className="favicon-fallback"
                  style={{ display: favicon ? "none" : "flex" }}
                >
                  {entry.website?.charAt(0).toUpperCase() || "?"}
                </div>
              </div>

              <div>
                <p className="card-site">{entry.website}</p>
                <p className="card-user">{entry.accountUsername}</p>
              </div>
            </div>

            <div className="card-actions">
              <button className="ico-btn" onClick={onEdit}>
                <RiEditLine />
              </button>
              <button className="ico-btn danger" onClick={onDelete}>
                <RiDeleteBin5Line />
              </button>
            </div>
          </div>

          <div className="pw-row">
            <div className="pw-text">
              <span className="pw-label">Password</span>
              <span className="pw-val">
                {isVisible ? entry.storedPassword : "••••••••••••"}
              </span>
            </div>

            <div className="pw-actions">
              <button className="ico-btn" onClick={onToggleVisibility}>
                {isVisible ? <RiEyeOffLine /> : <RiEyeLine />}
              </button>
              <button
                className={`ico-btn ${copiedId === entry._id ? "copied" : ""}`}
                onClick={() => onCopy(entry.storedPassword)}
              >
                {copiedId === entry._id ? <RiCheckLine /> : <RiFileCopyLine />}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CredentialCard;
