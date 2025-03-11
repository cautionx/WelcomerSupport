const fs = require('fs');
const path = require('path');

async function loadHooks(client) {
    const hooksPath = path.join(__dirname, '../hooks');
    let hookCount = 0; 

    function readHooks(directory) {
        const files = fs.readdirSync(directory, { withFileTypes: true });

        for (const file of files) {
            const fullPath = path.join(directory, file.name);

            if (file.isDirectory()) {
                readHooks(fullPath); 
            } else if (file.isFile() && file.name.endsWith('.js')) {
                try {
                    const hook = require(fullPath);

                    if (hook.name && hook.execute) {
                        if (hook.once) {
                            client.once(hook.name, (...args) => hook.execute(...args, client));
                        } else {
                            client.on(hook.name, (...args) => hook.execute(...args, client));
                        }

                        hookCount++; 
                    } else {
                        console.warn(`Hook file ${file.name} is missing "name" or "execute".`);
                    }
                } catch (error) {
                    console.error(`Error loading hook file ${file.name}: ${error.message}`);
                }
            }
        }
    }

    readHooks(hooksPath);

    console.log(`Hooks: \x1b[33m${hookCount}\x1b[0m`); 
}

module.exports = { loadHooks };
