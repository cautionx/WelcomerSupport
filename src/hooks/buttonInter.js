const { EmbedBuilder, Events, MessageFlags } = require('discord.js');
const config = require('../../config');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;

        const { customId } = interaction;

        if (customId === 'but1') {

            const e1 = new EmbedBuilder()
            .setColor(config.colour.embed1)
            .setTitle('Struggling with Welcomer permissions?')
            .setDescription('Use `/check` which checks the current/selected channel to see if it has the right perms.')

            await interaction.reply({ embeds: [e1], flags: MessageFlags.Ephemeral });
        }

        if (customId === 'but2') {

            const e2 = new EmbedBuilder()
            .setColor(config.colour.embed1)
            .setTitle('How do I remove the original v1 System?')
            .setDescription('Use `/v1remove` to remove the system completely from your guild.')

            await interaction.reply({ embeds: [e2], flags: MessageFlags.Ephemeral });
        }

        if (customId === 'but3') {

            const e3 = new EmbedBuilder()
            .setColor(config.colour.embed1)
            .setTitle('How do I recieve support?')
            .setDescription('You can navigate too <#1348818222345883738> and open a support ticket, where we can give you individual 1 to 1 support with your issue.')

            await interaction.reply({ embeds: [e3], flags: MessageFlags.Ephemeral });
        }
    }
};