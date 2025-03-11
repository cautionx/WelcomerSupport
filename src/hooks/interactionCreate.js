const { MessageFlags, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js')

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);

            const r = 'https://discord.gg/Y53ujqYvzZ'
            const d = 'https://discord.com/users/1313310720854724720'
            const msg = '**Something went wrong...**'

            const report = new ButtonBuilder()
            .setLabel('Support')
            .setStyle(ButtonStyle.Link)
            .setURL(r)

            const developer = new ButtonBuilder()
            .setLabel('Contact Developer')
            .setStyle(ButtonStyle.Link)
            .setURL(d)

            const row = new ActionRowBuilder().addComponents(report, developer); 

            const embed = new EmbedBuilder()
            .setColor('Red')
            .setDescription(`\`\`\`js\n${error.message}\`\`\``)

            await interaction.reply({
                content: msg,
                embeds: [embed],
                components: [row],
                flags: MessageFlags.Ephemeral,
            });
        }
    },
};
