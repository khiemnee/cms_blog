import { NextFunction, Request,Response } from "express";
import client from "./redis";

export const getUserId = async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const userKey = await client.get(`user:${req.user.id}`)

        if(userKey){
            res.status(200).send(JSON.parse(userKey))
            return
        }

        req.userKey = `user:${req.user.id}`
        next()
    } catch (error:unknown) {
        if(error instanceof Error){
            res.status(500).send(error.message)
        }
    }
}