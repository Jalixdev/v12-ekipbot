const client = global.client;
const cfg = require("../configs/config.json");
const moment = require("moment");
const Database = require("../schemas/Guard");

module.exports = async (oldGuild, newGuild) => {

  const data = await Database.findOne({ guildID: cfg.Server.GuildID});
  const entry = await oldGuild.fetchAuditLogs({ limit: 1, type: "GUILD_UPDATE" }).then(audit => audit.entries.first());
  if(oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
  if (!entry || !entry.executor || safe(entry.executor.id) || entry.executor.bot || Date.now() - entry.createdTimestamp > 5000) return;
  closeAllPermsRoles()
  client.setURL(newGuild.id)
  client.punish(entry.executor.id, "Forbidden")
  client.logSend(`${entry.executor} üyesi sunucu URL'sini değişti ve URL'yi eski haline getirip, URL değişen üyeyi banladım.\n───────────────\nEski URL: \`${oldGuild.vanityURLCode}\`\nYeni URL: \`${newGuild.vanityURLCode}\`\nYetkili: ${entry.executor} (\`${entry.executor.tag.replace("`", "")}\` - \`${entry.executor.id}\`)`)

  function safe(userID) {
   let vegas = client.guilds.cache.get(cfg.Server.GuildID).members.cache.get(userID);
   let Owner = cfg.Bot.Owners || [];   
   if (!vegas || vegas.id === client.user.id || Owner.some(g => vegas.id === g) || vegas.id === vegas.guild.owner.id || (data && data.Safe.includes(vegas.id)) || cfg.Roles.safeRoles.some(x => vegas.roles.cache.has(x))) return true
   else return false}
  
  function closeAllPermsRoles() {
   let guild = client.guilds.cache.get(cfg.Server.GuildID);
   let role = guild.roles.cache.filter(role => role.managed && role.position < guild.me.roles.highest.position && role.permissions.has("MANAGE_GUILD") || role.permissions.has("BAN_MEMBERS") || role.permissions.has("MANAGE_ROLES") || role.permissions.has("MANAGE_WEBHOOKS") || role.permissions.has("MANAGE_NICKNAMES") || role.permissions.has("MANAGE_CHANNELS") || role.permissions.has("KICK_MEMBERS") || role.permissions.has("ADMINISTRATOR"))
   let roles = guild.roles.cache.filter(role => role.managed && role.position < guild.me.roles.highest.position && role.permissions.has("MANAGE_GUILD") || role.permissions.has("BAN_MEMBERS") || role.permissions.has("MANAGE_ROLES") || role.permissions.has("MANAGE_WEBHOOKS") || role.permissions.has("MANAGE_NICKNAMES") || role.permissions.has("MANAGE_CHANNELS") || role.permissions.has("KICK_MEMBERS") || role.permissions.has("ADMINISTRATOR")).forEach(async r => {
   if(cfg.Roles.safeRoles.some(x => r.id === x)) return 
   await r.setPermissions(0).catch(() => { })});

   role.forEach(role => {
   if(role.permissions.has("ADMINISTRATOR")){
   if(cfg.Roles.safeRoles.some(x => role.id === x)) return 
   role.members.filter(e => e.manageable).forEach(member => {
   if(safe(member.id)) return;
   if(member.roles.highest.position < guild.me.roles.highest.position) member.roles.remove(role).catch(() => { })})}})}}}

module.exports.conf = {
  name: "guildUpdate",
};
