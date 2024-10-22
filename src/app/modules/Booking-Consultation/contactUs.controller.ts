import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ConsultationBookingService } from "./contactUs.service";

const consultationBookingMainlSender = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await ConsultationBookingService.consultationBookingEmailSender(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Email Send successfully!",
      data: null,
    });
  }
);

export const consultationBookingMainlSendController = {
  consultationBookingMainlSender,
};
