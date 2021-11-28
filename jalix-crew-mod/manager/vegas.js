const { Client, Collection } = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const cfg = require("./src/configs/config.json");
const moment = require("moment");
const mongo = require("mongoose");
require("moment-duration-format")
const logs = require('discord-logs');
logs(client);
const { CronJob } = require("cron");

client.commands = global.commands = new Collection();
client.aliases = new Collection();
client.cooldown = new Map();
client.afklar = new Set();
client.locked = new Set();

require("./src/handlers/commandHandler");
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/events/functions.js")(client, cfg, moment); 

client.login(cfg.Bot.Token).catch(() => console.error("Bota giriş yapılırken başarısız olundu!"));

client.puanData = [
  { role: "857314668875087913", puan: 6000 },
  { role: "857314668620414986", puan: 10000 },
  { role: "857314501589467186", puan: 17500 },
  { role: "857314428638986280", puan: 24500 },
  { role: "857314422481092638", puan: 32400 },
  { role: "857314422199418890", puan: 43000 },
  { role: "857313971454869564", puan: 52350 },
  { role: "857314288380411955", puan: 52350 },
  { role: "857313971887013929", puan: 65700 },
  { role: "859499862978330634", puan: 270000 },
  { role: "859499862978330634", puan: 270000 },
   ]