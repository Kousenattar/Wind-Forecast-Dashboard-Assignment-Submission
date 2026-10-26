import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import windRoutes from './routes/windRoutes';

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/wind", windRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Wind Forecast API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
} )
