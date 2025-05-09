import {
    asyncHandler,
    ErrorResponse,
    SuccessResponse,
} from "../../lib/index.js";
import { User } from "../../models/index.js";
import bcrypt from "bcryptjs";

export const signup = asyncHandler(async (req, res) => {
    const firstName = (req.body?.first_name ?? "").trim();
    const lastName = (req.body?.last_name ?? "").trim();
    const emailAddress = (req.body?.email_address ?? "").trim();
    const password = req.body?.password;

    if (!firstName) {
        throw new ErrorResponse(400, 7000, "first name is required!");
    }

    if (!lastName) {
        throw new ErrorResponse(400, 7000, "last name is required!");
    }

    if (!emailAddress) {
        throw new ErrorResponse(400, 7000, "email address is required");
    }

    if (!password) {
        throw new ErrorResponse(400, 7000, "password is required");
    }

    const alreadyExistsUser = await User.findOne({
        email_address: emailAddress,
    });

    if (alreadyExistsUser) {
        throw new ErrorResponse(
            409,
            7005,
            "user with this email address already exists",
        );
    }

    const hashedPw = await bcrypt.hash(password, 10);

    const user = await User.create({
        first_name: firstName,
        last_name: lastName,
        email_address: emailAddress,
        password: hashedPw,
    });

    return res.status(201).json(
        new SuccessResponse(201, "user created", {
            first_name: user.first_name,
            last_name: user.last_name,
            email_address: user.email_address,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }),
    );
});
