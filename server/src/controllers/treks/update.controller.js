import { isValidObjectId } from "mongoose";
import {
    asyncHandler,
    SuccessResponse,
    ErrorResponse,
} from "../../lib/index.js";
import { Trek } from "../../models/trek.model.js";
export const updateTrek = asyncHandler(async (req, res) => {
    const trekId = req.params?.id;

    console.log(trekId)

    if (!isValidObjectId(trekId)) {
        throw new ErrorResponse(400, 6000, "trekId is not valid");
    }

    const name = (req.body?.name ?? "").trim();
    const difficulty = req.body?.difficulty ?? "";
    const place = req.body?.place ?? "";
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
        throw new ErrorResponse(400, 6001, "name is required");
    }

    if (!difficulty) {
        throw new ErrorResponse(400, 6002, "difficulty is required");
    }
    if (!place) {
        throw new ErrorResponse(400, 6003, "place is required");
    }
    if (!isValidObjectId(place)) {
        throw new ErrorResponse(400, 6004, "place is not valid");
    }
    if (!duration) {
        throw new ErrorResponse(400, 6005, "duration is required");
    }
    if (!overview) {
        throw new ErrorResponse(400, 6006, "overview is required");
    }
    if (!max_elevation) {
        throw new ErrorResponse(400, 6007, "max_elevation is required");
    }
    if (!best_season) {
        throw new ErrorResponse(400, 6008, "best_season is required");
    }
    if (!contact_number) {
        throw new ErrorResponse(400, 6009, "contact_number is required");
    }
    if (!contact_email) {
        throw new ErrorResponse(400, 6010, "contact_email is required");
    }
    if (!rating) {
        throw new ErrorResponse(400, 6011, "rating is required");
    }
    if (!reviews) {
        throw new ErrorResponse(400, 6012, "reviews is required");
    }

    const trek = await Trek.findById(trekId);

    if (!trek) {
        throw new ErrorResponse(404, 6004, "trek not found");
    }

    trek.name = name;
    trek.difficulty = difficulty;
    trek.place = place;
    trek.duration = duration;
    trek.overview = overview;

    trek.max_elevation = max_elevation;
    trek.best_season = best_season;
    trek.contact_number = contact_number;
    trek.contact_email = contact_email;
    trek.rating = rating;
    trek.reviews = reviews;
    trek.images = images ? images.map((image) => image.filename) : trek.images;

    await trek.save();

    return res
        .status(200)
        .json(new SuccessResponse(200, "trek updated succesfully", trek));
});
