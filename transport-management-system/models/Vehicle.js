const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema(
    {
        vehicleNumber: {
            type: String,
            required: true,
            unique: true,
        },
        type: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['Available', 'On Route', 'Maintenance'],
            default: 'Available',
        },
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Driver',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Vehicle', VehicleSchema);
