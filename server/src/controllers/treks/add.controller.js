import { isValidObjectId } from "mongoose";
import {
    asyncHandler,
    SuccessResponse,
    ErrorResponse,
} from "../../lib/index.js";
import { Trek } from "../../models/index.js";

export const addTrek = asyncHandler(async (req, res) => {
    const name = (req.body?.name ?? "").trim();

    const difficulty = req.body?.difficulty ?? "";
    const place = (req.body?.place ?? "").trim();
    const duration = req.body?.duration ?? "";
    const overview = (req.body?.overview ?? "").trim();
    const max_elevation = req.body?.max_elevation ?? "";
    const best_season = (req.body?.best_season ?? "").trim();
    const contact_number = req.body?.contact_number ?? "";
    const contact_email = req.body?.contact_email ?? "";
    const rating = (req.body?.rating ?? "").trim();
    const reviews = (req.body?.reviews ?? "").trim();
    const images = req.files;

    if (!name) {
        throw new ErrorResponse(400, 6000, "name is required");
    }
    if (!difficulty) {
        throw new ErrorResponse(400, 6001, "difficulty is required");
    }
    if (!place) {
        throw new ErrorResponse(400, 6002, "place is required");
    }

    if (!isValidObjectId(place)) {
        throw new ErrorResponse(400, 6002, "place is not valid");
    }

    if (!duration) {
        throw new ErrorResponse(400, 6003, "duration is required");
    }
    if (!overview) {
        throw new ErrorResponse(400, 6004, "overview is required");
    }
    if (!max_elevation) {
        throw new ErrorResponse(400, 6005, "max_elevation is required");
    }
    if (!best_season) {
        throw new ErrorResponse(400, 6006, "best_season is required");
    }
    if (!contact_number) {
        throw new ErrorResponse(400, 6007, "contact_number is required");
    }
    if (!contact_email) {
        throw new ErrorResponse(400, 6008, "contact_email is required");
    }
    if (!rating) {
        throw new ErrorResponse(400, 6009, "rating is required");
    }
    if (!reviews) {
        throw new ErrorResponse(400, 6010, "reviews is required");
    }
    if (images?.length < 1) {
        throw new ErrorResponse(400, 6011, "atleast oen image is requried");
    }

    const trek = await Trek.create({
        name,
        difficulty,
        place,
        duration,
        overview,
        max_elevation,
        best_season,
        contact_number,
        contact_email,
        rating,
        reviews,
        images: images.map((image) => image.filename),
    });

    return res
        .status(201)
        .json(new SuccessResponse(201, "trek created succesfully", trek));
});
