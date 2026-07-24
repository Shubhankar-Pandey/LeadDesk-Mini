import type { Request, Response } from "express";
import Prisma from "../config/prisma.js";


export const callme = async(req : Request, res : Response) => {
    return res.status(200).json({
        success : true, 
        message : "Authenticated user",
    })
}

export const getLead = async(req:Request, res:Response) => {
    try{
        const allLeads = await Prisma.lead.findMany({
            orderBy : {
                createdAt : "asc",
            }
        });
        return res.status(200).json({
            success : true, 
            message : "Leads fetched successfully",
            allLeads,
        })
    }
    catch(error){
        return res.status(500).json({
            success : false, 
            message : "Internal server error",
        })
    }
}


export const changeStatus = async(req:Request, res:Response) => {
    try{
        const leadId = Number(req.params.id);
        const {newStatus} = req.body;
        if(!leadId || !newStatus){
            return res.status(400).json({
                success : false, 
                message : "Data missing",
            })
        }

        const existLead = await Prisma.lead.findUnique({
            where : {
                id : leadId
            }
        })
        if(!existLead){
            return res.status(404).json({
                success : false, 
                message : "Lead not found"
            })
        }

        const updateLead = await Prisma.lead.update({
            data : {
                status : newStatus,
            },
            where : {
                id : leadId
            }
        })

        return res.status(200).json({
            success : true, 
            message : "Lead updated successfully",
            updateLead,
        })
    }
    catch(error){
       return res.status(500).json({
            success : false, 
            message : "Internal server error",
        }) 
    }
}