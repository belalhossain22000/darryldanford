import express from "express";
import { ReviewController } from "./review.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewValidationSchema } from "./review.validation";
import { fileUploader } from "../../../helpars/fileUploader";

const router = express.Router();

router.post(
  "/",
  fileUploader.uploadSingle,
  // validateRequest(ReviewValidationSchema.reviewSchema),
  ReviewController.createReview
);

router.get("/", ReviewController.getAllReview);

router.get("/:reviewId", ReviewController.getSingleReview);

router.put(
  "/:reviewId",
  fileUploader.uploadSingle,
  ReviewController.updateReview
);

router.delete("/:reviewId", ReviewController.deleteReview);

export const ReviewRoutes = router;
