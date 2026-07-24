import { createLeadBody } from "../zodSchema/zodSchemas.js";
import Prisma from "../config/prisma.js";
export const createLead = async (req, res) => {
    try {
        const result = createLeadBody.safeParse(req.body);
        if (!result.success) {
            return res.status(411).json({
                message: "Incorrect inputs"
            });
        }
        const { name, email, budgetFrom, budgetTo, message } = result.data;
        await Prisma.lead.create({
            data: {
                name,
                email,
                budgetFrom,
                budgetTo,
                message,
            }
        });
        return res.status(200).json({
            success: true,
            message: "Lead created successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
//# sourceMappingURL=client.js.map