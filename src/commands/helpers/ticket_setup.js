const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, MessageFlags, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js");
const config = require("../../config/ticket_config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("-")
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

    const but2 = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel('FAQ')
      .setURL('https://discord.com/channels/1292277321436500039/1305649023755223153')


    const row = new ActionRowBuilder().addComponents(button, but2);

    const cont = "**Welcomer Support**\n\nIf you require assistance with the Welcomer bot, please open a support ticket below.\n\nOur helpers are dedicated to providing prompt and effective support to ensure your experience is seamless.\n\nBefore opening a support ticket make sure you have viewed our FAQ."

    await ticketChannel.send({ content: cont, components: [row] });

    await interaction.reply({ content: "Sent!", flags: MessageFlags.Ephemeral });
  }
};
