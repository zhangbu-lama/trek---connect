import { isValidObjectId } from "mongoose";
import {
    asyncHandler,
    SuccessResponse,
    ErrorResponse,
} from "../../lib/index.js";
import { Place } from "../../models/place.model.js";
export const updatePlace = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const name = req.body?.name;
    const location = req.body?.location;
    const description = req.body?.description;
    const category = req.body?.category;
    const relatedName = req.body?.related_name;
    const image = req.file;
    const timeToTravel = req.body?.time_to_travel;

    if (!name) {
        return res
            .status(400)
            .json(new ErrorResponse(400, 6000, "Name is required"));
    }

    if (!location) {
        return res
            .status(400)
            .json(new ErrorResponse(400, 6001, "Location is required"));
    }
    if (!description) {
        return res
            .status(400)
            .json(new ErrorResponse(400, 6002, "Description is required"));
    }
    if (!category) {
        return res
            .status(400)
            .json(new ErrorResponse(400, 6003, "Category is required"));
    }
    if (!relatedName) {
        return res
            .status(400)
            .json(new ErrorResponse(400, 6004, "Related name is required"));
    }
    if (!timeToTravel) {
        return res
            .status(400)
            .json(new ErrorResponse(400, 6005, "Time to travel is required"));
    }

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(new ErrorResponse(400, 6003, "Invalid place ID"));
    }

    const place = await Place.findById(id);

    if (!place) {
        return res
            .status(404)
            .json(new ErrorResponse(404, 6004, "Place not found"));
    }

    // Update the place
    place.name = name;
    place.location = location;
    place.description = description;
    place.category = category;
    place.related_name = relatedName;
    place.time_to_travel = timeToTravel;
    place.image = image ? image.filename : place.image;
    await place.save();

    return res
        .status(200)
        .json(new SuccessResponse(200, "place updated", place));
});
