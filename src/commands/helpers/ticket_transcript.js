const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const Ticket = require("../../structure/ticket_structure");
const config = require("../../config/ticket_config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("transcript")
    .setDescription("Developer Command")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // Only staff can use

  async execute(interaction) {
    const { channel, guild, member } = interaction;
    
    // Check if this is a valid ticket channel
    const ticket = await Ticket.findOne({ channelId: channel.id });
    if (!ticket) {
      return interaction.reply({ content: "This is not a valid ticket channel.", ephemeral: true });
    }

    // Check if the user is a staff member
    const isStaff = member.roles.cache.some(role => config.staffRoles.includes(role.id));
    if (!isStaff) {
      return interaction.reply({ content: "You don't have permission to generate a transcript.", ephemeral: true });
    }

    // Fetch messages from the ticket channel
    const messages = await channel.messages.fetch({ limit: 100 });
    const transcriptContent = messages
      .sort((a, b) => a.createdTimestamp - b.createdTimestamp) // Sort by oldest first
      .map(msg => `[${new Date(msg.createdTimestamp).toLocaleString()}] ${msg.author.tag}: ${msg.content || "*Attachment*"}\n`)
      .join("\n");

    // Ensure there's a transcript channel configured
    const transcriptChannelId = config.transcriptChannel;
    const transcriptChannel = guild.channels.cache.get(transcriptChannelId);
    if (!transcriptChannel) {
      return interaction.reply({ content: "Transcript channel not found in config.", ephemeral: true });
    }

    // Send transcript to the transcript channel
    const transcriptEmbed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle(`Ticket Transcript`)
      .setDescription(transcriptContent.length > 4000 ? "Transcript is too long to display." : `\`\`\`${transcriptContent}\`\`\``)
      .setTimestamp()
      .setFooter({ text: `Ticket Owner: ${ticket.userId}` });

    await transcriptChannel.send({ embeds: [transcriptEmbed] });

    interaction.reply({ content: "Transcript has been sent to the transcript channel.", ephemeral: true });
  },
};
