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

        // Add voice channel name update
        const guildCount = client.guilds.cache.size; // Get the number of servers the bot is in
        const voiceChannelId = 'YOUR_VOICE_CHANNEL_ID'; // Replace with your target voice channel ID

        try {
            const voiceChannel = await client.channels.fetch(voiceChannelId);
            if (voiceChannel && voiceChannel.type === 2) { // Type 2 is for voice channels
                await voiceChannel.setName(`Servers: ${guildCount}`);
                console.log(`Updated voice channel name to 'Servers: ${guildCount}'`);
            } else {
                console.log('Channel not found or not a voice channel');
            }
        } catch (error) {
            console.log('Error updating channel name:', error);
        }
    }
};