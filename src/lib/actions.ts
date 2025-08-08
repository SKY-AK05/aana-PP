"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type FormState = {
  message: string;
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};

export async function submitContactForm(
  data: z.infer<typeof contactSchema>
): Promise<FormState> {
  const validatedFields = contactSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the form errors.",
      success: false,
    };
  }

  try {
    // Here you would typically send an email or save to a database.
    // For this example, we'll just log it and simulate a delay.
    console.log("Form submitted successfully:", validatedFields.data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      message: "Thank you for your message! I'll get back to you soon.",
      success: true,
    };
  } catch (e) {
    return {
      message: "An unexpected error occurred. Please try again.",
      success: false,
    };
  }
}
