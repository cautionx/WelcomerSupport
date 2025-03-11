const fs = require("fs");
const path = require("path");

async function loadPrefixCommands(client) {
    const commandsPath = path.join(__dirname, "../commands/prefix");
    client.prefixCommands = new Map();

    function readCommands(directory) {
        const files = fs.readdirSync(directory, { withFileTypes: true });

        for (const file of files) {
            const fullPath = path.join(directory, file.name);

            if (file.isDirectory()) {
                readCommands(fullPath);
            } else if (file.isFile() && file.name.endsWith(".js")) {
                try {
                    const command = require(fullPath);

                    if (command.name && command.execute) {
                        client.prefixCommands.set(command.name, command);
                    } else {
                        console.warn(`Prefix command ${file.name} is missing "name" or "execute".`);
                    }
                } catch (error) {
                    console.error(`Error loading prefix command ${file.name}: ${error.message}`);
                }
            }
        }
    }

    readCommands(commandsPath);

    console.log(`Prefix: \x1b[33m${client.prefixCommands.size}\x1b[0m`);
}

module.exports = { loadPrefixCommands };
