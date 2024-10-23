import express from "express";
import { ReviewController } from "./review.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewValidationSchema } from "./review.validation";
import { fileUploader } from "../../../helpars/fileUploader";

const router = express.Router();

router.post(
  "/",
  //   validateRequest(ReviewValidationSchema.reviewSchema),
  fileUploader.uploadSingle,
  ReviewController.createReview
);

router.get("/", ReviewController.getAllReview);

router.get("/:reviewId", ReviewController.getSingleReview);

router.put("/:reviewId", ReviewController.updateReview);

router.delete("/:reviewId", ReviewController.deleteReview);

export const ReviewRoutes = router;
