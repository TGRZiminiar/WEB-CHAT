import { Request,Response } from "express"
import UserModel from "../../Models/user.model";
import { GetContacts, ResultSetAvatar } from "../../Interface/user.interface"

export const setAvatar = async(req:Request, res:Response) => {
    try {
        
        //@ts-ignore
        const { userId } = req.user;
        console.log("THIS IS USER ID =>",userId);
        const { avatarImage } = req.body;
        
        const userData = await UserModel.findByIdAndUpdate({_id:userId},{
            "isAvatarImageSet":true,
            "avatarImage":avatarImage,
        },{new:true});

        if(!userData){
            return res.status(400).json({"message":"Something Went Wronge"});
        }
        else {

            const resultSetAvatar:ResultSetAvatar = {
                isSet:userData.isAvatarImageSet,
                image:userData.avatarImage,
            }

            return res.status(200).json(resultSetAvatar);
        }


    } catch (error) {
        console.log("SET AVATAR ERROR =>",error);
        return res.status(400).json(error);
    }
}

export const getNeUser = async(req:Request, res:Response) => {
    try {
        
        //@ts-ignore
        const { userId } = req.user;
        
        const userData:GetContacts[] = await UserModel.find({_id:{"$ne":userId}})
        .select("email userName _id avatarImage")
        .lean();
        
        return res.status(200).json({"userData":userData});
        
    } catch (error) {
        console.log("GET USER ERROR => ",error);
        return res.status(400).json(error);
    }
}