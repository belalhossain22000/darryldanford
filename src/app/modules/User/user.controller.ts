import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userService } from "./user.services";
import { Request, Response } from "express";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.costant";
import ApiError from "../../errors/ApiErrors";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUserIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Registered successfully!",
    data: result,
  });
});

// get all user form db
const getUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await userService.getUsersFromDb(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieve successfully!",
    data: result,
  });
});

// // get all user form db
// const updateProfile = catchAsync(async (req: Request & {user?:any}, res: Response) => {
//   const user = req?.user;

//   const result = await userService.updateProfile(user, req.body);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Profile updated successfully!",
//     data: result,
//   });
// });

// *! update user role and account status
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const isMe = req.user.id === userId;

  if (isMe) {
    throw new ApiError(409, "admin cannot update his role and status");
  }

  const result = await userService.updateUserIntoDb(req.body, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully!",
    data: result,
  });
});

export const userController = {
  createUser,
  getUsers,
  // updateProfile,
  updateUser,
};
