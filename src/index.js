import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

// constants
import { CLIENT_URL, PORT } from './constants/index.js';

const app = express();

// initialize middlewares
app.use(express.json());

// Use Helmet middleware for enhanced security headers
app.use(helmet());

// Allow multiple origins from environment variable
const CLIENT_URLS = CLIENT_URL ? CLIENT_URL.split(',') : [];
app.use(
  cors({
    origin: CLIENT_URLS,
    credentials: true,
  }),
);

// initialize routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// app start
const appStart = () => {
  try {
    const PORT_NUMBER = PORT || 3000;
    app.listen(PORT_NUMBER, () => console.log(`Server running on port ${PORT_NUMBER}`));
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

export default appStart;
