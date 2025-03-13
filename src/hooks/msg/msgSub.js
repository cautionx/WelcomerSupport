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

        await interaction.channel.send({ embeds: [embed] });
      } else if (messageType === "text") {
        await targetChannel.send({ content: content });
      } else {
        await interaction.reply({ content: "Invalid message type.", flags: MessageFlags.Ephemeral });
      }

      await interaction.reply({ content: "Sent!", flags: MessageFlags.Ephemeral });
    }
  }
};
