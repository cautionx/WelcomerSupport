const { Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isButton()) return;

    if (interaction.customId === "create_ticket") {
      const modal = new ModalBuilder()
        .setCustomId("ticket_reason")
        .setTitle(`Support Ticket - ${interaction.user.username}`);

      const reasonInput = new TextInputBuilder()
        .setCustomId("reason")
        .setLabel("Why do you need support?")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      const actionRow = new ActionRowBuilder().addComponents(reasonInput);
      modal.addComponents(actionRow);

      await interaction.showModal(modal);
    }
  }
};
