import express from "express";
import { ConsultationsController } from "./consultation.controller";
import { fileUploader } from "../../../helpars/fileUploader";
const router = express.Router();

router.post(
  "/",
  fileUploader.uploadSingle,
  ConsultationsController.createConsultation
);

// get all consultations
router.post("/", ConsultationsController.getConsultations);

export const ConsultationRoutes = router;
