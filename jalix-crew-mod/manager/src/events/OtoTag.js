const cfg = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const Discord = require("discord.js");
const ControlsDatabase = require("../schemas/Controls");

module.exports = async(oldUser, newUser) => {
  
  if(oldUser.username == newUser.username || oldUser.bot || newUser.bot) return;
  let client = oldUser.client;
  let guild = client.guilds.cache.get(cfg.Server.GuildID);
  let user = guild.members.cache.get(oldUser.id);
  if(!user) return;
  const ControlsData = await ControlsDatabase.findOne({ guildID: guild.id}); 
  let YasaklıTagData = await ControlsDatabase.findOne({ guildID: cfg.Server.GuildID})
  let yasakTaglar = YasaklıTagData && YasaklıTagData.yasaklıtag;
  const embed = new MessageEmbed().setAuthor(user.displayName, user.user.avatarURL({dynamic: true})).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)])
  let tag1 = guild.members.cache.filter(r=>r.user.username.toLowerCase().includes("")).size
  let tag2 = guild.members.cache.filter(r=>r.user.username.toLowerCase().includes("")).size
  let tag3 = guild.members.cache.filter(r=>r.user.discriminator.includes('')).size
  let total = tag1+tag2+tag3
 
  if((YasaklıTagData && yasakTaglar.some(tag => !oldUser.username.includes(tag) && (newUser.username.includes(tag))))) {
  user.roles.cache.has(cfg.Roles.BoosterRolü) ?  user.roles.set([cfg.Roles.BoosterRolü, cfg.Roles.YasaklıTagRolü]) : user.roles.set([cfg.Roles.YasaklıTagRolü])
  user.send(new MessageEmbed().setAuthor(user.guild.name, user.guild.iconURL({dynamic: true})).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setDescription(`Öncelikle Merhaba;\n Sunucumuzun **yasaklı taglar** listesinde bulunan bir **tagı** ismine almışsın bu yüzden seni cezalıya atmak zorunda kaldım. Bu **tagı** isminden çıkararak cezalıdan çıkabilirsin.`)).catch(() => { })
  client.channels.cache.get(cfg.Channels.YasaklıTag).send(new MessageEmbed().setDescription(`${user} kullanıcısı ismine sunucumuzun yasaklı taglarından birini aldığı için jaile atıldı!`).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setAuthor(user.displayName, user.user.avatarURL({dynamic: true})))
  return;};
  
  if (YasaklıTagData && yasakTaglar.some(tag =>(oldUser.username.includes(tag)) && (!newUser.username.includes(tag)))) {
  client.setRoles(user.id, cfg.Roles.KayıtsızRolü)
  user.send(new MessageEmbed().setAuthor(user.guild.name, user.guild.iconURL({dynamic: true})).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setDescription(`Öncelikle Merhaba;\n Sunucumuzun **yasaklı taglar** listesinde bulunan bir **tagı** isminden çıkarttığın için seni jailden çıkardım ses. Ses kanallarından birine gelerek kayıt olabilirsin.`)).catch(() => { })
  client.channels.cache.get(cfg.Channels.YasaklıTag).send(new MessageEmbed().setDescription(`${user} kullanıcısı isminden sunucumuzun yasaklı taglarından birini çıkardığı için jailden çıkartıldı!`).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setAuthor(user.displayName, user.user.avatarURL({dynamic: true})))
  return;};
  
  if((!oldUser.username.toLowerCase().includes("")) && (newUser.username.toLowerCase().includes(""))) {
  if(cfg.Tag.TagRolü) user.roles.add(cfg.Tag.TagRolü).catch(() => { })
  await client.channels.cache.get(cfg.Channels.Chat).send(new MessageEmbed().setDescription(`${user} Kişisi tagımızı kullanıcı adına eklediği için <@&${cfg.Tag.TagRolü}> rolü verildi.\n Ayrıcalıklarını öğrenmek için <#${cfg.Channels.TagAyrıcalıkları}> kanalına bakabilirsin iyi eğlenceler.`).setColor("#32FF00")).then(m => m.delete({timeout: 5000}))
  await client.channels.cache.get(cfg.Channels.Tag).send(`${user} adlı üye (  ) tagını kullanıcı adına yerleştirerek ailemize katıldı!\n**Sunucuda bulunan toplam taglı üye sayımız:** (\`${total}\`)\n───────────────\nÖnce ki kullanıcı adı: \`${oldUser.username.replace("`","")}\`\nSonra ki kullanıcı adı: \`${newUser.username.replace("`","")}\``);
  } else if ((oldUser.username.toLowerCase().includes("")) && (!newUser.username.toLowerCase().includes(""))) {
   if(cfg.Tag.Tags.some(q => newUser.tag.includes(q))) return
  let ekipRol = guild.roles.cache.get(cfg.Tag.TagRolü)
  if(user.roles.cache.has(cfg.Roles.BoosterRolü)) {user.roles.remove(user.roles.cache.filter(rol => cfg.Roles.BoosterRolü.position <= rol.position)).catch(() => { })}
  user.roles.remove(user.roles.cache.filter(rol => ekipRol.position <= rol.position)).catch(() => { })
  if(ControlsData && ControlsData.taglıalım === "Açık") {client.setRoles(user.id, cfg.Roles.KayıtsızRolü)}
  await client.channels.cache.get(cfg.Channels.Chat).send(new MessageEmbed().setDescription(`${user} Kişisi tagımızı kullanıcı adından çıkardığı için <@&${cfg.Tag.TagRolü}> rolü alındı.\n Bizimle geçirdiğin süre zarfında umarım eğlenmişsindir...`).setColor("#B20000")).then(m => m.delete({timeout: 5000}))
  await client.channels.cache.get(cfg.Channels.Tag).send(`${cfg.Emoji.RedEmoji} ${user} adlı üye (  ) tagını kullanıcı adından çıkararak ailemize veda etti!\n**Sunucuda bulunan toplam taglı üye sayımız:** (\`${total}\`)\n───────────────\nÖnce ki kullanıcı adı: \`${oldUser.username.replace("`","")}\`\nSonra ki kullanıcı adı: \`${newUser.username.replace("`","")}\``);}

  if((!oldUser.username.toLowerCase().includes("")) && (newUser.username.toLowerCase().includes(""))) {
    if(cfg.Tag.TagRolü) user.roles.add(cfg.Tag.TagRolü).catch(() => { })
    await client.channels.cache.get(cfg.Channels.Chat).send(new MessageEmbed().setDescription(`${user} Kişisi tagımızı kullanıcı adına eklediği için <@&${cfg.Tag.TagRolü}> rolü verildi.\n Ayrıcalıklarını öğrenmek için <#${cfg.Channels.TagAyrıcalıkları}> kanalına bakabilirsin iyi eğlenceler.`).setColor("#32FF00")).then(m => m.delete({timeout: 5000}))
    await client.channels.cache.get(cfg.Channels.Tag).send(`${user} adlı üye (  ) tagını kullanıcı adına yerleştirerek ailemize katıldı!\n**Sunucuda bulunan toplam taglı üye sayımız:** (\`${total}\`)\n───────────────\nÖnce ki kullanıcı adı: \`${oldUser.username.replace("`","")}\`\nSonra ki kullanıcı adı: \`${newUser.username.replace("`","")}\``);
    } else if ((oldUser.username.toLowerCase().includes("")) && (!newUser.username.toLowerCase().includes(""))) {
     if(cfg.Tag.Tags.some(q => newUser.tag.includes(q))) return
    let ekipRol = guild.roles.cache.get(cfg.Tag.TagRolü)
    if(user.roles.cache.has(cfg.Roles.BoosterRolü)) {user.roles.remove(user.roles.cache.filter(rol => cfg.Roles.BoosterRolü.position <= rol.position)).catch(() => { })}
    user.roles.remove(user.roles.cache.filter(rol => ekipRol.position <= rol.position)).catch(() => { })
    if(ControlsData && ControlsData.taglıalım === "Açık") {client.setRoles(user.id, cfg.Roles.KayıtsızRolü)}
    await client.channels.cache.get(cfg.Channels.Chat).send(new MessageEmbed().setDescription(`${user} Kişisi tagımızı kullanıcı adından çıkardığı için <@&${cfg.Tag.TagRolü}> rolü alındı.\n Bizimle geçirdiğin süre zarfında umarım eğlenmişsindir...`).setColor("#B20000")).then(m => m.delete({timeout: 5000}))
    await client.channels.cache.get(cfg.Channels.Tag).send(`${cfg.Emoji.RedEmoji} ${user} adlı üye (  ) tagını kullanıcı adından çıkararak ailemize veda etti!\n**Sunucuda bulunan toplam taglı üye sayımız:** (\`${total}\`)\n───────────────\nÖnce ki kullanıcı adı: \`${oldUser.username.replace("`","")}\`\nSonra ki kullanıcı adı: \`${newUser.username.replace("`","")}\``);}

    if((!oldUser.username.toLowerCase().includes("ᴶ")) && (newUser.username.toLowerCase().includes("ᴶ"))) {
      if(cfg.Tag.TagRolü) user.roles.add(cfg.Tag.TagRolü).catch(() => { })
      await client.channels.cache.get(cfg.Channels.Chat).send(new MessageEmbed().setDescription(`${user} Kişisi tagımızı kullanıcı adına eklediği için <@&${cfg.Tag.TagRolü}> rolü verildi.\n Ayrıcalıklarını öğrenmek için <#${cfg.Channels.TagAyrıcalıkları}> kanalına bakabilirsin iyi eğlenceler.`).setColor("#32FF00")).then(m => m.delete({timeout: 5000}))
      await client.channels.cache.get(cfg.Channels.Tag).send(`${user} adlı üye ( ᴶ ) tagını kullanıcı adına yerleştirerek ailemize katıldı!\n**Sunucuda bulunan toplam taglı üye sayımız:** (\`${total}\`)\n───────────────\nÖnce ki kullanıcı adı: \`${oldUser.username.replace("`","")}\`\nSonra ki kullanıcı adı: \`${newUser.username.replace("`","")}\``);
      } else if ((oldUser.username.toLowerCase().includes("ᴶ")) && (!newUser.username.toLowerCase().includes("ᴶ"))) {
       if(cfg.Tag.Tags.some(q => newUser.tag.includes(q))) return
      let ekipRol = guild.roles.cache.get(cfg.Tag.TagRolü)
      if(user.roles.cache.has(cfg.Roles.BoosterRolü)) {user.roles.remove(user.roles.cache.filter(rol => cfg.Roles.BoosterRolü.position <= rol.position)).catch(() => { })}
      user.roles.remove(user.roles.cache.filter(rol => ekipRol.position <= rol.position)).catch(() => { })
      if(ControlsData && ControlsData.taglıalım === "Açık") {client.setRoles(user.id, cfg.Roles.KayıtsızRolü)}
      await client.channels.cache.get(cfg.Channels.Chat).send(new MessageEmbed().setDescription(`${user} Kişisi tagımızı kullanıcı adından çıkardığı için <@&${cfg.Tag.TagRolü}> rolü alındı.\n Bizimle geçirdiğin süre zarfında umarım eğlenmişsindir...`).setColor("#B20000")).then(m => m.delete({timeout: 5000}))
      await client.channels.cache.get(cfg.Channels.Tag).send(`${cfg.Emoji.RedEmoji} ${user} adlı üye ( ᴶ ) tagını kullanıcı adından çıkararak ailemize veda etti!\n**Sunucuda bulunan toplam taglı üye sayımız:** (\`${total}\`)\n───────────────\nÖnce ki kullanıcı adı: \`${oldUser.username.replace("`","")}\`\nSonra ki kullanıcı adı: \`${newUser.username.replace("`","")}\``);}


    if((!oldUser.discriminator.includes("")) && (newUser.discriminator.includes(""))) {
      if(cfg.Tag.TagRolü) user.roles.add(cfg.Tag.TagRolü).catch(() => { })
      await client.channels.cache.get(cfg.Channels.Chat).send(new MessageEmbed().setDescription(`${user} Kişisi tagımızı kullanıcı adına eklediği için <@&${cfg.Tag.TagRolü}> rolü verildi.\n Ayrıcalıklarını öğrenmek için <#${cfg.Channels.TagAyrıcalıkları}> kanalına bakabilirsin iyi eğlenceler.`).setColor("#32FF00")).then(m => m.delete({timeout: 5000}))
      await client.channels.cache.get(cfg.Channels.Tag).send(`${user} adlı üye (  ) tagını kullanıcı adına yerleştirerek ailemize katıldı!\n**Sunucuda bulunan toplam taglı üye sayımız:** (\`${total}\`)\n───────────────\nÖnce ki kullanıcı adı: \`${oldUser.discriminator.replace("`","")}\`\nSonra ki kullanıcı adı: \`${newUser.discriminator.replace("`","")}\``);
      } else if ((oldUser.discriminator.includes("")) && (!newUser.discriminator.includes(""))) {
      if(cfg.Tag.Tags.some(q => newUser.tag.includes(q))) return
      let ekipRol = guild.roles.cache.get(cfg.Tag.TagRolü)
      if(user.roles.cache.has(cfg.Roles.BoosterRolü)) {user.roles.remove(user.roles.cache.filter(rol => cfg.Roles.BoosterRolü.position <= rol.position)).catch(() => { })}
      user.roles.remove(user.roles.cache.filter(rol => ekipRol.position <= rol.position)).catch(() => { })
      if(ControlsData && ControlsData.taglıalım === "Açık") {client.setRoles(user.id, cfg.Roles.KayıtsızRolü)}
      await client.channels.cache.get(cfg.Channels.Chat).send(new MessageEmbed().setDescription(`${user} Kişisi tagımızı kullanıcı adından çıkardığı için <@&${cfg.Tag.TagRolü}> rolü alındı.\n Bizimle geçirdiğin süre zarfında umarım eğlenmişsindir...`).setColor("#B20000")).then(m => m.delete({timeout: 5000}))
      await client.channels.cache.get(cfg.Channels.Tag).send(`${cfg.Emoji.RedEmoji} ${user} adlı üye (  ) tagını kullanıcı adından çıkararak ailemize veda etti!\n**Sunucuda bulunan toplam taglı üye sayımız:** (\`${total}\`)\n───────────────\nÖnce ki kullanıcı adı: \`${oldUser.discriminator.replace("`","")}\`\nSonra ki kullanıcı adı: \`${newUser.discriminator.replace("`","")}\``);}
    


}

module.exports.conf = {
  name: "userUpdate",
};
