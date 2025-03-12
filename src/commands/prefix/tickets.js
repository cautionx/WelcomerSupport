const { EmbedBuilder } = require("discord.js");
const Ticket = require("../../structure/ticket_structure");

module.exports = {
    name: "tickets",
    description: "Lists all open tickets in the server.",
    async execute(message, args) {
        const tickets = await Ticket.find({ solved: false });

        if (tickets.length === 0) {
            return message.channel.send("There are no open tickets.");
        }

        const embed = new EmbedBuilder()
            .setColor('Orange')
            .setTitle(`Tickets (${tickets.length})`)
            .setDescription(tickets.map(ticket =>
                `**#${ticket.ticketId}** - <#${ticket.channelId}> - <@${ticket.userId}> (**<t:${Math.floor(ticket.createdAt / 1000)}:R>**)`
            ).join("\n"))

        message.channel.send({ embeds: [embed] });
    }
};
