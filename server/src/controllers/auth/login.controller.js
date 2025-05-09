import {
    asyncHandler,
    SuccessResponse,
    generateRefreshToken,
    generateAccessToken,
    ErrorResponse,
} from "../../lib/index.js";
import bcrypt from "bcryptjs";
import { User } from "../../models/index.js";

export const userLogin = asyncHandler(async (req, res) => {
    const emailAddress = (req.body?.email_address ?? "").trim();
    const password = req.body?.password;

    if (!emailAddress) {
        throw new ErrorResponse(400, 7000, "email address is required");
    }

    if (!password) {
        throw new ErrorResponse(400, 7000, "password is required");
    }

    const user = await User.findOne({
        email_address: emailAddress,
    });

    if (!user) {
        throw new ErrorResponse(401, 7000, "invalid credentials");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new ErrorResponse(401, 7000, "invalid credentials");
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    const cookieOptions = {
        httpOnly: true,
        secure: true,
    };

    return res
        .cookie("access_token", accessToken, cookieOptions)
        .cookie("refresh_token", refreshToken, cookieOptions)
        .status(200)
        .json(
            new SuccessResponse(200, "login successful", {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email_address: user.email_address,
                created_at: user.created_at,
                updated_at: user.updated_at,
                tokens: {
                    access_token: accessToken,
                    refresh_token: refreshToken,
                },
            }),
        );
});
