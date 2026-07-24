import z from "zod";
export const signupBody = z.object({
    name: z.string(),
    confirmPassword: z.string(),
    password: z.string().min(5),
    email: z.email(),
})
    .refine((data) => data.confirmPassword === data.password, {
    message: "Password and confirmPassword are not matching",
    path: ["confirmPassword"],
});
export const signinBody = z.object({
    email: z.email(),
    password: z.string(),
});
export const createLeadBody = z.object({
    name: z.string(),
    email: z.email(),
    budgetFrom: z.int(),
    budgetTo: z.int(),
    message: z.string(),
})
    .refine((data) => data.budgetTo >= data.budgetFrom, {
    message: "budgetTo must be greater than or equal to budgetFrom",
    path: ["budgetTo"], // Error will be attached to budgetTo
});
//# sourceMappingURL=zodSchemas.js.map