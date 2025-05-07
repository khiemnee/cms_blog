import { Request,Response } from "express";
import prisma from "../prisma/client";

export const createComments = async (req:Request,res:Response) => {
    try {
        const comment = await prisma.comment.create({
            data : {
                authorById : req.user.id,
                postById : req.params.postId,
                ...req.body
            },
            include : {
                author : true,
                post : true
            }
        })
        
        res.status(201).send(comment)
    } catch (error:unknown) {
        if(error instanceof Error){
            res.status(500).send(error.message)
        }
    }
}

export const updateComments = async (req:Request,res:Response) =>{
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['content']
        const isMatched = updates.every((values) => allowedUpdates.includes(values))

        if(!isMatched){
            throw new Error('Invalid field')
        }

        const comment = await prisma.comment.findFirst({
            where : {
                id : req.params.commentId,
                postById : req.params.postId,
                authorById : req.user.id
            }
        })

        if(!comment){
            throw new Error('Comment not found')
        }

        const updateCommentsa = await prisma.comment.update({
            where : {
                id : comment.id
            },
            data : {
                ...req.body
            }
        })

        
        res.status(200).send(updateCommentsa)

    } catch (error:unknown) {
        if(error instanceof Error){
            res.status(500).send(error.message)
        }
    }
}

export const deleteComments = async (req:Request,res:Response) => {
    try {

        const comment = await prisma.comment.findFirst({
            where : {
                id : req.params.commentId,
                postById : req.params.postId,
                authorById : req.user.id
            }
        })

        if(!comment){
            throw new Error('Comment not found')
        }

        const deletedComment = await prisma.comment.delete({
            where : {
                id : comment.id
            }
        })

        res.status(200).send(deletedComment)
        
    } catch (error) {
        if(error instanceof Error){
            throw new Error(error.message)
        }
    }
}