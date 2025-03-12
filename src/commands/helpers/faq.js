const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, MessageFlags } = require('discord.js');
const config = require('../../../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('faq')
        .setDescription('-')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral }); 

        const embed = new EmbedBuilder()
            .setTitle('FAQ')
            .setDescription('Use the buttons displayed below to find out some frequently asked questions!')
            .setColor(config.colour.embed1); 

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('but1')
                    .setLabel('1')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('but2')
                    .setLabel('2')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('but3')
                    .setLabel('3')
                    .setStyle(ButtonStyle.Secondary)
            );

        await interaction.channel.send({
            embeds: [embed],
            components: [row]
        });

        await interaction.editReply({
            content: 'Sent!',
            flags: MessageFlags.Ephemeral
        });
    }
};