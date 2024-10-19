import express from "express";
import { ConsultationsController } from "./consultation.controller";
import { fileUploader } from "../../../helpars/fileUploader";
const router = express.Router();

router.post(
  "/",
  fileUploader.uploadSingle,
  ConsultationsController.createConsultation
);

export const ConsultationRoutes = router;
