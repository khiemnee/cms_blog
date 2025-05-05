import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import prisma from "../prisma/client";

interface MyPayload extends jwt.JwtPayload {
    id: string;
  }


export const auth = async (req:Request,res:Response,next:NextFunction) =>{

    try {
        const token = req.header('Authorization')!.replace('Bearer ','')
        const decode =  jwt.verify(token,'cmsblogkey') as MyPayload
    
    
        const {id} = decode
        const user = await prisma.user.findFirst({
            where : {
                id
            }
        })
    
        if(!user){
            throw new Error('User not found!!')
        }
    req.user = user 
        next()
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).send(error.message);
          }
    }
   
}