import express from "express";
import {
    createBooking,
    getBookingById,
    getAllBookings,
    getBookingByUserId,
} from "../controllers/index.js";
import { authenticate } from "../middlewares/index.js";

export const bookingsRouter = express.Router();

bookingsRouter.post("/create", authenticate, createBooking);
bookingsRouter.get("/all", getAllBookings);
bookingsRouter.get("/:id", getBookingById);
bookingsRouter.get("/user/:userId", getBookingByUserId);
