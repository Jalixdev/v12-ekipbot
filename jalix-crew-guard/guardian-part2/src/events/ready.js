const client = global.client;
const cfg = require("../configs/config.json");

module.exports = async () => {
  
  client.user.setPresence({ activity: { name: cfg.Bot.Durum }, status: cfg.Bot.Status });
  let VoiceChannelID = client.channels.cache.get(cfg.Channels.VoiceChannelID);
  if (VoiceChannelID) VoiceChannelID.join().catch(() => { });
  console.log(`(${client.user.username}) adlı ana hesapta [${client.guilds.cache.get(cfg.Server.GuildID).name}] adlı sunucuda giriş yapıldı.`)
  client.backup();
  client.channelBackup();
  setInterval(() => {
  client.backup()
  client.channelBackup()
  }, 900000)}

module.exports.conf = {
  name: "ready",
};
