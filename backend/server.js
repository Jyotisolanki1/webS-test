import Path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config({path:'../.env'})
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './route/userRoute.js';


import cors from 'cors';


const port = process.env.PORT || 5000;

connectDB();
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,  
  };

  
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors(corsOptions))
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = Path.resolve();
  app.use(express.static(Path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(Path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));