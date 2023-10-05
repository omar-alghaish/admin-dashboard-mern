import User from "../models/user.js";
import asyncHandler from "express-async-handler";

export const getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    next(new ApiError("there is no user for this id", 404));
  }
  res.status(200).json(user);
});
