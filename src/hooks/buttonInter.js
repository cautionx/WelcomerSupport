const { EmbedBuilder, Events, MessageFlags } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;

        const { customId, user } = interaction;

        if (customId === 'but1') {

            const e1 = new EmbedBuilder()
            .setTitle('Struggling with Welcomer permissions?')
            .setDescription('Use `/check` which checks the current/selected channel to see if it has the right perms.')

            await interaction.reply({ embeds: [e1], flags: MessageFlags.Ephemeral });
        }

        if (customId === 'but2') {

            const e2 = new EmbedBuilder()
            .setTitle('How do I remove the original v1 System?')
            .setDescription('**How do I remove the original v1 System?** > Use `/v1remove` to remove the system completely from your guild.')
            
            await interaction.reply({ embeds: [e2], flags: MessageFlags.Ephemeral });
        }

        if (customId === 'but3') {
            await interaction.reply({ embeds: [e3], flags: MessageFlags.Ephemeral });
        }
    }
};