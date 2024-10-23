import { Request } from "express";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiErrors";
import httpStatus from "http-status";
import config from "../../../config";

const createReviewIntoDb = async (req: Request) => {
  const file = req.file;
  if (!file || !file.originalname) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "File is required for profile image"
    );
  }
  const image = `${config.backend_base_url}/uploads/${file?.originalname}`;

  if (!req.body.body) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Requered request body");
  }
  let reviewData;
  try {
    console.log(req.body.body);
    reviewData = JSON.parse(req.body.body);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid JSON in request body");
  }
  const payload = { ...reviewData, image };

  const result = await prisma.review.create({
    data: payload,
  });

  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create Consultation"
    );
  }
  return result;
};

const getAllReviewsFromDb = async () => {
  const result = await prisma.review.findMany({});
  return result;
};

const getSingleReview = async (reviewId: any) => {
  const result = await prisma.review.findMany({
    where: {
      id: reviewId,
    },
  });
  return result;
};

const updateReview = async (reviewId: any, payload: any) => {
  const result = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: payload,
  });
  return result;
};

const deleteReview = async (reviewId: any) => {
  const result = await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });
  return result;
};

export const ReviewService = {
  createReviewIntoDb,
  getAllReviewsFromDb,
  getSingleReview,
  updateReview,
  deleteReview,
};
