import express from 'express';
import factory from '../factory.js';
import Reservation from '../models/reservation.js';

const router = express.Router();

router.post('/clients', async (req, res) => {
    try {
        const { name, email, number } = req.body;
        const client = await factory.createClient(name, email, number);
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/specialists', async (req, res) => {
    try {
        const { name, email, number } = req.body;
        const specialist = await factory.createSpecialist(name, email, number);
        res.status(201).json(specialist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/services', async (req, res) => {
    try {
        const { name, length, price } = req.body;
        const service = await factory.createService(name, length, price);
        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.post('/reservations', async (req, res) => {
    try {
        const { day, month, timeStart, services, client, specialist } = req.body;
        const reservation = await factory.createReservation(day, month, timeStart, services, client, specialist);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate('services')
            .populate('client')
            .populate('specialist');
        res.json(reservations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/reservations/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
            .populate('services')
            .populate('client')
            .populate('specialist');
        if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
        res.json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/reservations/:id', async (req, res) => {
    try {
        const { day, month, timeStart, services, client, specialist } = req.body;
        let reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ error: 'Reservation not found' });

        reservation.day = day;
        reservation.month = month;
        reservation.timeStart = timeStart;
        reservation.services = services;
        reservation.client = client;
        reservation.specialist = specialist;

        reservation.timeEnd = await factory.calculateTimeEnd(reservation);

        await reservation.save();

        reservation = await reservation.populate('services').populate('client').populate('specialist').execPopulate();

        res.json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.delete('/reservations/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
        res.json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/reservations/day/:day/month/:month', async (req, res) => {
    try {
        const { day, month } = req.params;
        const reservations = factory.getReservationsForDay(parseInt(day), parseInt(month));
        res.json(reservations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.delete('/reservations/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
        res.json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


export default router;