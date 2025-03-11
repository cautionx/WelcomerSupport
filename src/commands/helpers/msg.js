const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("msg")
    .setDescription("Developer Command"),

  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("message_modal")
      .setTitle("Message Customization");

    // Choose Message Type (Embed or Text)
    const messageTypeInput = new TextInputBuilder()
      .setCustomId("message_type")
      .setLabel("Choose Message Type:")
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setPlaceholder("Type 'embed' for an embed or 'text' for a plain message");

    const messageContentInput = new TextInputBuilder()
      .setCustomId("message_content")
      .setLabel("Enter the Content:")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true)
      .setPlaceholder("Enter the content for your message");

    const actionRow1 = new ActionRowBuilder().addComponents(messageTypeInput);
    const actionRow2 = new ActionRowBuilder().addComponents(messageContentInput);

    modal.addComponents(actionRow1, actionRow2);

    await interaction.showModal(modal);
  }
};

