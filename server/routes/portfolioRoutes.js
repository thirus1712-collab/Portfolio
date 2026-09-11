const express = require('express');
const router = express.Router();
const {
  getPortfolioData,
  seedPortfolioToMongo,
} = require('../controllers/portfolioController');

// GET /api/portfolio
router.get('/', getPortfolioData);

// POST /api/portfolio/seed
router.post('/seed', seedPortfolioToMongo);

module.exports = router;
