const fs = require("fs");
const path = require("path");

async function loadCommands(client) {
    const commandsPath = path.join(__dirname, "../commands");
    client.commands = new Map();

    function readCommands(directory) {
        const files = fs.readdirSync(directory, { withFileTypes: true });

        for (const file of files) {
            const fullPath = path.join(directory, file.name);

            if (file.isDirectory()) {
                readCommands(fullPath);
            } else if (file.isFile() && file.name.endsWith(".js")) {
                try {
                    const command = require(fullPath);

                    // Ignore prefix commands (commands without "data")
                    if (!command.data || !command.execute) continue;

                    client.commands.set(command.data.name, command);
                } catch (error) {
                    console.error(`Error loading command ${file.name}: ${error.message}`);
                }
            }
        }
    }

    readCommands(commandsPath);

    console.log(`Slash: \x1b[33m${client.commands.size}\x1b[0m`);
}

module.exports = { loadCommands };
