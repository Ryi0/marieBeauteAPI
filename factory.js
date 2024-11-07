import Client from './models/client.js';
import Service from './models/service.js';
import Specialist from './models/specialist.js';
import Reservation from './models/reservation.js';

class WorkDay {
    constructor(day, month) {
        this.day = day;
        this.month = month;
        this.reservations = [];
    }

    addReservation(reservation) {
        this.reservations.push(reservation);
        this.reservations.sort((a, b) => a.timeStart - b.timeStart);
    }

    getReservations() {
        return this.reservations;
    }
}

class Month {
    constructor(monthNumber) {
        this.monthNumber = monthNumber;
        this.workDays = {};
    }

    addWorkDay(day) {
        if (!this.workDays[day]) {
            this.workDays[day] = new WorkDay(day, this.monthNumber);
        }
        return this.workDays[day];
    }

    getWorkDay(day) {
        return this.workDays[day];
    }
}

class Factory {
    constructor() {
        this.months = {};
    }

    async createClient(name, email, number) {
        return await Client.create({ name, email, number });
    }

    async createSpecialist(name, email, number) {
        return await Specialist.create({ name, email, number });
    }
    async createService(name,length, price ) {
        return await Service.create({ name,  length, price });
    }

    async createReservation(day, month, timeStart, services, client, specialist) {
        if (!this.months[month]) {
            this.months[month] = new Month(month);
        }

        const workDay = this.months[month].addWorkDay(day);

        const reservation = new Reservation({
            day,
            month,
            timeStart,
            services,
            client,
            specialist
        });

        reservation.timeEnd = await this.calculateTimeEnd(reservation);

        const savedReservation = await reservation.save();

        workDay.addReservation(savedReservation);

        return savedReservation;
    }

    async calculateTimeEnd(reservation) {
        let totalServiceLength = 0;
        for (const serviceId of reservation.services) {
            const service = await Service.findById(serviceId);
            totalServiceLength += service.length;
        }
        return reservation.timeStart + totalServiceLength;
    }

    getReservationsForDay(day, month) {
        if (this.months[month] && this.months[month].getWorkDay(day)) {
            return this.months[month].getWorkDay(day).getReservations();
        }
        return [];
    }

}

export default new Factory();