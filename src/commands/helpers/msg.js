const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("msg")
    .setDescription("-"),
  
  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("message_modal")
      .setTitle("Message Customization");

    const messageTypeInput = new TextInputBuilder()
      .setCustomId("message_type")
      .setLabel("Type")
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setPlaceholder("'embed' or 'text'");

    const messageContentInput = new TextInputBuilder()
      .setCustomId("message_content")
      .setLabel("Message")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true)
      .setPlaceholder("Type...");

    modal.addComponents(
      new ActionRowBuilder().addComponents(messageTypeInput),
      new ActionRowBuilder().addComponents(messageContentInput)
    );

    await interaction.showModal(modal);
  }
};
