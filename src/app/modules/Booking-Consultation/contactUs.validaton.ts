import { z } from "zod";

const consultationBooking = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  age: z.string().min(1),
});

export default consultationBooking;
