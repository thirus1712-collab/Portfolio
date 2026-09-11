const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const { initializeMySQL } = require('./config/mysql');
const { initializeMongoDB } = require('./config/mongodb');
const contactRoutes = require('./routes/contactRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend development and production
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize databases asynchronously
(async () => {
  await initializeMySQL();
  await initializeMongoDB();
})();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    owner: 'S.Thirukumaran',
    service: 'Portfolio Full Stack API',
  });
});

// Mount Routes with /api prefix
app.use('/api/contact', contactRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Also mount routes without /api for direct access compatibility
app.use('/contact', contactRoutes);
app.use('/portfolio', portfolioRoutes);

// Serve static frontend assets if built in production
const clientDistPath = path.resolve(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// For SPA routing, send index.html for any unhandled GET request
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/contact') || req.path.startsWith('/portfolio')) {
    return next();
  }
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send('Portfolio API Server is active. Access client via Vite dev server or build client.');
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message,
  });
});

// Listen if run directly (not imported by Vercel serverless function)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  S.Thirukumaran Portfolio API running on port: ${PORT}`);
    console.log(`  API Health:     http://localhost:${PORT}/api/health`);
    console.log(`  Portfolio Data: http://localhost:${PORT}/api/portfolio`);
    console.log(`  Contact API:    http://localhost:${PORT}/api/contact`);
    console.log(`====================================================`);
  });
}

module.exports = app;
// .\portfolio_contacts.xlsx