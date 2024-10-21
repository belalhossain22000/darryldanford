import { ConsultationService } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiErrors";
import httpStatus from "http-status";
import { Request } from "express";
import config from "../../../config";

// create consultation
const createConsultation = async (req: Request) => {
  const file = req.file;
  if (!file || !file.originalname) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "File is required for consultation image"
    );
  }
  const image = `${config.backend_base_url}/uploads/${file?.originalname}`;

  if (!req.body.body) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid request body");
  }
  let consultationData;
  try {
    consultationData = JSON.parse(req.body.body);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid JSON in request body");
  }
  const payload = { ...consultationData, image };

  const isCosultationExist = await prisma.consultationService.findUnique({
    where: {
      name: payload.name,
    },
  });

  if (isCosultationExist) {
    throw new ApiError(httpStatus.CONFLICT, "Consultation already exists");
  }
  const result = await prisma.consultationService.create({
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

// get all consultations
const getConsultations = async () => {
  const result = await prisma.consultationService.findMany({});
  return result;
};
const getConsultationById = (id: string) => {
  console.log(id);
};
const updateConsultation = (payload: ConsultationService) => {
  console.log(payload);
};
export const ConsultationServices = {
  createConsultation,
  getConsultations
};
