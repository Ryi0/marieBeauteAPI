import Client from './models/client.js';
import Service from './models/service.js';
import Specialist from './models/specialist.js';
import Reservation from './models/reservation.js';

class Factory {
    async createClient(name, email, number) {
        return await Client.create({ name, email, number });
    }

    async createSpecialist(name, email, number) {
        return await Specialist.create({ name, email, number });
    }

    async createService(name, length) {
        return await Service.create({ name, length });
    }

    async createReservation(day, month, timeStart, services, client, specialist) {
        const reservation = new Reservation({
            day,
            month,
            timeStart,
            services,
            client,
            specialist
        });

        reservation.timeEnd = await this.calculateTimeEnd(reservation);
        return await reservation.save();
    }

    async calculateTimeEnd(reservation) {
        let totalServiceLength = 0;
        for (const serviceId of reservation.services) {
            const service = await Service.findById(serviceId);
            totalServiceLength += service.length;
        }
        return reservation.timeStart + totalServiceLength;
    }
}

export default new Factory();