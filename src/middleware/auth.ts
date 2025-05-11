import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import prisma from "../client/client";
import { SECERT_KEY } from "../secret";

interface MyPayload extends jwt.JwtPayload {
    id: string;
  }


export const auth = async (req:Request,res:Response,next:NextFunction) =>{

    try {
        const token = req.header('Authorization')!.replace('Bearer ','')
        const decode =  jwt.verify(token,SECERT_KEY!.toString()) as MyPayload
    
    
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
            res.status(403).send(error.message);
          }
    }
   
}