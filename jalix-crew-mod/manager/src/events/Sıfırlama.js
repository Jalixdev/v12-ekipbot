const client = global.client;
const cfg = require("../configs/config.json");
const ControlsDatabase = require("../schemas/Controls");
const { CronJob } = require("cron");

module.exports = async () => {
  
  const ControlsData = await ControlsDatabase.findOne({ guildID: cfg.Server.GuildID}); 
  
  const Vegasx1 = new CronJob("00 00 8 * * *", function() {
  client.channels.cache.get(cfg.Channels.Chat).send('Günaydın '+cfg.Server.GuildName+'! 08:00')
  }, null, true, "Europe/Istanbul");
  Vegasx1.start();

  const Vegasx2 = new CronJob("00 00 00 * * *", function() {
  client.channels.cache.get(cfg.Channels.Chat).send(`**───────────────────────────────────────**\n\`>\` Bugün de bitti, yeni gününüz sevdiklerinizle mutlu geçsin!\n\`>\`  Şunu asla unutmayın ki seviliyorsunuz ve değerlisiniz. İyi geceler!\n**───────────────────────────────────────**\n**[00.00]** https://vegasxd.is-inside.me/ILInH0rF.gif`).then(Msg => Msg.react(`🌙`) && Msg.react(`🌟`));
  }, null, true, "Europe/Istanbul");
  Vegasx2.start();

  const Vegasx3 = new CronJob("00 00 3 * * *", function() {
  client.channels.cache.get(cfg.Channels.Chat).send('Gece 3 oldu ya sen neden uyumuyorsun?')
  }, null, true, "Europe/Istanbul");
  Vegasx3.start();

  const Vegasx4 = new CronJob("00 00 18 * * *", function() {
  client.channels.cache.get(cfg.Channels.Chat).send('İyi akşamlar '+cfg.Server.GuildName+'! 18:00')
  }, null, true, "Europe/Istanbul");
  Vegasx4.start();

  const Vegasx5 = new CronJob("00 00 00 * * 0", function() {
  client.guilds.cache.forEach(async (guild) => {
  await ControlsData.findOneAndUpdate({ guildID: cfg.Server.GuildID}, { $set: { haftalıkkayıt: 0 } }, { upsert: true });})
  }, null, true, "Europe/Istanbul");
  Vegasx5.start();

  const Vegasx6 = new CronJob("00 00 00 * * 0", function() {
  client.guilds.cache.forEach(async (guild) => {
  await ControlsData.findOneAndUpdate({ guildID: cfg.Server.GuildID}, { $set: { haftalıktaglı: 0 } }, { upsert: true });})
  }, null, true, "Europe/Istanbul");
  Vegasx6.start();

  const Vegasx7 = new CronJob("00 00 00 * * *", function() {
  client.guilds.cache.get(cfg.Server.GuildID).members.cache.filter(x => !x.user.bot && cfg.Tag.Tags.some(q => x.user.tag.includes(q)) && !x.roles.cache.has(cfg.Tag.TagRolü)).array().forEach((tag, index) => {
  setTimeout(() => {
  tag.roles.add(cfg.Tag.TagRolü).catch(() => { })
  }, index*3000);
  });
  }, null, true, "Europe/Istanbul");
  Vegasx7.start();

}

module.exports.conf = {
  name: "ready",
};
