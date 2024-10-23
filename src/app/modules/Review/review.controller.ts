import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { ReviewService } from "./review.service";

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
  const result = await ReviewService.getAllReviewsFromDb();
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
