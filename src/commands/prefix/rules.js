const { PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "rules",
    description: "Displays the server rules",
    execute(message, args) {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return;
        }
        const rules = `
# Discord Rules
\` 1 \` **Be Respectful**  
Treat everyone with respect. Harassment, discrimination, or any form of hate speech will not be tolerated.  
\` 2 \` **No Spamming**  
Avoid spamming messages, emojis, or links.  
\` 3 \` **Keep Content Safe for Work**  
No NSFW content, including images, links, or text.  
\` 4 \` **Follow Discord's Guidelines**  
Ensure you are following Discord's Terms of Service and Community Guidelines.  
\` 5 \` **No Advertising**  
Do not advertise without permission from the server staff.  
\` 6 \` **Use Appropriate Channel**  
Keep discussions relevant to the channel topics.
        `;

        message.channel.send(rules);
    }
};
