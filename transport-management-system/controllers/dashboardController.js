const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
exports.getDashboardStats = async (req, res) => {
    try {
        const totalVehicles = await Vehicle.countDocuments();
        const totalDrivers = await Driver.countDocuments();

        // Count based on vehicle status
        const availableVehicles = await Vehicle.countDocuments({ status: 'Available' });
        const assignedVehicles = await Vehicle.countDocuments({ status: 'On Route' });

        res.json({
            totalVehicles,
            totalDrivers,
            availableVehicles,
            assignedVehicles
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
