const request = require('supertest');
const api = request('http://localhost:8080');

let token;

describe('Departments API', () => {

    beforeAll(async () => {
        const login = await api
            .post('/auth/sign-in')
            .send({
                email: "manager@gmail.com",
                password: "Qwerty!123"
            });

        token = login.body.token;
        expect(token).toBeDefined();
    });

    test('GET /departments → should return all departments', async () => {
        const res = await api
            .get('/departments')
            .set('Authorization', `Bearer_${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /departments/:id → should return one department', async () => {
        const res = await api
            .get('/departments/1')
            .set('Authorization', `Bearer_${token}`);

        expect([200, 404]).toContain(res.status);
    });

    test('DELETE /departments/:id → should return 404 for non-existing', async () => {
        const res = await api
            .delete('/departments/99999')
            .set('Authorization', `Bearer_${token}`);

        expect([404, 400]).toContain(res.status);
    });

});