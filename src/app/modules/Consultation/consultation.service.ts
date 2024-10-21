import { ConsultationService, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiErrors";
import httpStatus from "http-status";
import { Request } from "express";
import config from "../../../config";
import { IUserFilterRequest } from "../User/user.interface";
import { IPaginationOptions } from "../../interfaces/paginations";
import { userSearchAbleFields } from "../User/user.costant";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { consultationSearchAbleFields } from "./consultations.constant";

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
const getConsultations = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.ConsultationServiceWhereInput[] = [];

  if (params.searchTerm) {
    andCondions.push({
      OR: consultationSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditons: Prisma.ConsultationServiceWhereInput = {
    AND: andCondions.length > 0 ? andCondions : undefined,
  };

  const result = await prisma.consultationService.findMany({
    where: whereConditons,
    take: limit,
    skip,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.consultationService.count({});

  if (!result || result.length === 0) {
    throw new ApiError(404, "No active consultations found");
  }
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get consultation by id
const getConsultationById = async (id: string) => {
  const result = await prisma.consultationService.findUnique({
    where: { id: id },
  });

  if (!result) {
    throw new ApiError(404, "Consultation not found");
  }

  return result;
};

// update consultation by id
const updateConsultationIntoDB = async (id: string, payload: any) => {
  const consultation = await getConsultationById(id);

  if (!consultation) {
    throw new ApiError(404, "Consultation not found");
  }

  const updatedConsultation = await prisma.consultationService.update({
    where: { id: id },
    data: payload,
  });

  if (!updatedConsultation) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to update consultation"
    );
  }

  return updatedConsultation;
};

// delete consultation by id
const deleteConsultationIntoDB = async (id: string) => {
  const consultation = await getConsultationById(id);

  if (!consultation) {
    throw new ApiError(404, "Consultation not found");
  }
  const result = await prisma.consultationService.delete({
    where: { id: id },
  });

  return result;
};

export const ConsultationServices = {
  createConsultation,
  getConsultations,
  getConsultationById,
  updateConsultationIntoDB,
  deleteConsultationIntoDB,
};
