const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const { sendEmail } = require('../utils/sendEmail');

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
      const user = req.user;
      res.send(user);
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
      const loggedInUser = req.user;
  
      Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
  
      await loggedInUser.save();

      await sendEmail("Profile Updated Successfully", "Your profile has been updated successuly!!", loggedInUser.emailId);
  
      res.json({
        message: `${loggedInUser.firstName}, your profile updated successfuly`,
        data: loggedInUser,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
});

module.exports = profileRouter;