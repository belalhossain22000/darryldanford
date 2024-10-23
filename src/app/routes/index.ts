import express from "express";
import { userRoutes } from "../modules/User/user.route";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { ConsultationRoutes } from "../modules/Consultation/consultation.route";
import { contactUsRoutes } from "../modules/ContactUs/contactUs.route";
import { bookingConsultationsRoutes } from "../modules/Booking-Consultation/contactUs.route";
import { ReviewRoutes } from "../modules/Review/review.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/consultations",
    route: ConsultationRoutes,
  },
  {
    path: "/contact-us",
    route: contactUsRoutes,
  },
  {
    path: "/consultation-book",
    route: bookingConsultationsRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
