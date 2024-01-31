const express = require('express');
const app = express();
const { PORT, CLIENT_URL } = require('./constants');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');

// initialize passport middleware
require('./middlewares/passportMiddleware');

// initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// intialize routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// app start
const appStart = () => {
  try {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

appStart();
