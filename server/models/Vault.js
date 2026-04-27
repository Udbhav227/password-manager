const mongoose = require("mongoose");

const valutSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    accountUsername: {
      type: String,
      required: true,
    },
    storedPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Vault", valutSchema);
