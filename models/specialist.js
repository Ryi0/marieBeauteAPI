import mongoose from 'mongoose';

const specialistSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String
});

export default mongoose.model('Specialist', specialistSchema);