const mongoose = require('mongoose');
require('dotenv').config();

// Retrieve the MongoDB URI from environment variables
const mongoURL = process.env.MONGODB_URL_LOCAL;

if (!mongoURL) {
    throw new Error('MongoDB URI is not defined in environment variables.');
}

// Connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('Database connection error:', err.message);
        // Exit process with failure
        process.exit(1);
    }
};

// Close the database connection
const closeDB = async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    } catch (err) {
        console.error('Error closing the database connection:', err.message);
        // Optionally, handle the error further (e.g., retry connection closing)
    }
};

module.exports = { connectDB, closeDB };
