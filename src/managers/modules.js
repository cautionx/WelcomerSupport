const fs = require('fs');
const path = require('path');

async function loadModules(client) {
    const modulesPath = path.join(__dirname, '../../node_modules'); 
    let folderCount = 0;

    function readModules(directory) {
        const files = fs.readdirSync(directory, { withFileTypes: true });

        for (const file of files) {
            const fullPath = path.join(directory, file.name);

            if (file.isDirectory()) {
                folderCount++; 
                readModules(fullPath); 
            }
        }
    }

    readModules(modulesPath); 

    console.log(`Modules: \x1b[33m${folderCount}\x1b[0m\n`);
}

module.exports = { loadModules };
