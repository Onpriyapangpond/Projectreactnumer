const request = require("supertest");
const app = require("./jj.js");
const jwt = require("jsonwebtoken");



describe("GET /gettoken/:name", () => {
  test("should return a JWT token", async () => {
    const res = await request(app).get("/gettoken").expect(200); 
    console.log(res.text);
    const decoded = jwt.verify(res.text,'shhhhh');
    expect(decoded.foo).toBe("bar");
  });
});



test("Querry", async () => {
    const response = await request(app).get("/onepoint");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe(
      '[{"_id":"642e89211856015be679397b","Fxx":"x^4-5","X1":"5"}]'
    );
  });

 

