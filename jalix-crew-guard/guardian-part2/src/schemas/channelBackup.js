const mongoose = require("mongoose");

const channelDatabase = mongoose.Schema({
  roleid: String,
  rolename: String,
  channels: Array
});

module.exports = mongoose.model("channelDatabase", channelDatabase);