const fs = require('fs');
const path = require('path');

async function loadManagers() {
    const managersPath = path.join(__dirname, '../managers');
    let managerCount = 0;

    function readManagers(directory) {
        const files = fs.readdirSync(directory, { withFileTypes: true });

        for (const file of files) {
            const fullPath = path.join(directory, file.name);

            if (file.isDirectory()) {
                readManagers(fullPath);
            } else if (file.isFile() && file.name.endsWith('.js')) {
                try {
                    require(fullPath); 
                    managerCount++; 
                } catch (error) {
                    console.error(`Error loading manager file ${file.name}: ${error.message}`);
                }
            }
        }
    }

    readManagers(managersPath);

    console.log(`Managers: \x1b[33m${managerCount}\x1b[0m`);
}

module.exports = { loadManagers };
