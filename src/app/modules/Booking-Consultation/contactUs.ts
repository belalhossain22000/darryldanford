import nodemailer from "nodemailer";
import config from "../../../config";

const consultationBookingMainlSender = async (
  userEmail: string,
  subject: string,
  htmlContent: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: config.emailSender.email,
        pass: config.emailSender.app_pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"darrylandford" <${config.emailSender.email}>`,
      to: config.emailSender.email,
      subject: subject,
      html: htmlContent,
      replyTo: userEmail,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(info.messageId);
  } catch (error: any) {
    console.error(`Failed to send email: ${error.message}`);
  }
};

export default consultationBookingMainlSender;
