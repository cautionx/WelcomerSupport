const { Events, EmbedBuilder, MessageFlags } = require("discord.js");
const Ticket = require("../structure/ticket_structure");
const config = require("../config/ticket_config.json");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isButton()) return;

    const { customId, member, channel, guild } = interaction;
    const ticket = await Ticket.findOne({ channelId: channel.id });

    if (!ticket) return;

    const isStaff = member.roles.cache.some(role => config.staffRoles.includes(role.id));
    if ((customId === "lock_ticket" || customId === "unlock_ticket" || customId === "close_ticket") && !isStaff) {
      return interaction.reply({ content: "You don't have permission to use this!", flags: MessageFlags.Ephemeral });
    }

    // Prevent marking as solved if already solved
    if (customId === "mark_solved") {
      if (ticket.solved) {
        return interaction.reply({ content: "This ticket has already been marked as solved.", flags: MessageFlags.Ephemeral });
      }

      await channel.setName(`✅${channel.name}`);

      const solvedEmbed = new EmbedBuilder()
        .setColor("Green")
        .setTitle('Ticket Solved')
        .setDescription("Ticket has been marked as solved.");

      await channel.send({ embeds: [solvedEmbed] });

      ticket.solved = true;
      await ticket.save();

      await interaction.reply({ content: "Ticket marked as solved.", flags: MessageFlags.Ephemeral });
    }

    if (customId === "close_ticket") {
      await interaction.reply({ content: "Ticket closing in 4 seconds...", flags: MessageFlags.Ephemeral });

      // Fetch and organize messages
      const messages = await channel.messages.fetch({ limit: 100 });
      const sortedMessages = messages.sort((a, b) => a.createdTimestamp - b.createdTimestamp);
      
      let transcriptContent = sortedMessages.map(msg => {
        const time = new Date(msg.createdTimestamp).toLocaleString();
        const attachments = msg.attachments.size > 0 
          ? `\nAttachments: ${msg.attachments.map(att => att.url).join(", ")}`
          : "";
        return `[${time}] **${msg.author.username}**: ${msg.content || "(No Text)"}${attachments}`;
      }).join("\n");

      if (!transcriptContent) transcriptContent = "No messages recorded in this ticket.";

      const timestamp = new Date().toLocaleString("en-US", { 
        year: "numeric", 
        month: "2-digit", 
        day: "2-digit", 
        hour: "2-digit", 
        minute: "2-digit", 
        hour12: true 
      });

      const transcriptChannel = guild.channels.cache.get(config.transcriptChannel);
      if (transcriptChannel) {
        const transcriptEmbed = new EmbedBuilder()
          .setColor("Blue")
          .setTitle(`Transcript - (${timestamp})`)
          .setDescription(transcriptContent.length > 4000 ? "Transcript too long to display." : `\`\`\`${transcriptContent}\`\`\``)
          .setTimestamp();

        await transcriptChannel.send({ 
          content: `<@${ticket.userId}> - **#${ticket.ticketId}**`, 
          embeds: [transcriptEmbed] 
        });
      }

      await Ticket.deleteOne({ channelId: channel.id });

      setTimeout(() => {
        channel.delete().catch(console.error);
      }, 4000);
    }
  }
};
