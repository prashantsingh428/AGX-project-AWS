const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const app = require("../src/app");

// Mock mongoose connection property
jest.mock("mongoose", () => {
  const actualMongoose = jest.requireActual("mongoose");
  return {
    ...actualMongoose,
    connection: {
      readyState: 1 // Default to connected
    }
  };
});

describe("GET /api/health", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 OK when database is connected", async () => {
    mongoose.connection.readyState = 1; // 1 = connected

    const response = await request(app)
      .get("/api/health")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("status", "UP");
    expect(response.body).toHaveProperty("timestamp");
    expect(response.body).toHaveProperty("uptime");
    expect(response.body.services).toEqual({
      database: "UP",
      server: "UP"
    });
    expect(response.body.system).toHaveProperty("memoryUsage");
    expect(response.body.system).toHaveProperty("cpuUsage");
  });

  it("should return 503 Service Unavailable when database is disconnected", async () => {
    mongoose.connection.readyState = 0; // 0 = disconnected

    const response = await request(app)
      .get("/api/health")
      .expect("Content-Type", /json/)
      .expect(503);

    expect(response.body).toHaveProperty("status", "DEGRADED");
    expect(response.body.services).toEqual({
      database: "DOWN",
      server: "UP"
    });
  });
});
