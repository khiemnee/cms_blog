import { Request, Response } from "express";
import prisma from "../prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel,userSchema } from "../services/auth.service";
import { SECERT_KEY } from "../secret";


export const register = async (req: Request, res: Response) => {
  const { password,role } = req.body;
  
  try {
    const userParsed = userSchema.safeParse(req.body)

    if(!userParsed.success){
      throw new Error(userParsed.error.message)
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    
    const user:UserModel = await prisma.user.create({
     data : {
      ...req.body,
      role,
      password : hashedPassword
     }
    });
    res.status(201).send(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).send(error.message);
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User not found!!!");
    }

    const isMatched = bcrypt.compareSync(password, user.password);

    if (!isMatched) {
      throw new Error("Wrong password!!!");
    }

    const token = jwt.sign({ id: user.id },SECERT_KEY as any);

    res.status(200).send({ user, token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).send(error.message);
    }
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

export const update = async (req:Request,res:Response) =>{
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name','email','password']

        const isMatched = updates.every((value)=>allowedUpdates.includes(value))
       
        if(!isMatched){
            throw new Error('Invalid field!!!')
        }



      const user = await prisma.user.update({
           where : {
            email : req.user.email
           },
           data : {
               ...req.body,
               password :req.body.password ? await bcrypt.hash(req.body.password,8)  : req.user.password
           }
            
        })
    
        res.status(200).send(user)


    } catch (error) {
        if (error instanceof Error) {
            res.status(404).send(error.message);
          }
    }
}