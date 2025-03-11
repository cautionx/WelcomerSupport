const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, MessageFlags, ButtonStyle } = require('discord.js');
const config = require("../../config/rr_config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rr")
        .setDescription("Developer Command"),

    async execute(interaction) {
        const channel = await interaction.guild.channels.fetch(config.channelId);
        if (!channel) {
            return interaction.reply({ content: "Channel not found.", flags: MessageFlags.Ephemeral });
        }

        const roles = config.roles;

        const buttons = new ActionRowBuilder();
        roles.forEach(role => {
            buttons.addComponents(
                new ButtonBuilder()
                    .setCustomId(`rr_${role.roleId}`)
                    .setEmoji(role.label)
                    .setStyle(ButtonStyle.Secondary) // All buttons will be Secondary
            );
        });

        const description = 
        "📣 **Announcements** - Receive important news about Welcomer.\n\n" +
        "⚒️ **Updates** - Get the latest new features for Welcomer.\n\n" +
        "💥 **Outages** - Be notified whenever Welcomer encounters an issue.";

        const sentMessage = await channel.send({ content: description, components: [buttons] });

        await interaction.reply({ content: "Sent!", flags: MessageFlags.Ephemeral });
    }
};
