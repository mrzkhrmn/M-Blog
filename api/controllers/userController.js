import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return res
      .status(403)
      .json({ error: "You are not allowwed to update this user!" });
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return res
        .status(400)
        .json({ error: "username must be between 7 and 20 characters" });
    }

    if (req.body.username.includes(" ")) {
      return res.status(400).json({ error: "Username cannot contains space" });
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return res.status(400).json({ error: "Username must be lower case" });
    }

    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return res
        .status(400)
        .json({ error: "Username can only contains letters and numbers" });
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password,
          },
        },
        { new: true }
      );

      const { password, ...rest } = updatedUser._doc;

      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  }
};
