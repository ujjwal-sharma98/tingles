const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,
        maxLength: 50,
    }, 
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error("Invalid email address: " + value);
            }
        },
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
              throw new Error("Enter a Strong Password: " + value);
            }
        },
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: `{VALUE} is not a valid gender type`,
        },
    },
    photoUrl: {
        type: String,
        validate(value) {
            if (!validator.isURL(value)) {
              throw new Error("Invalid Photo URL: " + value);
            }
        },
    },
    about: {
        type: String,
        default: "This is a default about of the user!",
    },
    skills: {
        type: [String],
    },
},{
    timestamps: true,
  }
)

userSchema.methods.getJWT = async function() {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_HASH_STRING, {
        expiresIn: "7d",
    });

    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
  
    const isPasswordValid = await bcrypt.compare(
      passwordInputByUser,
      passwordHash
    );
  
    return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);