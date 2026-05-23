import type { Request, Response } from "express";
import { issueService } from "./issue.service";
import issueFormatter from "../../utils/issueFormatter";

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

    const formattedData = allIssues.map((issue) => issueFormatter(issue));

     res.status(200).json({
      success: true,
      data: formattedData,
    });


    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message,
           errors:error
        });
    }
}

const getSingleIssue = async (req:Request, res: Response) => {
   try {
     const {id} = req.params;

    const issue = await issueService.getSingleIssueFromDB(Number(id));
    const formattedIssue = issueFormatter(issue);
     res.status(200).json({
      success: true,
      data: formattedIssue,
    });
   } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message,
           errors:error
        });
    }
}

const updateIssue = async (req:Request, res: Response) => {
    try {
        const { id } = req.params;

    const updatedIssue = await issueService.updateIssueInDB(
      Number(id),
      req.user as any,
      req.body
    );

    return res.status(200).json({
      success: true,
      data: updatedIssue,
    });
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message,
            errors: error
        });
    }
}

const deleteIssue = async (req:Request, res: Response) => {
     try {
    const { id } = req.params;

    await issueService.deleteIssueFromDB(Number(id), req.user as any);

    return res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error: any) {

    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }
}

export const issueController = {
    createIssue,
    getSingleIssue,
    updateIssue,
    deleteIssue,
    getAllIssues
}