import { z } from 'zod';

// User Profile Validation Schema
export const ProfileSchema = z?.object({
  full_name: z?.string()?.min(2, 'Name must be at least 2 characters')?.max(100, 'Name must be less than 100 characters')?.regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  email: z?.string()?.email('Please enter a valid email address')?.max(255, 'Email must be less than 255 characters'),
  
  age: z?.number()?.min(18, 'You must be at least 18 years old')?.max(100, 'Age must be less than 100')?.int('Age must be a whole number'),
  
  prayer_frequency: z?.enum(['5_times_daily', 'mostly_regular', 'occasionally', 'rarely'], {
    errorMap: () => ({ message: 'Please select a valid prayer frequency' })
  }),
  
  hijab_preference: z?.enum(['always', 'sometimes', 'never', 'not_applicable'], {
    errorMap: () => ({ message: 'Please select a valid hijab preference' })
  }),
  
  education_level: z?.enum(['high_school', 'bachelor', 'master', 'phd', 'other'], {
    errorMap: () => ({ message: 'Please select a valid education level' })
  }),
  
  occupation: z?.string()?.min(1, 'Occupation is required')?.max(100, 'Occupation must be less than 100 characters'),
  
  location: z?.string()?.min(1, 'Location is required')?.max(255, 'Location must be less than 255 characters'),
  
  bio: z?.string()?.max(1000, 'Bio must be less than 1000 characters')?.optional(),
  
  marital_status: z?.enum(['never_married', 'divorced', 'widowed'], {
    errorMap: () => ({ message: 'Please select a valid marital status' })
  }),
  
  has_children: z?.boolean(),
  wants_children: z?.boolean(),
  
  height: z?.number()?.min(120, 'Height must be at least 120cm')?.max(250, 'Height must be less than 250cm')?.optional(),
  
  ethnicity: z?.string()?.max(100, 'Ethnicity must be less than 100 characters')?.optional()
});

// Registration Schema
export const RegistrationSchema = ProfileSchema?.extend({
  password: z?.string()?.min(8, 'Password must be at least 8 characters')?.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  confirm_password: z?.string(),
  
  terms_accepted: z?.boolean()?.refine(val => val === true, 'You must accept the terms and conditions')
})?.refine(data => data?.password === data?.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"]
});

// Login Schema
export const LoginSchema = z?.object({
  email: z?.string()?.email('Please enter a valid email address'),
  
  password: z?.string()?.min(1, 'Password is required')
});

// Message Schema
export const MessageSchema = z?.object({
  message: z?.string()?.min(1, 'Message cannot be empty')?.max(1000, 'Message must be less than 1000 characters')?.refine(val => val?.trim()?.length > 0, 'Message cannot be only whitespace'),
  
  recipient_id: z?.string()?.uuid('Invalid recipient ID')
});

// Contact Form Schema
export const ContactFormSchema = z?.object({
  name: z?.string()?.min(2, 'Name must be at least 2 characters')?.max(100, 'Name must be less than 100 characters'),
  
  email: z?.string()?.email('Please enter a valid email address'),
  
  subject: z?.string()?.min(1, 'Subject is required')?.max(200, 'Subject must be less than 200 characters'),
  
  message: z?.string()?.min(10, 'Message must be at least 10 characters')?.max(2000, 'Message must be less than 2000 characters')
});

// Validation utility functions
export const validateData = (schema, data) => {
  try {
    const result = schema?.parse(data);
    return { success: true, data: result, errors: null };
  } catch (error) {
    if (error instanceof z?.ZodError) {
      const errors = error?.errors?.reduce((acc, curr) => {
        const path = curr?.path?.join('.');
        acc[path] = curr?.message;
        return acc;
      }, {});
      return { success: false, data: null, errors };
    }
    return { success: false, data: null, errors: { general: 'Validation failed' } };
  }
};

export const getFieldError = (errors, fieldName) => {
  return errors?.[fieldName] || null;
};