import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

import consultationBooking from "./contactUs.validaton";
import { consultationBookingMainlSendController } from "./contactUs.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(consultationBooking),
  consultationBookingMainlSendController.consultationBookingMainlSender
);

export const bookingConsultationsRoutes = router;
