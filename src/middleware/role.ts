import { NextFunction, Request,Response } from "express"



export const checkRole = async (req:Request,res:Response,next:NextFunction) =>{
    try {
        if(req.user.role !== 'ADMIN'){
            throw new Error('User is not authorized')
        }
        next()
    } catch (error:unknown) {
        if (error instanceof Error) {
            res.status(403).send(error.message);
          }
    }
}