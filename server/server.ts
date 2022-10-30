import express,{Application} from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fs from "fs"
const morgan = require('morgan')
const socket = require("socket.io");
dotenv.config();


const app:Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"))
fs.readdirSync("./Routes").map((r:any) => app.use(("/api"), require(`./Routes/${r}`)));

const PORT = process.env.PORT || 5000;

const start = () => {
    const server = app.listen(PORT, (async() => {
        console.log(`LISTENING ON PORT ${PORT}`);
        await mongoose.connect(process.env.DATABASE as string)
        .then(() => console.log("Connected To DB"))
        .catch((err) => console.log(`Server Error => ${err}`));
    }))

    const io = socket(server, {
        cors:{
            origin:"http://localhost:3000",
            credential:true,
        }
    })

    //@ts-ignore
    global.onlineUsers = new Map();
    io.on("connection", (socket:any) => {
        //@ts-ignore
        global.chatSocket = socket;
        //@ts-ignore
        socket.on("add-user", (userId:any) => {
        //@ts-ignore
        onlineUsers.set(userId, socket.id);
    });
    
    socket.on("send-msg", (data:any) => {
        //@ts-ignore
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    });})

}

start();
