import jwt from "jsonwebtoken";
import { asyncHandler, ErrorResponse } from "../lib/index.js";
import { User } from "../models/index.js";

export const authenticate = asyncHandler(async (req, _, next) => {
    const token =
        req.cookies.access_token ||
        req.headers["Authorization"]?.replace("Bearer ", "");

    if (!token) {
        throw new ErrorResponse(401, 6001, "token is required");
    }

    const secret = process.env.AUTH_ACCESS_TOKEN_SECRET;

    try {
        const decoded = jwt.verify(token, secret);
        const user = await User.findById(decoded._id).select("-password");
        req.user = user;
        next();
    } catch (error) {
        if (error.message === "jwt expired") {
            throw new ErrorResponse(401, 6002, "token expired");
        }
        console.log(error)
        throw new ErrorResponse(401, 6003, "invalid token");
    }
});
