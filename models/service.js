import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: String,
    length: Number,
    price:Number
});

export default mongoose.model('Service', serviceSchema);