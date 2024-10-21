import express from "express";
import { ConsultationsController } from "./consultation.controller";
import { fileUploader } from "../../../helpars/fileUploader";
import auth from "../../middlewares/auth";
const router = express.Router();

router.post(
  "/",
  // auth("ADMIN"),
  fileUploader.uploadSingle,
  ConsultationsController.createConsultation
);

router.get("/", ConsultationsController.getConsultations);

router.get("/:id", ConsultationsController.getConsultationById);

router.put("/:id", auth("ADMIN"), ConsultationsController.updateConsultation);

router.delete(
  "/:id",
  // auth("ADMIN"),
  ConsultationsController.deleteConsultation
);

export const ConsultationRoutes = router;
