import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ConsultationServices } from "./consultation.service";

const createConsultation = catchAsync(async (req: Request, res: Response) => {
  const result = await ConsultationServices.createConsultation(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Consultation created successfully",
    data: result,
  });
});

export const ConsultationsController = {
  createConsultation,
};
