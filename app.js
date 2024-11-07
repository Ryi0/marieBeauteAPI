import express from 'express';
import mongoose from 'mongoose';
import apiRoutes from './routes/api.js';

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/MarieBeaute', {
});

app.use(express.json());
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});