const { Events, MessageFlags } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (!interaction.customId.startsWith("rr_")) return;

        const roleId = interaction.customId.replace("rr_", "");
        const role = interaction.guild.roles.cache.get(roleId);
        const member = interaction.member;

        if (!role) {
            return interaction.reply({ content: "Role not found!", flags: MessageFlags.Ephemeral });
        }

        if (member.roles.cache.has(roleId)) {
            await member.roles.remove(role);
            await interaction.reply({ content: `Removed <@&${role.id}>`, flags: MessageFlags.Ephemeral });
        } else {
            await member.roles.add(role);
            await interaction.reply({ content: `Added <@&${role.id}>`, flags: MessageFlags.Ephemeral });
        }
    }
};
