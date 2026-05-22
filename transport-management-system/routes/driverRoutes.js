const express = require('express');
const router = express.Router();
const {
    getDrivers,
    addDriver,
    updateDriver,
    deleteDriver,
} = require('../controllers/driverController');
const { protect } = require('../middleware/authMiddleware');
const { body } = require('express-validator');
const { validate } = require('../middleware/validationMiddleware');

router.route('/')
    .get(protect, getDrivers)
    .post(
        protect,
        [
            body('name', 'Name is required').notEmpty(),
            body('phone', 'Phone is required').notEmpty(),
            body('licenseNumber', 'License number is required').notEmpty(),
        ],
        validate,
        addDriver
    );

router.route('/:id')
    .put(protect, updateDriver)
    .delete(protect, deleteDriver);

module.exports = router;
