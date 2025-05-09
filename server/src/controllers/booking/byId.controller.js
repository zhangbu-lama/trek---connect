import { isValidObjectId } from "mongoose";
import {
    asyncHandler,
    ErrorResponse,
    SuccessResponse,
} from "../../lib/index.js";
import { Booking } from "../../models/index.js";

export const getBookingById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ErrorResponse(400, 6008, "Invalid booking ID");
    }

    const booking = await Booking.findById(id);

    if (!booking) {
        throw new ErrorResponse(404, 6009, "Booking not found");
    }

    return res
        .status(200)
        .json(
            new SuccessResponse(200, "Booking retrieved successfully", booking),
        );
});
