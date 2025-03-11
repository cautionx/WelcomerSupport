const fs = require('fs');
const path = require('path');

async function loadStructures() {
    const structuresPath = path.join(__dirname, '../structure');
    let structureCount = 0;

    function readStructures(directory) {
        const files = fs.readdirSync(directory, { withFileTypes: true });

        for (const file of files) {
            const fullPath = path.join(directory, file.name);

            if (file.isDirectory()) {
                readStructures(fullPath);
            } else if (file.isFile() && file.name.endsWith('.js')) {
                try {
                    require(fullPath);
                    structureCount++; 
                } catch (error) {
                    console.error(`Error loading structure file ${file.name}: ${error.message}`);
                }
            }
        }
    }

    readStructures(structuresPath);

    console.log(`Structures: \x1b[33m${structureCount}\x1b[0m`);
}

module.exports = { loadStructures };
