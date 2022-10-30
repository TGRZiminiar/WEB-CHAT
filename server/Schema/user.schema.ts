import { object, string, TypeOf } from "zod"

export const createUserSchema = object({
    body: object({
      userName: string({
        required_error: "userName is required",
      }),
      password: string({
        required_error: "Name is required",
      }).min(6, "Password too short - should be 6 chars minimum"),

      passwordConfirmation: string({
        required_error: "passwordConfirmation is required",
      }),

      email: string({
        required_error: "Email is required",
      }).email("Not a valid email"),

    }).refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    }),
  });

export const loginSchema = object({
    body: object({
      email: string({
        required_error: "Email is required",
      }).email("Not a valid email"),
      
      password: string({
        required_error: "Name is required",
      }).min(6, "Password too short - should be 6 chars minimum"),
    })
  });
  
export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>,"body.passwordConfirmation">;
