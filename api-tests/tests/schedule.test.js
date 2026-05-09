const request = require('supertest');
const api = request('http://localhost:8080');

let token;
let scheduleId;

describe('Schedules API', () => {

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

    // ──────────────────────────────────────────
    // GET /schedules
    // ──────────────────────────────────────────

    test('GET /schedules → should return list of schedules for default semester', async () => {
        const res = await api
            .get('/schedules')
            .set('Authorization', `Bearer_${token}`)
            .ok(res => true);

        console.log('GET /schedules:', res.status, res.body);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /schedules → should fail WITHOUT auth token', async () => {
        const res = await api
            .get('/schedules')
            .ok(res => true);

        console.log('NEGATIVE GET /schedules (NO TOKEN):', res.status, res.body);

        expect(res.status).toBe(403);
        expect(res.body.message).toBe('Access denied');
    });

    test('GET /schedules/public/status → should return publish status', async () => {
        const res = await api
            .get('/schedules/public/status')
            .set('Authorization', `Bearer_${token}`)
            .ok(res => true);

        console.log('GET /schedules/public/status:', res.status, res.body);

        expect(res.status).toBe(200);
    });

    test('GET /schedules/public/status → should fail WITHOUT auth token', async () => {
        const res = await api
            .get('/schedules/public/status')
            .ok(res => true);

        console.log('NEGATIVE GET /schedules/public/status (NO TOKEN):', res.status, res.body);

        expect(res.status).toBe(403);
        expect(res.body.message).toBe('Access denied');
    });


    test('GET /schedules/full/semester → should return full schedule for semester', async () => {
        const res = await api
            .get('/schedules/full/semester')
            .set('Authorization', `Bearer_${token}`)
            .ok(res => true);

        console.log('GET /schedules/full/semester:', res.status, res.body);

        expect([200, 400]).toContain(res.status);
    });
    
});