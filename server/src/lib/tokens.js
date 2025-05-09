import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import mongoose from "mongoose";

export const generateAccessToken = async (userId) => {
    if (!mongoose.isValidObjectId(userId)) {
        throw new Error("invalid user id, ref:[tokens.generateAccessToken]");
    }
    const secret = process.env.AUTH_ACCESS_TOKEN_SECRET;
    const expiry = process.env.AUTH_ACCESS_TOKEN_EXPIRY;
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("user not found, ref:[tokens.generateAccessToken]");
    }
    const token = jwt.sign(
        {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email_address: user.email_address,
        },
        secret,
        { expiresIn: expiry },
    );

    return token;
};

export const generateRefreshToken = async (userId) => {
    if (!mongoose.isValidObjectId(userId)) {
        throw new Error("invalid user id, ref:[tokens.generateRefreshToken]");
    }
    const secret = process.env.AUTH_REFRESH_TOKEN_SECRET;
    const expiry = process.env.AUTH_REFRESH_TOKEN_EXPIRY;
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("user not found, ref:[tokens.generateRefreshToken]");
    }
    const token = jwt.sign(
        {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email_address: user.email_address,
        },
        secret,
        { expiresIn: expiry },
    );

    return token;
};
