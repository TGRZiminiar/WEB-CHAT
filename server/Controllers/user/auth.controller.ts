import { Request,Response } from "express"
import UserModel, { UserDocument } from "../../Models/user.model";
import jwt from "jsonwebtoken"
import { UserSignJWT } from "../../Interface/user.interface";
const bcrypt = require('bcrypt')
require('dotenv').config()

export const registerUser = async(req:Request, res:Response) => {

    try {
        const {userName,email, password} = req.body;

        const checkUserExist = await UserModel.findOne({userName:userName})
        .select("email")
        .lean();

        if(!checkUserExist){
            const passwordHash:string = bcrypt.hashSync(password,10);

            const user:UserDocument = await new UserModel({
                userName:userName,
                email:email,
                password:passwordHash,
            }).save();

            const userObj:UserSignJWT = {userName:user.userName, userId:user._id};
            const accessToken:string = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET as string,{expiresIn:"3d"});

            return res.status(200).json({"message":"Register Succesful","token":accessToken});

        } else return res.status(403).json("UserName Or Email Is Already Exist");



    } catch (error) {
        console.log("Register Error => ",error);
        return res.status(400).json("Something Went Wronge");
    }

}

export const loginUser = async(req:Request, res:Response) => {
    try {
        
        const {email,password} = req.body;

        const checkUserExist:UserDocument = await UserModel.findOne({email:email})
        .select("email userName password")
        .lean();

        if(checkUserExist){
            const checkPassword:Boolean = bcrypt.compareSync(password,checkUserExist.password);

            if(checkPassword){
                const userObj:UserSignJWT = {userName:checkUserExist.userName, userId:checkUserExist._id};
                const accessToken:string = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET as string,{expiresIn:"3d"});
                return res.status(200).json({"message":"Login Succesful","token":accessToken})
            }

            else {
                return res.status(400).json("Try Again Please")
            }
        }

    } catch (error) {
        console.log("Login Error => ",error);
        return res.status(400).json("Something Went Wronge");
    }
}

export const CurrentUser = async(req:Request, res:Response) => {
    try {
        //@ts-ignore
        const { userId } = req.user;
        const user:UserDocument = await UserModel.findById({_id:userId})
        .select('email userName')
        .lean() 
        console.log(`THIS IS USER ID ${userId}`);
        return res.status(200).json({user})
        
    } catch (error) {
        console.log("Current User Error =>",error);
        return res.status(400).json("Something Went Wronge");
    }
}



