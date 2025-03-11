const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { loadCommands } = require('./src/managers/commands');
const { loadPrefixCommands } = require('./src/managers/prefix');
const { loadHooks } = require('./src/managers/hooks');
const { loadRestAPI } = require('./src/managers/rest');
const { loadStructures } = require('./src/managers/structure');
const { loadModules } = require('./src/managers/modules'); 
const { loadDatabase } = require('./src/managers/mongoose'); 
const { loadManagers } = require('./src/managers/managers');

const config = require('./config');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.Message,                 
    ],
});

client.commands = new Collection(); 
client.prefixCommands = new Collection(); 

(async () => {
    await loadCommands(client);
    await loadPrefixCommands(client);
    await loadHooks(client);
    await loadManagers(client);
    await loadStructures(client);
    await loadModules(client);
    await loadRestAPI(client);
    await loadDatabase();

    client.login(config.app.token);
})();
