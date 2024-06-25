import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;

// we are creting 2 token as verifyToken and verifyTokenExpiry
// for the case of the signup (token -> time + string )
// this token is send to the user via email and stored in the database
// For the verification EMail we will be comparing the token send to the user via email to the token store in the database
// if the token match we will verifyToken and verifyTokenExpiry will be set to the current time and will be stored in the database
// and update the value of the isVerified field to true



// for the case of forgot password
// the url is send to the email and our app will generate the token 1 token will be stored in the db and another token is 
// send to the user. Now once the token is matched we will set the forgotPasswordToken and forgotPasswordTokenExpiry to the current time
// and update the user password to the new updated one.