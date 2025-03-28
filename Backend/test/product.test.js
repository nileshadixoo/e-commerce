import request from "supertest";
import app ,{server} from "..";
import { pool } from "../database/connect.database";
import { createToken } from "../utils/util";
import path from "path"
jest.mock("../database/connect.database");
jest.mock("../utils/util")

afterAll(() => {  
  server.close()
})
// upload product
describe("Add Product API", () => {
  let adminToken;
  let userToken;
  beforeAll(async () => {
    (adminToken = "mocked-admin-token"), (userToken = "mocked-user-token");

    createToken.mockImplementation((email) => {
      return email === "admin@example.com" ? adminToken : userToken;
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should successfully add a product with valid data(Admin User) ", async () => {
    pool.query.mockResolvedValueOnce({
      rows: [],
    });

    const res = await request(app)
    .post("/product/upload")
    .set("Authorization", `Bearer ${adminToken}`)
    .field("name", "Test Product") // Send text fields
    .field("description", "This is a test product")
    .field("price", 100)
    .field("stock", 10)
    .field("category", "Electronics")
    .field("color", "black")
    .attach("image", path.join(__dirname, "test-files/test-product.jpg")); // Attach file
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "Product uploaded successfully");

  });

  
  test.each([
    [{},"Please provide the required field"],
    [{name:"Test Product"},"Please provide the required field"],
    [{name:"Test Product",description:"This is a test product"},"Please provide the required field"],
    [{name:"Test Product",description:"This is a test product",price:100},"Please provide the required field"],
    [{name:"Test Product",description:"This is a test product",price:100,stock:10},"Please provide the required field"],
    [{name:"Test Product",description:"This is a test product",price:100,stock:10,category:"Electronics"},"Please provide the required field"],
    [{name:"Test Product",description:"This is a test product",price:100,stock:10,category:"Electronics",color:"black"},"Please provide the required field"],
  ])("should return error when required field is missing", async (data,expectedMessage) => {
    try {
      const res = await request(app).post('/product/upload')
    .set("Authorization",adminToken)
    .set("Content-Type", "application/json") 
    .send(data)

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", expectedMessage);
    } catch (error) {
      console.log(error);
      
    }

   
  });


  test("should return error for invalid database query", async()=>{
    pool.query.mockRejectedValueOnce(new Error("Error in query"));
    try {
      const res = await request(app)
    .post("/product/upload")
    .set("Authorization", `Bearer ${adminToken}`)
    .field("name", "Test Product") // Send text fields
    .field("description", "This is a test product")
    .field("price", 100)
    .field("stock", 10)
    .field("category", "Electronics")
    .field("color", "black")
    .attach("image", 
      path.join(__dirname, "test-files/test-product.jpg"));
    console.log(res)
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "Failed to list product");
    } catch (error) {
      console.log(error);
      
    }
  })

});

// update product
