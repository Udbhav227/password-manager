const Vault = require("../models/Vault");
const { encrypt, decrypt } = require("../utils/crypto");

const addPassword = async (req, res) => {
  try {
    const { website, accountUsername, storedPassword } = req.body;

    const encryptedPassword = encrypt(storedPassword);

    const newEntry = new Vault({
      user: req.user,
      website,
      accountUsername,
      storedPassword: encryptedPassword,
    });

    await newEntry.save();
    res.status(201).json({
      _id: newEntry._id,
      website: newEntry.website,
      accountUsername: newEntry.accountUsername,
      storedPassword: decrypt(newEntry.storedPassword),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving password" });
  }
};

const getPasswords = async (req, res) => {
  try {
    const userVaults = await Vault.find({ user: req.user });

    const decryptedVaults = userVaults.map((entry) => ({
      _id: entry._id,
      website: entry.website,
      accountUsername: entry.accountUsername,
      storedPassword: decrypt(entry.storedPassword),
    }));

    res.status(200).json(decryptedVaults);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving passwords" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { website, accountUsername, storedPassword } = req.body;

    const entry = await Vault.findOne({ _id: id, user: req.user });

    if (!entry) {
      return res.status(404).json({ message: "Password entry not found" });
    }

    entry.website = website || entry.website;
    entry.accountUsername = accountUsername || entry.accountUsername;
    if (storedPassword) {
      entry.storedPassword = encrypt(storedPassword);
    }

    await entry.save();
    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating password" });
  }
};

const deletePassword = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEntry = await Vault.findOneAndDelete({
      _id: id,
      user: req.user,
    });

    if (!deletedEntry) {
      return res.status(404).json({ message: "Password entry not found" });
    }

    res.status(200).json({ message: "Password deleted securely!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting password" });
  }
};

module.exports = { addPassword, getPasswords, updatePassword, deletePassword };
