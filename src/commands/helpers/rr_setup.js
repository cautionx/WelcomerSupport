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

        const embed = {
            color: 0x2f82ee,
            title: "Get your Roles",
            description: "📣 `Announcements` - Recieve important news about Welcomer.\n\n⚒️ `Updates` - Get the important new features on Welcomer.\n\n💥 `Outages` - Notified whenever Welcomer runs into an issue."
        };

        const sentMessage = await channel.send({ embeds: [embed], components: [buttons] });

        await interaction.reply({ content: "Sent!", flags: MessageFlags.Ephemeral });
    }
};
