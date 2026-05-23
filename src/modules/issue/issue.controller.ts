import type { Request, Response } from "express";
import { issueService } from "./issue.service";

const createIssue = async (req:Request, res: Response) => {

    try {
        const createdIssue =await issueService.createIssueIntoDB({...req.body, reporter_id: req.user?.id});
    res.status(201).json({
        success:true,
        message:'Issue created successfully',
        data:createdIssue
    });
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message,
           errors:error
        });
    }
}

const getAllIssues = async (req:Request, res: Response) => {
    try {
        const {sort="newest",type,status} = req.query;

        const validSortValues = ["newest", "oldest"];
    const validTypes = ["bug", "feature_request"];
    const validStatuses = ["open", "in_progress", "resolved"];

    if (!validSortValues.includes(sort as string)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sort value",
      });
    }


    if (type && !validTypes.includes(type as string)) {
      return res.status(400).json({
        success: false,
        message: "Invalid type value",
      });
    }

    if (status && !validStatuses.includes(status as string)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const allIssues = await issueService.getAllIssuesFromDB({ sort: sort as string, type: type as string, status: status as string });

   res.status(200).json({
        success:true,
        message:'Issues retrieved successfully',
        data:allIssues
    });


    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message,
           errors:error
        });
    }
}

const getSingleIssue = (req:Request, res: Response) => {
    res.status(200).json({
        status:'success',
        data:{
            title:'Issue 1',
            description:'This is the first issue'
        }
    })
}

const updateIssue = (req:Request, res: Response) => {
    res.status(200).json({
        status:'success',
        data:{
            title:'Issue 1',
            description:'This is the first issue'
        }
    })
}

const deleteIssue = (req:Request, res: Response) => {
     res.status(200).json({
        status:'success',
        data:{
            title:'Issue 1',
            description:'This is the first issue'
        }
    })
}

export const issueController = {
    createIssue,
    getSingleIssue,
    updateIssue,
    deleteIssue,
    getAllIssues
}