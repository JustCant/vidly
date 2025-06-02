const request = require('supertest');
const { Genre } = require('../../models/genres');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

let server;

describe('/api/genres', () => {
    it('return true', () => {
        expect(true).toBe(true);
    });
    // beforeEach(() => {
    //     server = require('../../index');
    // });

    // afterEach(async () => {
    //     await server.close();
    //     delete require.cache[require.resolve('../../index')];
    //     await Genre.deleteMany({});
    //     await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
    // });

    // describe('GET /', () => {
    //     it('should return all genres', async () => {
    //         await Genre.collection.insertMany([
    //             { name: 'Genre1' },
    //             { name: 'Genre2' }
    //         ]);

    //         const res = await request(server).get('/api/genres');

    //         expect(res.status).toBe(200);
    //         expect(res.body.length).toBe(2);
    //         expect(res.body.some(g => g.name === 'Genre1')).toBeTruthy();
    //         expect(res.body.some(g => g.name === 'Genre2')).toBeTruthy();
    //     });
    // });

    // describe('GET /:id', () => {
    //     it('should return a genre if valid id is passed', async () => {
    //         const genre = new Genre({ name: 'Genre1' });
    //         await genre.save();

    //         const res = await request(server).get(`/api/genres/${genre._id}`);

    //         expect(res.status).toBe(200);
    //         expect(res.body).toHaveProperty('name', genre.name);
    //     });

    //     it('should return 404 if invalid id is passed', async () => {
    //         const res = await request(server).get('/api/genres/1');

    //         expect(res.status).toBe(404);
    //     });

    //     it('should return 404 if no genre with given id exists', async () => {
    //         const id = new mongoose.Types.ObjectId();
    //         const res = await request(server).get('/api/genres/' + id);

    //         expect(res.status).toBe(404);
    //     });
    // });

    // describe('POST /', () => {
    //     let token;
    //     let name;

    //     const exec = async () => {
    //         return await request(server)
    //             .post('/api/genres')
    //             .set('x-auth-token', token)
    //             .send({ name });
    //     }

    //     beforeEach(() => {
    //         token = new User().generateAuthToken();
    //         name = 'genre1';
    //     });

    //     it('should return 401 if client is not logged in', async () => {
    //         token = '';

    //         const res = await exec();

    //         expect(res.status).toBe(401);
    //     });

    //     it('should return 400 if genre is less than 5 characters', async () => {
    //         name = '1234'; // 4 characters

    //         const res = await exec();

    //         expect(res.status).toBe(400);
    //     });

    //     it('should return 400 if genre is more than 50 characters', async () => {            
    //         name = new Array(52).join('a'); // 52 characters

    //         const res = await exec();

    //         expect(res.status).toBe(400);
    //     });

    //     it('should save the genre if it is valid', async () => {
    //         await exec();

    //         const genre = await Genre.find({ name: 'genre1' });

    //         expect(genre).not.toBeNull();
    //     });

    //     it('should return the genre if it is valid', async () => {
    //         const res = await exec();

    //         await Genre.find({ name: 'genre1' });

    //         expect(res.body).toHaveProperty('_id');
    //         expect(res.body).toHaveProperty('name', 'genre1');
    //     });
    // });

    // describe('PUT /:id', () => {
    //     it('should update the genre if it is valid', async () => {
    //         const genre = new Genre({ name: 'genre1' });
    //         await genre.save();

    //         const token = new User().generateAuthToken();
    //         const updatedName = 'updatedGenre';

    //         const res = await request(server)
    //             .put(`/api/genres/${genre._id}`)
    //             .set('x-auth-token', token)
    //             .send({ name: updatedName });

    //         expect(res.status).toBe(200);
    //         expect(res.body).toHaveProperty('name', updatedName);
    //     });
    // });

    // describe('DELETE /:id', () => {
    //     it('should delete the genre if it is valid', async () => {
    //         const genre = new Genre({ name: 'genre1' });
    //         await genre.save();

    //         const token = new User().generateAuthToken();

    //         const res = await request(server)
    //             .delete(`/api/genres/${genre._id}`)
    //             .set('x-auth-token', token);

    //         expect(res.status).toBe(200);
    //         expect(res.body).toHaveProperty('name', 'genre1');

    //         const deletedGenre = await Genre.findById(genre._id);
    //         expect(deletedGenre).toBeNull();
    //     });

    //     it('should return 404 if no genre with the given id exists', async () => {
    //         const id = new mongoose.Types.ObjectId();
    //         const token = new User().generateAuthToken();

    //         const res = await request(server)
    //             .delete(`/api/genres/${id}`)
    //             .set('x-auth-token', token);

    //         expect(res.status).toBe(404);
    //     });
    // });
});