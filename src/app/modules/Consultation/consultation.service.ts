import { ConsultationService } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiErrors";
import httpStatus from "http-status";

const createConsultation = async (payload: ConsultationService) => {
  const isCosultationExist = await prisma.consultationService.findUnique({
    where: {
      name: payload.name,
    },
  });

  if (isCosultationExist) {
    throw new ApiError(httpStatus.CONFLICT, "Consultation already exists");
  }
};
const getConsultations = () => {
  console.log("payload");
};
const getConsultationById = (id: string) => {
  console.log(id);
};
const updateConsultation = (payload: ConsultationService) => {
  console.log(payload);
};
export const ConsultationServices = {
  createConsultation,
};
