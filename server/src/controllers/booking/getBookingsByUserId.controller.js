import { isValidObjectId } from "mongoose";
import { asyncHandler, SuccessResponse } from "../../lib/index.js";
import { Booking } from "../../models/index.js";

export const getBookingByUserId = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    if (!isValidObjectId(userId)) {
        return res
            .status(400)
            .json(new SuccessResponse(400, "Invalid user ID"));
    }

    const bookings = await Booking.find({ creator: userId })
        .populate("creator", "-password")
        .sort({ created_at: -1 });

    return res
        .status(200)
        .json(
            new SuccessResponse(
                200,
                "All Bookings retrieved successfully",
                bookings,
            ),
        );
});
