import express, { response } from "express";
import dotenv from "dotenv";
dotenv.config();
import {initDB}  from "./config/db.js"; // Adjust the path as necessary

import transactionsRoute from "./routes/transactionsRoute.js"

import rateLimiter from "./middleware/rateLimiter.js"; // Adjust the path as necessary
// const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware to parse JSON bodies runs before the response
app.use(express.json());

// app.use(rateLimiter); // Apply rate limiting middleware

app.get("/", (req, res) => {
    res.send("<h1>Welcome to the Transactions API</h1>");
});


app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
    // Start the server after the database is initialized
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to initialize the database:", error);
    process.exit(1);
});