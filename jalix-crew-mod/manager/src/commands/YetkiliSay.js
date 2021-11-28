module.exports = {
  conf: {
    aliases: ["yetkilisay","sesteolmayanlar","ytsay"],
    name: "ysay",
    usage: 'ysay [rol]',
    description: 'Aktif olup seste olmayan yetkililer görürsünüz. (Eğer Rol Etiketlerseniz O Rolde Aktif Olup Seste Olmayan Yetkilileri Gösterir.)',
 },

 run: async ({client, msg, args, cfg, author}) => {
   
 if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000) 
  try {var sestekiler =[];
  const Vegas = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[0])
  msg.guild.channels.cache.filter(x => x.type === "voice").forEach(x => x.members.forEach(s => sestekiler.push(s.user.id)))
  var array = []; 
  Vegas.members.forEach(yetkili => {if(!array.includes(yetkili.user.id) &&!sestekiler.includes(yetkili.user.id) && yetkili.presence.status !== "offline") array.push(yetkili.user.id) })      
  msg.channel.send(`- \`${Vegas.name}\` rolünde online olup seste olmayan kişi sayısı: ${array.length}\n`)
  client.chunkArray(array, 20).forEach(r => {
  msg.channel.send('```<@'+r.join(`>,<@`)+'>```').catch(() => { })})} catch(err) {
  var yetkilirolleri = cfg.Roles.YetkiliRolleri
  var array = [];
  yetkilirolleri.forEach(rol => {msg.guild.roles.cache.get(rol).members.forEach(yetkili => {if(!array.includes(yetkili.user.id) &&!sestekiler.includes(yetkili.user.id) && yetkili.presence.status !== "offline") array.push(yetkili.user.id)})})
  msg.channel.send('Online olup seste olmayan yetkili sayısı: '+array.length+'\n')
  client.chunkArray(array, 20).forEach(r => {
  msg.channel.send('```<@'+r.join(`>,<@`)+'>```').catch(() => { })})}}}
