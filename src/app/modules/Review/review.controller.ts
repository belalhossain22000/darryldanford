import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { ReviewService } from "./review.service";
import { reviewFilterableFields } from "./review.constant";
import pick from "../../../shared/pick";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.createReviewIntoDb(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review created successfully ",
    data: result,
  });
});
const getAllReview = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, reviewFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await ReviewService.getAllReviewsFromDb(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All review retrive successfully ",
    data: result,
  });
});
const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const reviewId = req.params.reviewId;
  const result = await ReviewService.getSingleReview(reviewId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single review retrive successfully ",
    data: result,
  });
});
const updateReview = catchAsync(async (req: Request, res: Response) => {
  const reviewId = req.params.reviewId;
  
  const result = await ReviewService.updateReview(reviewId, req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Review udpated successfully ",
    data: result,
  });
});
const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const reviewId = req.params.reviewId;
  const result = await ReviewService.deleteReview(reviewId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review deleted successfully ",
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getAllReview,
  getSingleReview,
  updateReview,
  deleteReview,
};
