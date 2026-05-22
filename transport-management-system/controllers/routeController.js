const Route = require('../models/Route');

// @desc    Get all routes
// @route   GET /api/routes
// @access  Private
exports.getRoutes = async (req, res) => {
    try {
        const routes = await Route.find().populate({
            path: 'assignedVehicle',
            populate: { path: 'driver', select: 'name phone' }
        });
        res.json(routes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add new route
// @route   POST /api/routes
// @access  Private
exports.addRoute = async (req, res) => {
    try {
        const route = await Route.create(req.body);
        res.status(201).json(route);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a route
// @route   PUT /api/routes/:id
// @access  Private
exports.updateRoute = async (req, res) => {
    try {
        const route = await Route.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!route) return res.status(404).json({ message: 'Route not found' });
        res.json(route);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a route
// @route   DELETE /api/routes/:id
// @access  Private
exports.deleteRoute = async (req, res) => {
    try {
        const route = await Route.findByIdAndDelete(req.params.id);
        if (!route) return res.status(404).json({ message: 'Route not found' });
        res.json({ message: 'Route removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
