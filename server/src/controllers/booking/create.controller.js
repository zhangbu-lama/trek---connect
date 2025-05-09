import {
    asyncHandler,
    ErrorResponse,
    SuccessResponse,
} from "../../lib/index.js";
import { Booking } from "../../models/index.js";

export const createBooking = asyncHandler(async (req, res) => {
    const firstName = (req.body?.first_name ?? "").trim();
    const lastName = (req.body?.last_name ?? "").trim();
    const email = (req.body?.email_address ?? "").trim();
    const phone = (req.body?.phone ?? "").trim();
    const startDate = (req.body?.start_date ?? "").trim();
    const travelDate = (req.body?.travel_date ?? "").trim();
    const groupSize = (req.body?.group_size ?? "").trim();
    const destination = (req.body?.destination ?? "").trim();
    const specialRequirements = (req.body?.special_requirements ?? "").trim();
    const creator = req.user?._id;


    if (!firstName) {
        throw new ErrorResponse(400, 6000, "First name is required");
    }
    if (!lastName) {
        throw new ErrorResponse(400, 6001, "Last name is required");
    }
    if (!email) {
        throw new ErrorResponse(400, 6002, "Email is required");
    }
    if (!phone) {
        throw new ErrorResponse(400, 6003, "Phone number is required");
    }
    if (!startDate) {
        throw new ErrorResponse(400, 6004, "Start date is required");
    }
    if (!travelDate) {
        throw new ErrorResponse(400, 6005, "Travel date is required");
    }
    if (!groupSize) {
        throw new ErrorResponse(400, 6006, "Group size is required");
    }
    if (!destination) {
        throw new ErrorResponse(400, 6007, "Destination is required");
    }

    const booking = await Booking.create({
        creator,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        start_date: startDate,
        travel_date: travelDate,
        group_size: groupSize,
        destination: destination,
        special_requirements: specialRequirements,
    });

    return res
        .status(201)
        .json(
            new SuccessResponse(200, "Booking created successfully", booking),
        );
});
