module.exports = {
  conf: {
    aliases: ["yetkiver","ytver","yver"],
    name: "yetkili",
    usage: 'yetkili [üye] [-yetkirolismi]',
    description: 'Belirttiğiniz kullanıcıya belirttiğiniz yetkili rolünü verir.',
 },

 run: async ({client, msg, args, cfg, author, uye, MessageEmbed, prefix}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.YetkiliAlım.includes(r.id)) &&!msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000) 
  let Args = args[1]
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  if (uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (!cfg.Tag.Tags.some(x => uye.user.tag.includes(x))) return client.timemessage(client.normalEmbed(`Belirttiğiniz kullanıcı sunucu tagına sahip olmadığı için yetki verme işlemi uyguluyamazsın.`, msg), msg.channel.id, 5000)
  if (!Args) return client.timemessage(client.normalEmbed(`Belirttiğiniz rol geçerli değil lütfen aşağıdaki verilere göre komutu uygulayınız.\n\n-Jalix - @Jalix of Jalix\n-peon - @Jalix of Jalix,@Bot Commands\n\n\`Örnek kullanım:\`\n\`!yetkiver 321724495864004610 -Jalix\n!yetkiver @Jalix#0001 -Jalix\``, msg), msg.channel.id, 7000)
        let map = new Map([
            ["-soul", [""]],
            ["-hypnos", [""]],
            ["-thetis", [""]],
            ["-phorkys", [""]],
            ["-asterion", [""]],
            ["-doris", [""]],
            ["-pontus", [""]],
            ["-fálaina", [""]],
            ["-alpheus", [""]],
            ["-peneius", [""]],
        ])
        let metin = ""
        let arr = []
        for (let [k, v] of map) {
        if (args[0] == k) return
         v.map(x => {
         arr.push(x)})}
        for (let [k, v] of map) {
         metin = metin + `\`${k}\` - ${v.filter(x => x !== cfg.Hammer.BotCommands).map(x => `<@&${x}>`)}\n`}
        let values = args[1]
        const embed = new MessageEmbed()
         .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
         .setColor("RANDOM")
         .setDescription(`Belirttiğiniz rol geçerli değil lütfen aşağıdaki verilere göre komutu uygulayınız.\n\n${metin}\n\n\`Örnek kullanım:\n${prefix}yetkiver 321724495864004610 -moon\${prefix}yetkiver @Jalix#1943 -rookies\`\n`)
        if (!values) return msg.channel.send(embed)
        if (!map.has(values.toLowerCase())) return msg.channel.send(embed)
        const roller = map.get(values)
        await uye.roles.add(roller)
        let arrx = arr.filter(function (item, pos) {
        return arr.indexOf(item) == pos;})
         arrx.map(async (x) => {
        if (uye.roles.cache.has(x)) {
        if (roller.includes(x)) return
        await uye.roles.remove(x)}})
        embed.setDescription(`${uye} kullanıcısına <@&${roller[0]}> yetkisi verildi.`)
        msg.channel.send(embed)}}