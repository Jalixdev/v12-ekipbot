module.exports = {
  conf: {
    aliases: ["angels1eval"],
    name: "guard1eval",
    owner: true,
    usage: 'guard1eval [kod]',
    description: 'Vegasın kod denemek için kullandığı komut.',
  },
  
  run: async ({client, msg, args}) => {
    
  if (!args[0]) return;
  let code = args.join(" ");
  function clean(text) {
  if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
  text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
  return text;};
  try {var evaled = clean(await eval(code));
  if(evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace("token", "Yasaklı komut").replace(client.token, "Yasaklı komut");
  msg.channel.send(`${evaled.replace(client.token, "Yasaklı komut")}`, {code: "js", split: true});} catch(err) { msg.channel.send(err, {code: "js", split: true}) };}}
