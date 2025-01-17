import request from "supertest";
import mongoose from "mongoose";
import Text from '../src/services/texts/model';
import app from "../src/app";


// Mock Database Setup
beforeAll(async () => {
	await mongoose.connect("mongodb://localhost:27017/testdb");
});

// Cleanup after each test
afterEach(async () => {
	await Text.deleteMany({});
});

// Close the DB connection after all tests
afterAll(async () => {
	await mongoose.disconnect();
});

describe("Text Routes", () => {
	describe("GET /text", () => {
		test("Should return all texts (empty initially)", async () => {
			const res = await request(app).get("/api/v1/text");
			expect(res.statusCode).toBe(200);
			expect(res.body).toEqual([]);
		});
	});

	describe("POST /text", () => {
		test("Should add a new text", async () => {
			const res = await request(app).post("/api/v1/text").send({ text: "Sample text" });
			expect(res.statusCode).toBe(201);
			expect(res.body).toHaveProperty("id");
			expect(res.body.text).toBe("Sample text");
		});

		test("Should return 422 for validation error (missing text)", async () => {
			const res = await request(app).post("/api/v1/text").send({});
			expect(res.statusCode).toBe(422);
			expect(res.body).toHaveProperty("message", "Validation Error");
		});
	});

	describe("GET /text/:id", () => {
		test("Should return a specific text by ID", async () => {
			const newText = await Text.create({ text: "Test text" });
			const res = await request(app).get(`/api/v1/text/${newText.id}`);
			expect(res.statusCode).toBe(200);
			expect(res.body.text).toBe("Test text");
		});

		test("Should return 404 for non-existent text ID", async () => {
			const fakeId = new mongoose.Types.ObjectId();
			const res = await request(app).get(`/api/v1/text/${fakeId}`);
			expect(res.statusCode).toBe(404);
			expect(res.body.message).toBe("Text not found");
		});
	});

	describe("PATCH /text/:id", () => {
		test("Should update an existing text", async () => {
			const newText = await Text.create({ text: "Old text" });
			const res = await request(app).patch(`/api/v1/text/${newText.id}`).send({ text: "Updated text" });
			expect(res.statusCode).toBe(200);
			expect(res.body.text).toBe("Updated text");
		});

		test("Should return 404 for non-existent text ID", async () => {
			const fakeId = new mongoose.Types.ObjectId();
			const res = await request(app).patch(`/api/v1/text/${fakeId}`).send({ text: "New text" });
			expect(res.statusCode).toBe(404);
			expect(res.body.message).toBe("Text not found");
		});
	});

	describe("DELETE /text/:id", () => {
		test("Should delete a text by ID", async () => {
			const newText = await Text.create({ text: "Text to delete" });
			const res = await request(app).delete(`/api/v1/text/${newText.id}`);
			expect(res.statusCode).toBe(200);
			expect(res.body.message).toBe("Text deleted successfully");
		});

		test("Should return 404 for non-existent text ID", async () => {
			const fakeId = new mongoose.Types.ObjectId();
			const res = await request(app).delete(`/api/v1/text/${fakeId}`);
			expect(res.statusCode).toBe(404);
			expect(res.body.message).toBe("Text not found");
		});
	});
});
