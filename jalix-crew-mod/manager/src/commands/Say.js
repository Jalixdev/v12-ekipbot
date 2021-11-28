module.exports = {
  conf: {
    aliases: [],
    name: "say",
    usage: 'say',
    description: 'Sunucu hakkında detaylı bilgi alırsınız.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, uye}) => {
   
  if (!msg.member.roles.cache.has(cfg.Tag.TagRolü) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
  var tag = msg.guild.members.cache.filter(a => a.user.username.includes("")).size;
  var toplamAile = msg.guild.members.cache.filter(s => !s.bot).filter(member => member.user.username.includes("") || member.user.discriminator === "").size;
 
  const vegas = new MessageEmbed().setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setDescription(`\`•\` Seste toplam **${msg.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b)}** kullanıcı var.\n\`•\` Toplam **${toplamAile+tag}** kişi tagımıza sahip.\n\`•\` Sunucumuzda toplam **${msg.guild.memberCount}** üye var.\n\`•\` Sunucumuza toplam **${msg.guild.premiumSubscriptionCount}** takviye yapılmış.\n\`•\` Sunucumuzda toplam **${msg.guild.members.cache.filter(u => u.presence.status != "offline").size}** çevrimiçi üye var.`)
  msg.channel.send(vegas)}}
