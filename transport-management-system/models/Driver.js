const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        licenseNumber: {
            type: String,
            required: true,
            unique: true,
        },
        address: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Driver', DriverSchema);
