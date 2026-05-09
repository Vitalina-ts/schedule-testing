const request = require("supertest");
const api = request("http://localhost:8080");

let token;
let createdGroupId;

describe("Groups API", () => {

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

    test("GET /groups → should return list of groups", async () => {
        const res = await api
            .get("/groups")
            .set("Authorization", `Bearer_${token}`)
            .ok(res => true);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("GET /groups/:id → should return group or 404", async () => {

        const id = createdGroupId || 999999;

        const res = await api
            .get(`/groups/${id}`)
            .set("Authorization", `Bearer_${token}`)
            .ok(res => true);

        console.log("GET BY ID:", res.status, res.body);

        expect([200, 404]).toContain(res.status);
    });


});