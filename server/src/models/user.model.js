import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        email_address: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        refresh_token: {
            type: String,
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

userSchema.pre("save", function(next) {
    if (!this.isModified("password")) {
        return next();
    } else {
        try {
            const hash = bcrypt.hash(this.password, 10);
            this.password = hash;
            next();
        } catch (error) {
            next(error);
        }
    }
});

export const User = mongoose.model("User", userSchema);
