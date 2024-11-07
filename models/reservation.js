import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    day: Number,
    month: Number,
    timeStart: Number,
    timeEnd: Number,
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    specialist: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialist' }
});

export default mongoose.model('Reservation', reservationSchema);