const { ActionRowBuilder, ButtonStyle, ButtonBuilder, MessageFlags } = require("discord.js");

const createPaginationButtons = (currentPage, totalPages) => {
    return new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('prev')
            .setEmoji('1300944185783750696')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(currentPage === 0),
        new ButtonBuilder()
            .setCustomId('page')
            .setLabel(`${currentPage + 1}/${totalPages}`)
            .setStyle(ButtonStyle.Success)
            .setDisabled(true),
        new ButtonBuilder()
            .setCustomId('next')
            .setEmoji('1300944159452041226')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(currentPage === totalPages - 1)
    );
};

const handlePagination = async (interaction, pages) => {
    let currentPage = 0;

    await interaction.reply({
        embeds: [pages[currentPage]],
        components: [createPaginationButtons(currentPage, pages.length)],
        flags: MessageFlags.Ephemeral,
        withResponse: true 
    });

    const message = await interaction.fetchReply();

    while (true) {
        const i = await message.awaitMessageComponent({
            filter: i => i.user.id === interaction.user.id
        });

        if (i.customId === 'prev') {
            currentPage = Math.max(currentPage - 1, 0);
        } else if (i.customId === 'next') {
            currentPage = Math.min(currentPage + 1, pages.length - 1);
        }

        await i.update({
            embeds: [pages[currentPage]],
            components: [createPaginationButtons(currentPage, pages.length)]
        });
    }
};

module.exports = handlePagination;
