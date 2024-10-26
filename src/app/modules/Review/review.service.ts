import { Request } from "express";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiErrors";
import httpStatus from "http-status";
import config from "../../../config";
import { Prisma, ReviewStatus } from "@prisma/client";
import { paginationHelper } from "../../../helpars/paginationHelper";

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

const getAllReviewsFromDb = async (params: any, options: any) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.ReviewWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { comment: { contains: searchTerm, mode: "insensitive" } },
      ],
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.ReviewWhereInput = { AND: andConditions };

  const result = await prisma.review.findMany({
    where: whereConditions,
    take: limit,
    skip,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.review.count({
    where: whereConditions,
  });

  if (!result || result.length === 0) {
    throw new ApiError(404, "No reviews found");
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

const getSingleReview = async (reviewId: any) => {
  const result = await prisma.review.findMany({
    where: {
      id: reviewId,
    },
  });

  if (!result) {
    throw new ApiError(404, "Review not found");
  }
  return result;
};

const updateReview = async (reviewId: any, req: Request) => {
  const file = req.file;


  if (!req.body.body) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Requered request body");
  }
  let reviewData;
  try {
    reviewData = JSON.parse(req.body.body);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid JSON in request body");
  }

  const isReviewExist = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!isReviewExist) {
    throw new ApiError(404, "Review not found ");
  }

  let image;
  if (file && file.originalname) {
    image = `${config.backend_base_url}/uploads/${file?.originalname}`;
  }

  if (image) {
    reviewData.image = image;
  }

  const payload = { ...reviewData };
  const result = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to update Review"
    );
  }
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
