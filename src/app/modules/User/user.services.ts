import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiErrors";
import { IUser, IUserFilterRequest } from "./user.interface";
import * as bcrypt from "bcrypt";
import { IPaginationOptions } from "../../interfaces/paginations";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { Prisma, UserRole, UserStatus } from "@prisma/client";
import { userSearchAbleFields } from "./user.costant";
import config from "../../../config";
import httpStatus from "http-status";

// Create a new user in the database.
const createUserIntoDb = async (payload: any) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (existingUser) {
    throw new ApiError(
      400,
      `User with this email ${payload.email}  already exists`
    );
  }

  const hashedPassword: string = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await prisma.user.create({
    data: { ...payload, password: hashedPassword },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      isDeleted: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  console.log(result);

  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "insternal server error user not created"
    );
  }

  return result;
};

// reterive all users from the database
const getUsersFromDb = async (
  params: IUserFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.UserWhereInput[] = [];

  //console.log(filterData);
  if (params.searchTerm) {
    andCondions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditons: Prisma.UserWhereInput = { AND: andCondions };

  const result = await prisma.user.findMany({
    where: whereConditons,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  const total = await prisma.user.count({
    where: whereConditons,
  });

  if (!result || result.length === 0) {
    throw new ApiError(404, "No active users found");
  }
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// update profile
// const updateProfile = async (user: IUser, payload: IUser) => {
//   const userInfo = await prisma.user.findUnique({
//     where: {
//       email: user.email,
//       id: user.id,
//     },
//   });

//   if (!userInfo) {
//     throw new ApiError(404, "User not found");
//   }

//   // Update the user profile with the new information
//   const updatedUser = await prisma.user.update({
//     where: {
//       email: userInfo.email,
//     },
//     data: payload,
//     select: {
//       id: true,
//       email: true,
//       role: true,
//       status: true,
//     },
//   });

//   return updatedUser;
// };

const updateUserIntoDb = async (payload: IUser, id: string) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!userInfo) {
    throw new ApiError(404, "User not found");
  }

  // Update the user with the provided payload
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      status: payload.status,
      role: payload.role,
    },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
    },
  });

  return result;
};

export const userService = {
  createUserIntoDb,
  getUsersFromDb,
  // updateProfile,
  updateUserIntoDb,
};
