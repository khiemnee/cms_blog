import { Request,Response } from "express"
import prisma from "../prisma/client"

export const getCategories = async (req:Request,res:Response) =>{
    try {
        const categories = await prisma.category.findMany()

        if(!categories){
            throw new Error('No data!!!')
        }

        res.status(200).send(categories)
    } catch (error:unknown) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
          }
    }

}

export const createCategories = async (req:Request,res:Response) => {
    try {
        const categories = await prisma.category.create({
            data : {
                ...req.body
            }
        })
        res.status(201).send(categories)
    } catch (error:unknown) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
          }
    }
}

export const  updateCategories = async (req:Request,res:Response) => {
    try {

        const updates = Object.keys(req.body)
        const allowedUpdate = ['name']

        const isMatched = updates.every((value) => allowedUpdate.includes(value))

        if(!isMatched){
            throw new Error('Invalid field to update!!!')
        }

        const categories = await prisma.category.findFirst({
            where : {
                id : req.params.id
            }
        })

        if(!categories){
            throw new Error('Category not found!!!')
        }

       const category = await prisma.category.update({
            data : {
                ...req.body
            },
            where : {
                id : categories.id
            }
        })

        res.status(200).send(category)

    } catch (error:unknown) {
            if(error instanceof Error){
                res.status(500).send(error.message)
            }
    }
}

export const deleteCategories = async (req:Request,res:Response) => {
    try {
        const categories = await prisma.category.findFirst({
            where : {
                id: req.params.id
            }
        })

        if(!categories){
            throw new Error('Categories not found!!!')
        }

        const cate = await prisma.category.delete({
            where : {
                id : categories.id
            }
        })

        res.status(200).send(cate)
    } catch (error) {
        if(error instanceof Error){
            res.status(500).send(error.message)
        }
    }
}