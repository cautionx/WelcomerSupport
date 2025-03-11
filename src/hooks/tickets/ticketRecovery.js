const { Events } = require("discord.js");
const Ticket = require("../../structure/ticket_structure");

module.exports = {
  name: Events.ChannelDelete,
  async execute(channel) {
    const ticket = await Ticket.findOne({ channelId: channel.id });
    if (ticket) {
      await Ticket.deleteOne({ channelId: channel.id });
      // console.log(`Deleted ticket #${ticket.ticketId}.`);
    }
  }
};
