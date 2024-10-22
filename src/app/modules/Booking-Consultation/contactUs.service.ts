import consultationBookingMainlSender from "./contactUs";
import { ContactForm } from "./contactUs.interface";

const consultationBookingEmailSender = async (payload: ContactForm) => {
  try {
    const result = await consultationBookingMainlSender(
      payload.email,
      "consultation booked " + payload.name,
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <h1 style="background-color: #007BFF; color: white; padding: 15px; border-radius: 8px 8px 0 0; text-align: center; margin: 0;">
        Consultation Booking 
          </h1>
          
          <div style="padding: 20px;">
            <p style="margin: 10px 0;">
              <strong style="color: #007BFF;">First Name:</strong> 
              <span style="color: #555;">${payload.name}</span>
            </p>
            
      
            <p style="margin: 10px 0;">
              <strong style="color: #007BFF;">Email:</strong> 
              <span style="color: #555;">${payload.email}</span>
            </p>
  
            <p style="margin: 10px 0;">
              <strong style="color: #007BFF;">Phone Number:</strong> 
              <span style="color: #555;">${payload.phoneNumber ?? "N/A"}</span>
            </p>
            
      
            
            <p style="margin: 10px 0; border-top: 1px solid #ddd; padding-top: 10px;">
              <em style="color: #777;">This message was sent from your contact form.</em>
            </p>
          </div>
        </div>
        `
    );
    return result;
  } catch (error) {
    throw new Error("Failed to send email");
  }
};

export const ConsultationBookingService = {
  consultationBookingEmailSender,
};
