import { config } from "dotenv";
config()
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { errorReponseHandler, SuccessResponse } from "./lib/index.js";

export const app = express();

const corsOption = {
    credentials: true,
    origin: "http://localhost:5173"
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

app.get("/", (_, res) => {
    res.status(200).json(new SuccessResponse(200, "tour travels server", null));
});

app.use("/uploads",express.static("uploads"));

/* Routes */
// Auth route
import { authRouter } from "./routes/index.js";
app.use("/api/v1/auth", authRouter);

import { treksRouter } from "./routes/index.js";
// Treks route
app.use("/api/treks", treksRouter);

import { placesRouter } from "./routes/index.js";
// places router
app.use("/api/places", placesRouter);

import { categoriesRouter } from "./routes/index.js";
// categories router
app.use("/api/categories", categoriesRouter);


//Bookings router
import { bookingsRouter } from "./routes/index.js";
app.use("/api/bookings", bookingsRouter);

// error handling middleware
app.use(errorReponseHandler);
