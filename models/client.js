import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String
});

export default mongoose.model('Client', clientSchema);