import type { Request, Response } from "express";

const createIssue = (req:Request, res: Response) => {
    res.status(201).json({
        status:'success',
        data:{
            title:'Issue 1',
            description:'This is the first issue'
        }
    });
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
    deleteIssue
}