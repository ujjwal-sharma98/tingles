const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
    try{

        const { firstName, lastName, emailId, password } = req.body;
        
        const user = new User({
            firstName,
            lastName,
            emailId,
            password,
        });

        const savedUser = await user.save();

        res.json({ message: "User Added successfully!", data: savedUser });

    } catch (e) {
        res.status(400).send("ERROR : " + err.message);
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        
        if (!user) {
            throw new Error("Invalid User");
        }

        res.send(user);

    } catch (e) {
        res.status(400).send("ERROR : " + err.message);
    }
})

authRouter.post("/logout", async (req, res) => {
    res.send("Logout Successful !!");
});

module.exports = authRouter;