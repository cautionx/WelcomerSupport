const { EmbedBuilder, PermissionFlagsBits, Events, ButtonBuilder, ActionRowBuilder, ButtonStyle, MessageFlags } = require("discord.js");
const Ticket = require("../../structure/ticket_structure");
const config = require("../../config/ticket_config.json");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === "ticket_reason") {
      const reason = interaction.fields.getTextInputValue("reason");
      const guild = interaction.guild;
      const category = config.categoryId;
      const userId = interaction.user.id;

      const existingTicket = await Ticket.findOne({ userId });
      if (existingTicket) {
        return interaction.reply({ 
          content: "You already have an open ticket!", 
          flags: MessageFlags.Ephemeral
        });
      }

      const ticketNumber = Math.floor(1000 + Math.random() * 9000);

      const ticketChannel = await guild.channels.create({
        name: `ticket-${ticketNumber}`,
        type: 0,
        parent: category,
        permissionOverwrites: [
          { id: guild.id, 
            deny: [PermissionFlagsBits.ViewChannel] },

          { id: userId, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages], 
            deny: [PermissionFlagsBits.MentionEveryone, PermissionFlagsBits.UseApplicationCommands] },

          ...config.staffRoles.map(roleId => ({ id: roleId, allow: [PermissionFlagsBits.ViewChannel] }))
        ]
      });

      const ticket = new Ticket({
        userId,
        ticketId: ticketNumber,
        channelId: ticketChannel.id
      });
      await ticket.save();

      // Buttons (Lock, Unlock, Close, Mark as Solved)
      const lockButton = new ButtonBuilder()
        .setCustomId("lock_ticket")
        .setEmoji("🔒")
        .setStyle(ButtonStyle.Secondary);

      const unlockButton = new ButtonBuilder()
        .setCustomId("unlock_ticket")
        .setEmoji("🔓")
        .setStyle(ButtonStyle.Secondary);

      const closeButton = new ButtonBuilder()
        .setCustomId("close_ticket")
        .setEmoji("🗑️")
        .setStyle(ButtonStyle.Danger);

      const solvedButton = new ButtonBuilder()
        .setCustomId("mark_solved")
        .setEmoji("✅")
        .setStyle(ButtonStyle.Secondary);

      const buttonRow = new ActionRowBuilder().addComponents(lockButton, unlockButton, solvedButton, closeButton);

      // Embed for ticket channel
      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
        .addFields({ name: '**Why do you need support?**', value: `\`\`\`${reason}\`\`\`` });

      const information = new EmbedBuilder()
      .setColor('Blue')
      .setTitle('Further Information')
      .setDescription('Please make sure to provide images, logs and any other helpful information that will help resolve your issue.\n\nOnce your issue is resolved, please press the ✅ button below to mark the request as resolved.')

      const message = await ticketChannel.send({
        content: `<@${interaction.user.id}> - **#${ticketNumber}**`,
        embeds: [embed, information],
        components: [buttonRow]
    });

      await message.pin(); 

      await interaction.reply({ content: `Ticket Created: ${ticketChannel}`, flags: MessageFlags.Ephemeral });
    }
  }
};
