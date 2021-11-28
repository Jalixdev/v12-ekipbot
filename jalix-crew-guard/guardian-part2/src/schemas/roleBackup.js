const mongoose = require("mongoose");

const roleDatabase = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  rolid: String,
  name: String,
  color: String,
  members: Array,
  permissions: Number,
  position: Number,
  hoisted: Boolean,
  time: Number,
  sayı: Number,
});

module.exports = mongoose.model("roleDatabase", roleDatabase);