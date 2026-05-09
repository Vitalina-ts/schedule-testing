const pool = require("./db");

test("DB connection works", async () => {
    const res = await pool.query("SELECT 1+1 AS result");
    expect(res.rows[0].result).toBe(2);
    
    await pool.end();
});