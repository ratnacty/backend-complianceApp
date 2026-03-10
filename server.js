require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/store-accounts', require('./routes/storeAccount'));
app.use('/api/store-areas', require('./routes/storeArea'));
app.use('/api/stores', require('./routes/store'));
app.use('/api/brands', require('./routes/brand'));
app.use('/api/products', require('./routes/product'));
app.use('/api/reports', require('./routes/reportProduct'));
app.use('/api/dashboard', require('./routes/dashboard'));

app.get('/', (req, res) => {
  res.json({ message: 'Compliance API is running' });
});

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: false })
  .then(() => {
    console.log('Database connected and synced.');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
