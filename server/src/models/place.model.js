import mongoose from "mongoose";

const placeModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categorie",
        },
        related_name: String,
        image: {
            type: String,
            required: true,
        },
        time_to_travel: {
            type: String,
            required: true,
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

export const Place = mongoose.model("Place", placeModel);
