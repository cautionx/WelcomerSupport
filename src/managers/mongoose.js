const mongoose = require('mongoose');
const config = require('../../config');

async function loadDatabase() {
    try {
        await mongoose.connect(config.db.string, {
        });

        console.log('Database: ✅');
    } catch (error) {
        console.error('MongoDB: ', error);
        process.exit(1); 
    }
}

module.exports = { loadDatabase };
