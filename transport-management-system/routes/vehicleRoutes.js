const express = require('express');
const router = express.Router();
const {
    getVehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle,
} = require('../controllers/vehicleController');
const { protect } = require('../middleware/authMiddleware');
const { body } = require('express-validator');
const { validate } = require('../middleware/validationMiddleware');

router.route('/')
    .get(protect, getVehicles)
    .post(
        protect,
        [
            body('vehicleNumber', 'Vehicle number is required').notEmpty(),
            body('type', 'Vehicle type is required').notEmpty(),
            body('capacity', 'Capacity must be a number').isNumeric(),
        ],
        validate,
        addVehicle
    );

router.route('/:id')
    .put(protect, updateVehicle)
    .delete(protect, deleteVehicle);

module.exports = router;
