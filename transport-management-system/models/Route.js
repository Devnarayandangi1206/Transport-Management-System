const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema(
    {
        routeName: {
            type: String,
            required: true,
        },
        source: {
            type: String,
            required: true,
        },
        destination: {
            type: String,
            required: true,
        },
        assignedVehicle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vehicle',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Route', RouteSchema);
