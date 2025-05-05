import { Request, Response } from "express";
import prisma from "../prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const authRegister = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 8),
      },
    });
    res.status(201).send(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).send(error.message);
    }
  }
};

export const authLogin = async (req: Request, res: Response) => {
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

    const token = jwt.sign({ id: user.id }, "cmsblogkey");

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
      res.status(404).send(error.message);
    }
  }
};
