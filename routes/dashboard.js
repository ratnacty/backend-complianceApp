const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/dashboardController');

router.get('/chart', ctrl.getChartData);
router.get('/brand-table', ctrl.getBrandTable);
router.get('/summary', ctrl.getSummary);

module.exports = router;
