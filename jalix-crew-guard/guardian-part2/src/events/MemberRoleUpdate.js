const client = global.client;
const cfg = require("../configs/config.json");
const moment = require("moment");
const Database = require("../schemas/Guard");
const {MessageEmbed} = require("discord.js");

module.exports = async (oldMember, newMember) => {
    
  const authorityRoles = ["MANAGE_GUILD", "BAN_MEMBERS", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_NICKNAMES", "MANAGE_CHANNELS", "KICK_MEMBERS", "ADMINISTRATOR"];
  const data = await Database.findOne({ guildID: cfg.Server.GuildID});
  let entry = await newMember.guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_ROLE_UPDATE' }).then(x => x.entries.first());
  if (!entry || !entry.executor || safe(entry.executor.id) || entry.executor.bot || Date.now() - entry.createdTimestamp > 5000) return;
   newMember.roles.cache.forEach(async role => {
  if (!oldMember.roles.cache.has(role.id)) {
  if (authorityRoles.some(x => role.permissions.has(x)) == true) {
  closeAllPermsRoles()
  client.punish(entry.executor.id, "Forbidden")
  await newMember.roles.remove(role)
  client.logSend(`${entry.executor} üyesi yetki içeren bir rol verdi ve üyeden rolü alıp, rolü veren kişiyi banladım banladım.\n───────────────\nYetkili: ${entry.executor} (\`${entry.executor.tag.replace("`", "")}\` - \`${entry.executor.id}\`)\nRol: <@!${role.id}> (\`${role.name}\` - \`${role.id}\`)\nRol Verilen: ${newMember} - ${newMember.id}`)
  }}})
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
}}

module.exports.conf = {
  name: "guildMemberUpdate",
};

