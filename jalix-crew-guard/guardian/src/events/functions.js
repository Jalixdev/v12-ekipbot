module.exports = async(client, cfg, moment, Discord, axios) => {
  
   client.vegasRenkler = new Array("#6959cd","#1f0524", "#0b0067", "#4a0038", "#07052a", "#FFDF00", "#00FFFF", "#0091CC", "#0047AB", "#384B77", "#ffffff", "#000000", "#04031a", "#f9ffba");
  
   client.normalEmbed = (message, msj) => {
     return {
       embed: {
         description: message,
         author: { name: msj.guild.member(msj.author).displayName, icon_url: msj.author.avatarURL({dynamic: true}) },
         color: client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)],}}}
   
   client.logSend = (content) => {
     const logEmbed = new Discord.MessageEmbed().setDescription(content).setAuthor(client.guilds.cache.get(cfg.Server.GuildID).name, client.guilds.cache.get(cfg.Server.GuildID).iconURL({dynamic: true})).setColor("RANDOM")
     client.channels.cache.get(cfg.Channels.Guard).send(`@here`, {embed: logEmbed }).catch(() => client.channels.cache.get(cfg.Channels.noChannel).send(`@here`, {embed: logEmbed }).catch(() => {}))}
  
  client.timemessage = (content, Channel, timeout) => {
   const channel = client.channels.cache.get(Channel);
   if (channel) channel.send(content).then((msg) => msg.delete({ timeout: timeout })).catch(() => { });};
  
  client.message = (content, Channel) => {
   const channel = client.channels.cache.get(Channel);
   if (channel) channel.send(content).catch(() => { });};
  
  client.unban = (userID) => {
   client.guilds.cache.get(cfg.Server.GuildID).members.unban(userID, "Juqest Ban Guard").catch(() => { })}
  
  client.createEmoji = (emoji) => {
   client.guilds.cache.get(cfg.Server.GuildID).emojis.create(emoji.url,emoji.name).catch(() => { })}
  
  client.setURL = (guildID) => {
   axios({
    method: "patch",
    url: `https://discord.com/api/v6/guilds/${cfg.Server.GuildID}/vanity-url`,
     data: {
      code: `${cfg.Server.vanityURLCode}`
   },
     headers: {
       authorization: `Bot ${cfg.Bot.Token}`
   }})}
  
  client.setGuild = (oldGuild, newGuild) => {
    if (newGuild.iconURL({dynamic: true, size: 2048}) !== oldGuild.iconURL({dynamic: true, size: 2048})) newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));
    newGuild.edit({ 
     name: oldGuild.name, 
     banner: oldGuild.bannerURL(), 
     region: oldGuild.region, 
     verificationLevel: oldGuild.verificationLevel, 
     explicitContentFilter: oldGuild.explicitContentFilter, 
     afkChannel: oldGuild.afkChannel, 
     systemChannel: oldGuild.systemChannel,
     afkTimeout: oldGuild.afkTimeout,
     rulesChannel: oldGuild.rulesChannel,
     publicUpdatesChannel: oldGuild.publicUpdatesChannel,
     preferredLocale: oldGuild.preferredLocale})}
  
  client.punish = (userID, tür) => {
   let vegas = client.guilds.cache.get(cfg.Server.GuildID).members.cache.get(userID);
   if (!vegas) return;
   if (tür == "Suspended") return vegas.roles.cache.has(cfg.Roles.Booster) ? vegas.roles.set([cfg.Roles.Booster, cfg.Roles.Jail]) : vegas.roles.set([cfg.Roles.Jail]).catch(() => { });
   if (tür == "Forbidden") return vegas.ban({ reason: "Juqest Guard" }).catch(() => { })}}

