import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ConsultationServices } from "./consultation.service";
import { userFilterableFields } from "../User/user.costant";
import pick from "../../../shared/pick";
import { consultationFilterableFields } from "./consultations.constant";

const createConsultation = catchAsync(async (req: Request, res: Response) => {
  const result = await ConsultationServices.createConsultation(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Consultation created successfully",
    data: result,
  });
});

const getConsultations = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, consultationFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await ConsultationServices.getConsultations(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Consultations retrieved successfully",
    data: result,
  });
});

const getConsultationById = catchAsync(async (req: Request, res: Response) => {
  const result = await ConsultationServices.getConsultationById(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Consultations return successfully",
    data: result,
  });
});

const updateConsultation = catchAsync(async (req: Request, res: Response) => {
  const result = await ConsultationServices.updateConsultationIntoDB(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Consultation updated successfully",
    data: result,
  });
});

const deleteConsultation = catchAsync(async (req: Request, res: Response) => {
  const result = await ConsultationServices.deleteConsultationIntoDB(
    req.params.id
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Consultation deleted successfully",
    data: result,
  });
});

export const ConsultationsController = {
  createConsultation,
  getConsultations,
  getConsultationById,
  updateConsultation,
  deleteConsultation,
};
