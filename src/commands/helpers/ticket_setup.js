const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, MessageFlags, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js");
const config = require("../../config/ticket_config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Developer Command")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {

    const ticketChannel = interaction.guild.channels.cache.get(config.ticketChannel);
    if (!ticketChannel) {
      return interaction.reply({ content: "The ticket channel is not configured properly.", flags: MessageFlags.Ephemeral });
    }

    const button = new ButtonBuilder()
      .setCustomId("create_ticket")
      .setEmoji("📩")
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(button);

    const cont = "**Welcomer Support**\n\nIf you require assistance with the Welcomer bot, please open a support ticket below.\n\nOur helpers are dedicated to providing prompt and effective support to ensure your experience is seamless."

    await ticketChannel.send({ content: cont, components: [row] });

    await interaction.reply({ content: "Sent!", flags: MessageFlags.Ephemeral });
  }
};
