import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    profileUrl: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: false,
    },
    contactNum: {
        type: String,
        required: false,
    }
});

export const Profile = mongoose.model("Profile", profileSchema);
    