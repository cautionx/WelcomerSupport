const { EmbedBuilder } = require("discord.js");
const Ticket = require("../../structure/ticket_structure");
const config = require("../../../config");
const permissions = require("../../config/perm.json");

module.exports = {
    name: "tickets",
    description: "Lists all open tickets in the server.",
    async execute(message, args) {
        const helperRoleId = permissions.helperRole;

        if (!message.member.roles.cache.has(helperRoleId)) {
            return;
        }

        const tickets = await Ticket.find({ solved: false });

        if (tickets.length === 0) {
            return message.channel.send("There are no open tickets.");
        }

        const embed = new EmbedBuilder()
            .setColor(config.colour.embed1)
            .setTitle(`Tickets (${tickets.length})`)
            .setDescription(tickets.map(ticket =>
                `**#${ticket.ticketId}** [<#${ticket.channelId}> -- <@${ticket.userId}>] (**<t:${Math.floor(ticket.createdAt / 1000)}:R>**)`
            ).join("\n"));

        message.channel.send({ embeds: [embed] });
    }
};
