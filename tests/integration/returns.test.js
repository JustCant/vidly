const {Rental} = require('../../models/rentals');
const {User} = require('../../models/user');
const {Movie} = require('../../models/movies');
const mongoose = require('mongoose');
const request = require('supertest');
const moment = require('moment');

describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;
    let movie;

    const exec = () => {
        return request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId, movieId });
    };

    beforeEach(async () => {
        server = require('../../index');
        customerId = new mongoose.Types.ObjectId();
        movieId = new mongoose.Types.ObjectId();
        token = new User().generateAuthToken();
        movie = new Movie({
            _id: movieId,
            title: '12345',
            genre: { name: '12345' },
            numberInStock: 0,
            dailyRentalRate: 2
        });

        rental = new Rental({
            customer: { 
                _id: customerId,
                name: '12345', 
                phone: '12345' 
            },
            movie
        });

        await rental.save();
        await movie.save();
    });

    afterEach(async () => {
        await server.close();
        await Rental.deleteMany({});
        await Movie.deleteMany({});
    });

    it('should return 401 if client is not logged in', async () => {
        token = '';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('shold return 400 if customerId is not provided', async () => {
        customerId = '';

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('shold return 400 if movieId is not provided', async () => {
        movieId = '';

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 404 if no rental found', async () => {
        await Rental.deleteMany({});

        const res = await exec();

        expect(res.status).toBe(404);
    });

    it('should return 400 if rental already processed', async () => {
        rental.dateReturned = Date.now();

        await rental.save();
        
        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 200 if valid request', async () => {
        const res = await exec();

        expect(res.status).toBe(200);
    });

    it('should set the returnDate if input is valid', async () => {
        await exec();

        const rentalInDb = await Rental.findOne(rental._id);
        const diff = new Date() - rentalInDb.dateReturned;
        
        expect(diff).toBeLessThan(10 * 1000);
    });

    it('should set the rentalFee if input is valid', async () => {
        rental.dateOut = moment().add(-7, 'days').toDate();
        await rental.save();

        await exec();

        const rentalInDb = await Rental.findOne(rental._id);

        expect(rentalInDb.rentalFee).toBe(14);
    });

    it('should increase the movie stock', async () => {
        await exec();

        const movie = await Movie.findOne(movieId);

        expect(movie.numberInStock).toBe(1);
    });

    it('should return the rental', async () => {
        const res = await exec();

        const rentalInDb = await Rental.findById(rental._id);

        expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining([
                'dateOut', 
                'dateReturned', 
                'rentalFee', 
                'customer', 
                'movie'
            ])
        );
    });
});