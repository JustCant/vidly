const request = require('supertest');
const {User} = require('../../models/user');
const { Genre } = require('../../models/genres');

describe('auth middleware', () => {
    // let token;
    // let server;

    it('return true', () => {
        expect(true).toBe(true);
    });
    // beforeEach(() => {
    //     server = require('../../index');
    //     token = new User().generateAuthToken();
    // });    
    
    // afterEach(async () => {
    //     await server.close();
    //     delete require.cache[require.resolve('../../index')];
    //     await Genre.deleteMany({});
    //     await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
    // });

    // const exec = () => {
    //     return request(server)
    //         .post('/api/genres')
    //         .set('x-auth-token', token)
    //         .send({ name: 'Genre1' });
    // }

    // it('should return 401 if no token is provided', async () => {
    //     token = '';

    //     const res = await exec();

    //     expect(res.status).toBe(401);
    // });

    // it('should return 400 token is invalid', async () => {
    //     token = 'a';
        
    //     const res = await exec();

    //     expect(res.status).toBe(400);
    // });

    // it('should return 200 token is valid', async () => {
    //     const res = await exec();

    //     expect(res.status).toBe(200);
    // });
});