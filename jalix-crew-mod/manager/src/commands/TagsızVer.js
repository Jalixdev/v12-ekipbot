module.exports = {
  conf: {
    aliases: ["tagsız"],
    name: "notag",
    usage: 'tagsız [ver]',
    description: 'Sunucuda rolü olmayanlara kayıtsız rolünün verirsiniz.',
 },

 run: async ({client, msg, args, cfg, author, uye}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000) 
  if(args[0] === "ver") {
   client.guilds.cache.get(cfg.Server.GuildID).members.cache.filter(x => !x.user.bot &&  x.user.discriminator.includes('') && !x.roles.cache.has(cfg.Tag.TagRolü)).array().forEach((tag, index) => {
    tag.roles.add(cfg.Tag.TagRolü).catch(() => { })
  });
         client.guilds.cache.get(cfg.Server.GuildID).members.cache.filter(x => !x.user.bot && x.user.username.toLowerCase().includes(``) && !x.roles.cache.has(cfg.Tag.TagRolü)).array().forEach((tag, index) => {
    tag.roles.add(cfg.Tag.TagRolü).catch(() => { })
  });

  client.guilds.cache.get(cfg.Server.GuildID).members.cache.filter(x => !x.user.bot && x.user.username.toLowerCase().includes(``) && !x.roles.cache.has(cfg.Tag.TagRolü)).array().forEach((tag, index) => {
    tag.roles.add(cfg.Tag.TagRolü).catch(() => { })
  });



  let tag1 = client.guilds.cache.get(cfg.Server.GuildID).members.cache.filter(x => !x.user.bot &&  x.user.discriminator.includes('') && !x.roles.cache.has(cfg.Tag.TagRolü)).size
  let tag2 = client.guilds.cache.get(cfg.Server.GuildID).members.cache.filter(x => !x.user.bot && x.user.username.toLowerCase().includes(``) && !x.roles.cache.has(cfg.Tag.TagRolü)).size
  let tag3 = client.guilds.cache.get(cfg.Server.GuildID).members.cache.filter(x => !x.user.bot && x.user.username.toLowerCase().includes(``) && !x.roles.cache.has(cfg.Tag.TagRolü)).size

      
  client.react(msg, "tick") 
  client.message(client.normalEmbed(`Başarıyla sunucuda tagı olup rolü olmayan \`${tag1+tag2+tag3}\` üyeye <@&${cfg.Tag.TagRolü}> rolü başarıyla verildi.`, msg), msg.channel.id)}}}