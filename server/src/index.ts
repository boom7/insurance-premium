import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';  
import helmet from 'helmet'; 
import productRoutes from './routes/productRoutes';
import premiumRoutes from './routes/premiumRoutes';
import connectDB from './config/db';

dotenv.config();

const app = express();
const PORT = 4000;

// Connect to MongoDB
connectDB();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,  // Limit each IP to 100 requests per 15 minutes
  message: 'Too many requests from this IP, please try again later.',
});

// Apply rate limiting to all routes
app.use(limiter);

app.use(helmet());  // Add helmet to secure HTTP headers

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  })
);

app.use(express.json());

app.use('/', productRoutes);
app.use('/', premiumRoutes);

app.listen(PORT, () => {
  console.log(`BFF server running at http://localhost:${PORT}`);
});
