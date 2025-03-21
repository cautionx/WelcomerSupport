const { Events, EmbedBuilder, MessageFlags } = require("discord.js");
const config = require("../../../config");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === "message_modal") {
      await interaction.deferReply({ flags: MessageFlags.Ephemeral }); 

      const messageType = interaction.fields.getTextInputValue("message_type").toLowerCase();
      const content = interaction.fields.getTextInputValue("message_content");

      if (messageType === "embed") {
        const embed = new EmbedBuilder()
          .setColor(config.colour.embed1)
          .setDescription(content);

        await targetChannel.send({ embeds: [embed] });
      } else if (messageType === "text") {
        await targetChannel.send({ content: content });
      } else {
        return interaction.followUp({ content: "Invalid message type. Please choose 'embed' or 'text'.", flags: MessageFlags.Ephemeral });
      }

      await interaction.followUp({ content: "Sent!", flags: MessageFlags.Ephemeral });
    }
  }
};
