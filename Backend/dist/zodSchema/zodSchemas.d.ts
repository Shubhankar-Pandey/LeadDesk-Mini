import z from "zod";
export declare const signupBody: z.ZodObject<{
    name: z.ZodString;
    confirmPassword: z.ZodString;
    password: z.ZodString;
    email: z.ZodEmail;
}, z.core.$strip>;
export declare const signinBody: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const createLeadBody: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    budgetFrom: z.ZodInt;
    budgetTo: z.ZodInt;
    message: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=zodSchemas.d.ts.map