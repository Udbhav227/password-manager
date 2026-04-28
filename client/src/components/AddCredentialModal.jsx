import {
  RiCloseLine,
  RiGlobalLine,
  RiUser3Line,
  RiLockLine,
} from "react-icons/ri";

const AddCredentialModal = ({
  show,
  onClose,
  newEntry,
  setNewEntry,
  onSave,
}) => {
  if (!show) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>New Vault Entry</h3>
          <button className="ico-btn" onClick={onClose}>
            <RiCloseLine />
          </button>
        </div>

        <div className="modal-body">
          <div className="field">
            <label>
              <RiGlobalLine /> Website
            </label>
            <input
              type="text"
              placeholder="github.com"
              value={newEntry.website}
              onChange={(e) =>
                setNewEntry({ ...newEntry, website: e.target.value })
              }
            />
          </div>

          <div className="field">
            <label>
              <RiUser3Line /> Username
            </label>
            <input
              type="text"
              placeholder="you@email.com"
              value={newEntry.accountUsername}
              onChange={(e) =>
                setNewEntry({ ...newEntry, accountUsername: e.target.value })
              }
            />
          </div>

          <div className="field">
            <label>
              <RiLockLine /> Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={newEntry.storedPassword}
              onChange={(e) =>
                setNewEntry({ ...newEntry, storedPassword: e.target.value })
              }
            />
          </div>
        </div>

        <div className="modal-foot">
          <button className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-solid" onClick={onSave}>
            Save to Vault
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCredentialModal;
