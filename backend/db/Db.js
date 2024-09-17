const mongoose = require('mongoose');
const { seedDefaultCategories } = require('../scripts/seedCategories');

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        // await mongoose.connect(process.env.MONGO_URL);
        await mongoose.connect(process.env.OIKO_DB_URL);
        // seedDefaultCategories();
        console.log('DB connected');
    } catch (error) {
        console.log('DB Connection error: ', error);
    }
};

module.exports = {db}