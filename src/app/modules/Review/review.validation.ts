import { z } from "zod";

const reviewSchema = z.object({
  image: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  designation: z.string().optional(),
  comment: z.string().min(1, "Comment is required"),
  
});

const updateReviewSchema = z.object({
  image: z.string().optional(),
  name: z.string().optional(),
  designation: z.string().optional(),
  comment: z.string().optional(),

});

export const ReviewValidationSchema = { reviewSchema, updateReviewSchema };
