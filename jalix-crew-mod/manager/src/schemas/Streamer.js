const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: ""},
  userID: { type: String, default: ""},
  date: { type: Number, default: Date.now()},
});

module.exports = model("streamer", schema);