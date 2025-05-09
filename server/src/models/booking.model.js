import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        start_date: {
            type: String,
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        travel_date: String,
        group_size: String,
        destination: String,
        special_requirements: String,
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

export const Booking = mongoose.model("Booking", bookingSchema);
