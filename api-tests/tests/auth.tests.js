require("dotenv").config();
const axios = require("axios");

describe("Auth API", () => {
  test("POST /auth/sign-in — returns token", async () => {
    const res = await axios.post(`${process.env.BASE_URL}/auth/sign-in`, {
      email: "manager@gmail.com",
      password: "Qwerty!123"
    });

    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty("token");
    expect(typeof res.data.token).toBe("string");
  });
});
