const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, MessageFlags } = require('discord.js');
const config = require('../../../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('faq')
        .setDescription('-')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral }); 

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('but1')
                    .setLabel('q1')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('but2')
                    .setLabel('q2')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('but3')
                    .setLabel('q3')
                    .setStyle(ButtonStyle.Secondary)
            );

            const faqdesc = "❓**Frequently Asked Questions**\nUse the buttons displayed below to find out some questions which are commonly asked."

        await interaction.channel.send({
            content: `${faqdesc}`,
            components: [row]
        });

        await interaction.editReply({
            content: 'Sent!',
            flags: MessageFlags.Ephemeral
        });
    }
};