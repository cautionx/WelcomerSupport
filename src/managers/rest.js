const { REST, Routes } = require('discord.js');
const config = require('../../config');

async function loadRestAPI(client) {
    if (!client.commands || client.commands.size === 0) {
        console.error("No commands found in client.commands.");
        return;
    }

    const rest = new REST({ version: '10' }).setToken(config.app.token);

    const commands = Array.from(client.commands.values());

    const guildCommands = commands.filter(command => command.guild).map(command => command.data.toJSON());
    const globalCommands = commands.filter(command => !command.guild).map(command => command.data.toJSON());

    try {
        await rest.put(Routes.applicationCommands(config.app.id), { body: globalCommands });

        await rest.put(Routes.applicationGuildCommands(config.app.id, config.dev.guild), { body: guildCommands });

        console.log('RestAPI: ✅');
    } catch (error) {
        console.error('REST Error:', error);
    }
}

module.exports = { loadRestAPI };
