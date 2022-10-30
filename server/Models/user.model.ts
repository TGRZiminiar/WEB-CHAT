import mongoose from "mongoose";


export interface UserDocument extends mongoose.Document{
    userName:string,
    email:string,
    password:string,
    isAvatarImageSet:Boolean,
    avatarImage:string,
}

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true,
        min:3,
        max:50,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        max:50,
    },
    password:{
        type:String,
        require:true,
        min:6,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: "",
    },
})


const UserModel = mongoose.model<UserDocument>("User",userSchema);

export default UserModel;