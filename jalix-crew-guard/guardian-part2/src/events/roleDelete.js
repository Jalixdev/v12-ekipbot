const client = global.client;
const cfg = require("../configs/config.json");
const moment = require("moment");
const {MessageEmbed} = require("discord.js");

module.exports = async role => {
  
  let entry = await role.guild.fetchAuditLogs({ limit: 1, type: 'ROLE_DELETE' }).then(x => x.entries.first());
  client.channels.cache.get(cfg.Channels.roleDelete).send(`${entry.executor} üyesi ${role.name} (\`${role.id}\`) adlı rolü sildi.`).catch(() => client.channels.cache.get(cfg.Channels.noChannel).send(`${entry.executor} üyesi ${role.id} (\`${role.name}\`) adlı rolü sildi.`).catch(() => {}))
  cfg.Bot.Owners.map(x => x).filter(vegasımkeim => role.guild.members.cache.get(vegasımkeim).send(`la **${role.guild.name}** sunucusunda rol silindi aq koş dağıt sikmiyim.\n ${role.id} - (\`${role.name}\`)`).catch(() => { })) }

module.exports.conf = {
  name: "roleDelete",
};
