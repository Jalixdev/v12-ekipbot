module.exports = {
  conf: {
    aliases: ["team","crew"],
    name: "ekip",
    usage: 'ekip [ekip ismi]',
    description: 'Sunucuda bulunnan ekipler hakkında bilgi alırsınız. (Tüm ekipler hakkında bilgi almak için !ekip tek bir ekip hakkında bilgi almak için ise !ekip [ekip ismi])',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, prefix}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  let seçenek = args[0]
  let denetlenecek = ["tüm","TÜM","Tüm","1962","","","",""]
  if(!seçenek){msg.channel.send(new MessageEmbed().setDescription(`\`•\` Sunucu içi durumuna bakmak istediğiniz ekipleri aşağıdaki argümanları doldurarak çalıştırabilirsiniz;\n\n\`•\` ${prefix}ekip 1 - <@&858355080033206294>\n\n\`•\` Tüm ekiplerin sunucu içi durumuna bakmak için !ekip tüm şeklinde kullanılmalıdır.`).setColor(0x2F3136).setThumbnail(msg.guild.iconURL({dynamic:true})).setAuthor(msg.member.displayName, msg.author.avatarURL({dynamic:true}))); return}
  if(!denetlenecek.some(x => seçenek === x)) return client.timemessage(client.normalEmbed(`Lütfen tüm argümanları doğru giriniz!\nÖrnek Kullanım: ${prefix}ekip {sayı}`, msg), msg.channel.id, 5000)
  if(seçenek == "tüm" || seçenek == "TÜM" || seçenek == "Tüm"){
  let yetkili = msg.guild.members.cache.filter(x => {
  return x.user.username.includes(cfg.Tag.Tag) && x.voice.channel && x.roles.cache.some(r => cfg.Roles.YetkiliRolleri.includes(r.id))
  }).size
  let ses = msg.guild.members.cache.filter(x => x.voice.channel).size 
  let members = msg.guild.members.cache.size
  msg.channel.send(new MessageEmbed()
  .setColor(0x2f3136)
  .setDescription(
  `
**${msg.guild.roles.cache.get('').name} bilgilendirme:**                                           
Toplam: **__${msg.guild.roles.cache.get('').members.size}__**    
Çevrimiçi: **${msg.guild.roles.cache.get('').members.filter(u => u.presence.status != "offline").size}**    
Sesteki: **${msg.guild.roles.cache.get('').members.filter(m => m.voice.channel).size}**    
Ses oranı: **%${parseInt((msg.guild.roles.cache.get('').members.filter(m => m.voice.channel).size / ses) * 100)}**   

  `)
  .setFooter(`Sesteki üye oranı: %${parseInt((ses / members) * 100)} | Sesteki yetkili oranı: %${parseInt((yetkili / ses) * 100)}`).setAuthor(msg.guild.name, msg.guild.iconURL({dynamic:true})))}
   
  if(seçenek == "" || seçenek == "" || seçenek == "" || seçenek == "1962"){
  var sestekiler =[]; var array = []; 
  let role = ""
  msg.guild.channels.cache.filter(x => x.type === "voice").forEach(x => x.members.forEach(s => sestekiler.push(s.user.id)))
  msg.guild.roles.cache.get(role).members.forEach(yetkili => {
  if(!array.includes(yetkili.user.id) &&!sestekiler.includes(yetkili.user.id) && yetkili.presence.status !== "offline") array.push(yetkili.user.id) }) 
  msg.channel.send(new MessageEmbed().setColor(msg.guild.roles.cache.get(role).hexColor).setDescription(`\`•\` <@&${role}> Ekibinin sunucu içi aktiflik durumu;\n\`•\` Toplam sahip oldukları üye sayısı: \`${msg.guild.roles.cache.get(role).members.size}\`\n\`•\` Sunucumuzda tagımızı alan bizi destekleyen ekip üyesi miktarı: \`${msg.guild.roles.cache.get(role).members.filter(x => x.user.username.includes(cfg.Tag.Tag)).size}\`\n\`•\` Sunucumuzda ses kanallarında bulunan ekip üyesi: \`${msg.guild.roles.cache.get(role).members.filter(m => m.voice.channel).size}\`\n\`•\` Aktif olup seste olmayan ekip üyelerinin miktarı: \`${array.length}\`\n\`•\` Sunucumuzda yetkili olan ekip üyelerinin miktarı: \`${msg.guild.roles.cache.get(role).members.filter(x => x.roles.cache.some(r => cfg.Roles.YetkiliRolleri.includes(r.id))).size}\``).setThumbnail(msg.guild.iconURL({dynamic:true})).setAuthor(msg.guild.name, msg.guild.iconURL({dynamic:true})))
  }
 
 }}
