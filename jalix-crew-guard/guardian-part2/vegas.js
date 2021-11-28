const { Client, Collection } = require("discord.js");
const Discord = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const request = require("request");
const logs = require('discord-logs');
logs(client);
const cfg = require("./src/configs/config.json");
const moment = require("moment");
const roleData = require("./src/schemas/roleBackup.js");
const channelData = require("./src/schemas/channelBackup.js");
const mongoose = require("mongoose");
require("moment-duration-format")

client.commands = global.commands = new Collection();
client.aliases = new Collection();

require("./src/handlers/commandHandler");
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/events/functions.js")(client, cfg, moment, Discord, request, mongoose); 

client.login(cfg.Bot.Token).catch(err => console.error("Bota giriş yapılırken başarısız olundu!"));

client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type !== "text") return;
  if (!msg.guild) return;
  let prefikslerim = cfg.Bot.Prefix
  let vegasımkeim = false;
  for (const içindeki of prefikslerim) {
    if (msg.content.startsWith(içindeki)) vegasımkeim = içindeki;
  }
  if (!vegasımkeim) return;
  const args = msg.content
    .slice(vegasımkeim.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  const event = msg.content.toLower;
  const split = msg.content.split('"');
  switch (command) {
    case "demir": 
    case "backup":
    case "herdaim":
    case "dağıtoc":
    case "seks":
    case "goflex":
    case "çükest":
    case "juqest":
      if (!cfg.Bot.Owners.includes(msg.author.id)) return 
      if(!args[0]) return msg.channel.send("Veritabanında bulunan bir id'yi girmen gerekiyor!")
      await roleData.findOne({ rolid: args[0] }, async (err, res) => {
        if (!res) return;
        let roleData = {
          name: res.name,
          hoist: res.hoist,
          color: res.color,
          position: res.position,
          permissions: res.permissions,
          mentionable: false
        };
        await msg.guild.roles
          .create({ data: roleData, reason: "Rol sildiğin için yarrağımı yemiş bulunmaktasın!" })
          .then(async rolee => {
            res.members.filter(x => msg.guild.members.cache.has(x)).map(member => {
              msg.guild.members.cache.get(member).roles.add(rolee.id);
            });
            await channelData.findOne({ roleid: args[0] }, async (err, res) => {
              if (!res) return;
              res.channels.map(x => {
                let channel = msg.guild.channels.cache.get(x.channel);
                if (!channel) return;
                let vegas = new Discord.Permissions(x.allow).toArray();
                let kei = new Discord.Permissions(x.deny).toArray();
                let vegasaşkım = {};
                let keiaşkım = {};
                for (let i = 0; i < vegas.length; i++) {
                  let x = vegas.reduce((key, value) => {
                    return {
                      [vegas[i]]: true
                    };
                  });
                  Object.assign(vegasaşkım, x);
                }

                for (let i = 0; i < kei.length; i++) {
                  let x = kei.reduce((key, value) => {
                    return {
                      [kei[i]]: false
                    };
                  });
                  Object.assign(keiaşkım, x);
                }
                let permissions = Object.assign(vegasaşkım, keiaşkım);
                channel.updateOverwrite(rolee, permissions);
              });
            });
          });
      });
      break;
  }
});
