const request = require("supertest");
const api = request("http://localhost:8080");

let token;
let createdRoomId;

describe("Rooms API", () => {

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

    test("GET /rooms → should return list of rooms", async () => {
        const res = await api
            .get("/rooms")
            .set("Authorization", `Bearer_${token}`)
            .ok(res => true);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("GET /rooms/:id → should return room or 404", async () => {

        const id = createdRoomId || 1;

        const res = await api
            .get(`/rooms/${id}`)
            .set("Authorization", `Bearer_${token}`)
            .ok(res => true);

        console.log("GET BY ID:", res.status);

        expect([200, 404]).toContain(res.status);
    });

});