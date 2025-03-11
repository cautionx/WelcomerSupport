const { Events, PermissionFlagsBits } = require("discord.js");
const config = require("../../config");

module.exports = {
  name: Events.MessageCreate, 
  async execute(message) {
    if (!message.client) return; 
    const client = message.client;

    const prefix = config.app.prefix;
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Use client.prefixCommands instead of client.commands
    let command = client.prefixCommands.get(commandName) || 
                  client.prefixCommands.find(c => c.aliases && c.aliases.includes(commandName));

    if (!command) return;

    const member = message.member;

    if (command.uperm && !member.permissions.has(command.uperm)) {
      const userPermissionName = Object.keys(PermissionFlagsBits).find(
        (key) => PermissionFlagsBits[key] === command.uperm
      );
      return message.reply(`You do not have the \`${userPermissionName}\` permission to use this command.`);
    }

    try {
      await command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply("There was an error executing this command.");
    }
  }
};
