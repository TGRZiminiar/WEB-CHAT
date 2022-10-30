import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken"
import { UserSignJWT } from "../Interface/user.interface";
require('dotenv').config()

export const authCheck = async(req:Request, res:Response, next:NextFunction)/*: Promise<NextFunction> */ => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(403).json("Access Denied.");
    }

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET as string,(err,user) => {
        
        if(err) {
            console.log('JWT ERROR =>',err)
            return res.status(403).send('TOKEN EXPIRES')
        }
        //@ts-ignore
        req.user = user as UserSignJWT;
        return next()
    })

    // if(!token)

}