const express = require('express');
const router = express.Router();
const {
    getRoutes,
    addRoute,
    updateRoute,
    deleteRoute,
} = require('../controllers/routeController');
const { protect } = require('../middleware/authMiddleware');
const { body } = require('express-validator');
const { validate } = require('../middleware/validationMiddleware');

router.route('/')
    .get(protect, getRoutes)
    .post(
        protect,
        [
            body('routeName', 'Route name is required').notEmpty(),
            body('source', 'Source is required').notEmpty(),
            body('destination', 'Destination is required').notEmpty(),
        ],
        validate,
        addRoute
    );

router.route('/:id')
    .put(protect, updateRoute)
    .delete(protect, deleteRoute);

module.exports = router;
