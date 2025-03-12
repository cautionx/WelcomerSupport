const { EmbedBuilder } = require("discord.js");
const Ticket = require("../../structure/ticket_structure");

module.exports = {
    name: "tickets",
    description: "Lists all open tickets.",
    async execute(message, args) {
        let query = { userId: message.author.id, solved: false };

        const tickets = await Ticket.find(query);

        if (tickets.length === 0) {
            return message.channel.send("No open tickets found.");
        }

        const embed = new EmbedBuilder()
            .setColor('Aqua')
            .setTitle("Tickets")
            .setDescription(tickets.map(ticket =>
                `**#${ticket.ticketId}** - <#${ticket.channelId}> (Created: <t:${Math.floor(ticket.createdAt / 1000)}:R>)`
            ).join("\n"))

        message.channel.send({ embeds: [embed] });
    }
};
