

export interface UserSignJWT{
    userName:string;
    userId:string;
}

export interface ResultSetAvatar{
    isSet:Boolean;
    image:String;
}

export interface GetContacts {
    avatarImage:string;
    email:string;
    userName:string;
    _id:string
}