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
        const { name, length } = req.body;
        const service = await factory.createService(name, length);
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

export default router;