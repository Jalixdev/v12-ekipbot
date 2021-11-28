module.exports = {
  conf: {
    aliases: ["yetki"],
    name: "koruma",
    usage: 'koruma {aç/kapat}',
    description: 'Sunucunun yetki rollerini açıp kapatırsınız.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, prefix}) => {
   
   /*
   Administrator: 8
   Manage Roles: 268435456
   Manage Channels: 16
   Manage Webhooks: 536870912
   Manage Server: 32
   Ban Members: 4
   Kick Members: 2
   */

   if (!["796858691000205342 ","902968715593793546","","",""].some((ID) => msg.author.id === ID)) return msg.channel.send(`Bu komutu sadece belirli kişiler kullanabilir!`)

 //let ManageRolesID = ""

 let ManageRolesID2 = "904274756201754664"

 
 let ChannelsID = ""
 
 let seçenek = args[0]
 if(!seçenek){client.message(client.normalEmbed(`Lütfen tüm argümanları doğru giriniz!\nÖrnek Kullanım: ${prefix}koruma {aç/kapat}`, msg), msg.channel.id)}
 if(seçenek == "Aç"|| seçenek == "aç"|| seçenek == "AÇ"|| seçenek == "ac"|| seçenek == "Ac"|| seçenek == "AC"){
  //msg.guild.roles.cache.get(ManageRolesID).setPermissions(0)
  msg.guild.roles.cache.get(ManageRolesID2).setPermissions(0)
  msg.guild.roles.cache.get(ChannelsID).setPermissions(0)
  msg.channel.send(`${cfg.Emoji.RedEmoji} Sunucumuzun yönetici rolleri **kapatılmıştır**, sunucu güvenli moda alınmıştır!`)}
  if(seçenek == "Kapat"|| seçenek == "kapat"|| seçenek == "KAPAT"|| seçenek == "kapa"|| seçenek == "Kapa"){
 // msg.guild.roles.cache.get(ManageRolesID).setPermissions(8)
  msg.guild.roles.cache.get(ManageRolesID2).setPermissions(8053063621)
  msg.guild.roles.cache.get(ChannelsID).setPermissions(5636157381)
  msg.channel.send(`Sunucumuzun yönetici rolleri **açılmıştır**, sunucu güvenli moddan çıkmıştır!`)}}}
