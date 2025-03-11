const { Events, EmbedBuilder, MessageFlags } = require("discord.js");
const config = require("../../../config");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === "message_modal") {
      const messageType = interaction.fields.getTextInputValue("message_type").toLowerCase();
      const content = interaction.fields.getTextInputValue("message_content");

      if (messageType === "embed") {
        const embed = new EmbedBuilder()
          .setColor(config.colour.embed1)
          .setDescription(content);

        await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
      } else if (messageType === "text") {
        await interaction.reply({ content: content, flags: MessageFlags.Ephemeral });
      } else {
        await interaction.reply({ content: "Invalid message type. Please choose 'embed' or 'text'.", ephemeral: true });
      }
    }
  }
};
