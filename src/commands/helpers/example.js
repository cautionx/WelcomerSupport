const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('faq')
        .setDescription('-')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral }); 

        const embed = new EmbedBuilder()
            .setTitle(`FAQ`)
            .setDescription('Use the buttons displayed below to find out some frequentley asked questions!')


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

        await interaction.editReply({
            embeds: [embed],
            components: [row],
            flags: MessageFlags.Ephemeral
        });
    }
};