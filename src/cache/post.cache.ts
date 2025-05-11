import { NextFunction, Request, Response } from "express";
import client from "./redis";
import prisma from "../client/client";

export const postsCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postKey = await client.get("posts");

    if (postKey) {
      res.status(200).send(JSON.parse(postKey));
      return;
    }

    req.postKey = "posts";
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

export const postIdCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postKey = await client.get(`post:${req.params.id}`);
    await client.incr(`post:${req.params.id}:views`);
    if (postKey) {
      const parse = JSON.parse(postKey);
      const views = Number(await client.get(`post:${req.params.id}:views`));
     await prisma.post.update({
        where: {
          id: req.params.id,
        },
        data: {
          views
        },
      });
      res.status(200).send({ parse, views });
      return;
    }

    req.postIdKey = `post:${req.params.id!}`;
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};
