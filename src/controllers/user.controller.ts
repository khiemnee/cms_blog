import { Request, Response } from "express";
import prisma from "../prisma/client";
import client from "../cache/redis";

export const users = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      throw new Error("Users not found!!");
    }
    res.status(200).send(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

export const userById = async(req:Request,res:Response) => {
    try {
        const user = await prisma.user.findFirst({
            where : {
                id : req.params.id
            }
        })

        if(!user){
            throw new Error('User not found')
        }

        if(req.userKey){
            await client.setEx(req.userKey.toString(),3600,JSON.stringify(user))
        }
    

        res.status(200).send(user)

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
          }
    }
}

export const deleteUser = async(req:Request,res:Response)=>{
    try {


        const userId = req.params.id


        if(req.user.id !== userId && req.user.role !== 'ADMIN'){
            throw new Error('Not authorized to delete this user')
        }

        const user = await prisma.user.findFirst({
            where : {
                id : req.user.id
            }
        })
        if(!user){
            throw new Error('User not found')
        }

        await prisma.user.delete({
            where : {
                id : user.id
            }
        })

        res.status(200).send({
            message : "deleted succsess"
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
          }
    }
}
