const request = require("supertest");
const api = request("http://localhost:8080");

let token;
let createdLessonId;

describe("Lessons API", () => {

    beforeAll(async () => {
        const login = await api
            .post("/auth/sign-in")
            .send({
                email: "manager@gmail.com",
                password: "Qwerty!123"
            });

        token = login.body.token;
        expect(token).toBeDefined();
    });

    test("GET /lessons → should return list of lessons", async () => {
        const res = await api
            .get("/lessons")
            .set("Authorization", `Bearer_${token}`)
            .ok(res => true);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("GET /lessons/:id → should return lesson or 404", async () => {

        const id = createdLessonId || 999999;

        const res = await api
            .get(`/lessons/${id}`)
            .set("Authorization", `Bearer_${token}`)
            .ok(res => true);

        console.log("GET BY ID:", res.status);

        expect([200, 404]).toContain(res.status);
    });


});