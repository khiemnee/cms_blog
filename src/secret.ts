import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT
export const SECERT_KEY = process.env.SECRET_KEY
export const REDIS_USERNAME = process.env.REDIS_USERNAME
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD
export const REDIS_HOST = process.env.REDIS_HOST
export const REDIS_PORT = process.env.REDIS_PORT