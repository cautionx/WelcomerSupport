const { EmbedBuilder, Events, ActivityType, PermissionFlagsBits } = require('discord.js');
const { app: { status } } = require('../../../config');

async function clientLogin(client) {
    console.log(`Client: ✅`);

    const channel = client.channels.cache.get(status);
    if (!channel) return;

    const embed = new EmbedBuilder()
        .setColor('Green')
        .setDescription(`**${client.user.tag}** is now online.`);

    await channel.send({ embeds: [embed] });
}

module.exports = {
    name: Events.ClientReady,
    async execute(client) {
        await clientLogin(client);

        client.user.setActivity('📌 Use #support for help!', { type: 4 }); 
    }
}