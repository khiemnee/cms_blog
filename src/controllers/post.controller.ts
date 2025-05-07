import { Request,Response } from "express";
import prisma from "../prisma/client";
import { PostModel, postSchema } from "../services/post.service";



export const createPosts = async(req:Request,res:Response) =>{
    try {

        const postParse = postSchema.safeParse(req.body)

        if(!postParse.success){
            throw new Error(postParse.error.message)
        }

        const post:PostModel = await prisma.post.create({
            data : {
                
                authorById : req.user.id,
                ...req.body
                
            },
            include : {
                author : true
            }
        })
        res.status(200).send(post)
    } catch (error:unknown) {
        if(error instanceof Error){
            res.status(500).send(error.message)
        }
        
    }
}

export const getPosts = async (req:Request,res:Response) =>{
    try {
    var {order = 'createdAt' ,limit = 10,page = 1,sort = 'desc' } = req.query

    const orderBy = {
        [String(order)] : sort
    }

    
        
   const posts = await prisma.post.findMany({
    skip: (Number(page) - 1) *10,
    take : Number(limit),
    orderBy

   })

   res.status(200).send(posts)
   

    } catch (error:unknown) {
        if(error instanceof Error){
            res.status(500).send(error.message)
        }
    }
}

export const deletePosts = async (req:Request,res:Response) =>{
    try {
        const posts  = await prisma.post.findFirst({
            where : {
                id : req.params.id,
                authorById : req.user.id
            }
        })

        if(!posts){
            throw new Error('Post not found!!!')
        }

        const post = await prisma.post.delete({
            where : {
                id : posts.id
            }
        })

        res.status(200).send(post)
    } catch (error) {
        if(error instanceof Error){
            res.status(500).send(error.message)
        }
    }
}

export const updatePosts = async (req:Request,res:Response) =>{
    try {

        const updates = Object.keys(req.body)
        const allowedUpdates = ['title','content']

        const isMatched = updates.every((values) => allowedUpdates.includes(values))

        if(!isMatched){
            throw new Error('Invalid field to update')
        }

        const post = await prisma.post.findFirst({
            where : {
                id : req.params.id,
                authorById : req.user.id
            }
        })

        if(!post){
            throw new Error('Post not found!!!')
        }

        const postUpdate = await prisma.post.update({
            where : {
                id : post.id
            },
            data : {
                ...req.body
            }
        })

        res.status(200).send(postUpdate)
    } catch (error:unknown) {
        if(error instanceof Error){
            res.status(500).send(error.message)
        }
    }
}