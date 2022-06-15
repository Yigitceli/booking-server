import { NextFunction, Request, Response } from "express";

const verifyToken = (req:Request,res:Response, next:NextFunction) => {
    const {accesToken} = req.headers
    try {
        
    } catch (error) {
        
    }
}
export default verifyToken