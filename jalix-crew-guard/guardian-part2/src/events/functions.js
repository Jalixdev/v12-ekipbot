module.exports = async(client, cfg, moment, Discord, request, mongoose) => {
  
  client.vegasRenkler = new Array("#6959cd","#1f0524", "#0b0067", "#4a0038", "#07052a", "#FFDF00", "#00FFFF", "#0091CC", "#0047AB", "#384B77", "#ffffff", "#000000", "#04031a", "#f9ffba");
  
   client.normalEmbed = (message, msj) => {
     return {
       embed: {
         description: message,
         author: { name: msj.guild.member(msj.author).displayName, icon_url: msj.author.avatarURL({dynamic: true}) },
         color: client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)],}}}
   
   client.logSend = (content) => {
     const logEmbed = new Discord.MessageEmbed().setThumbnail(client.guilds.cache.get(cfg.Server.GuildID).iconURL({dynamic: true})).setDescription(content).setAuthor(client.guilds.cache.get(cfg.Server.GuildID).name, client.guilds.cache.get(cfg.Server.GuildID).iconURL({dynamic: true})).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)])
     client.channels.cache.get(cfg.Channels.backup).send(`@here`, {embed: logEmbed }).catch(() => client.channels.cache.get(cfg.Channels.noChannel).send(`@here`, {embed: logEmbed }).catch(() => {}))}
  
  client.timemessage = (content, Channel, timeout) => {
   const channel = client.channels.cache.get(Channel)
   if (channel) channel.send(content).then((msg) => msg.delete({ timeout: timeout })).catch(() => { });};
  
  client.message = (content, Channel) => {
   const channel = client.channels.cache.get(Channel);
   if (channel) channel.send(content).catch(() => { });};
  
  client.setRole = (oldRole, newRole) => {
   newRole.edit({ ...oldRole });};
  
  client.deleteRole = (role) => {
   role.delete({reason: "Juqest Guard"}).catch(() => { })}
  
   client.backup = () => {
    const roleData = require("../schemas/roleBackup.js");
    client.guilds.cache.get(cfg.Server.GuildID).roles.cache.filter(x => x.name !== "@everyone").map(async(role) => {
    await roleData.findOne({rolid: role.id}, async(err,res) => {
      if(!res) {
      const newData = new roleData({
            _id: new mongoose.Types.ObjectId(),
            rolid: role.id,
            name: role.name,
            color: role.hexColor,
            permissions: role.permissions,
            members: role.members.map(gmember => gmember.id),
            position: role.position,
            sayı: role.members.size,
            hoisted: role.hoist
      })
      newData.save().catch(e => console.log(e))
      } else if(res) {
           let filter = res.members.filter(x => client.guilds.cache.get(cfg.Server.GuildID).members.cache.has(x) && !client.guilds.cache.get(cfg.Server.GuildID).members.cache.get(x).roles.cache.has(role.id))
          res.name = role.name;
          res.color = role.hexColor;
          res.members = role.members.map(gmember => gmember.id);
          res.position = role.position;
          res.hoisted = role.hoist;
          res.sayı = role.members.size;
          res.save().catch(e => console.log(e))
      }
    })})}
  
  client.channelBackup = () => {
   const channelData = require("../schemas/channelBackup.js");
  let roles = [];
  client.guilds.cache.get(cfg.Server.GuildID).channels.cache.each(channel => {
    channel.permissionOverwrites.each(perm => {
      if (perm.type === "role") {
        const role = client.guilds.cache.get(cfg.Server.GuildID).roles.cache.get(perm.id);
        if (role) {
          const data = {
            channel: channel.id,
            allow: perm.allow.bitfield,
            deny: perm.deny.bitfield
          };
          roles.push({
            name: role.name,
            id: role.id,
            permissions: data
          });
        }
      }
    });
  });
  let kontrol = roles.filter(x => x.id).map(e => e.id);
  client.guilds.cache.get(cfg.Server.GuildID).roles.cache.map(async(role) => {
    if (!kontrol.includes(role.id)) return;
    await channelData.findOne({ roleid: role.id }, async (err, res) => {
      if (!res) {
        let newData = new channelData({
          roleid: role.id,
          rolename: role.name,
          channels: roles.filter(x => x.id == role.id).map(e => e.permissions)
        });
        newData.save().catch(e => console.log(e));
        let channels = roles.filter(x => x.id == role.id).map(e => `${client.channels.cache.get(e.permissions.channel).name}`).length
      } else {
        res.roleid = role.id;
        res.rolename = role.name;
        res.channels = roles.filter(x => x.id == role.id).map(e => e.permissions);
        res.save().catch(e => console.log(e))
        let channels = roles.filter(x => x.id == role.id).map(e => `${client.channels.cache.get(e.permissions.channel).name}`).length
      }
    });
  });
  }

      
  client.punish = (userID, tür) => {
   let vegas = client.guilds.cache.get(cfg.Server.GuildID).members.cache.get(userID);
   if (!vegas) return;
   if (tür == "Suspended") return vegas.roles.cache.has(cfg.Roles.Booster) ? vegas.roles.set([cfg.Roles.Booster, cfg.Roles.Jail]) : vegas.roles.set([cfg.Roles.Jail]).catch(() => { });
   if (tür == "Forbidden") return vegas.ban({ reason: "Juqest Guard" }).catch(() => { })}}

