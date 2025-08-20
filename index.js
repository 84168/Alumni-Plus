import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 9000;

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname , "public")));


io.on("connection" , (socket)=>{
    console.log(`a new user is connected ${socket.id}`);

    socket.on("user-message" , (message) =>{
       // console.log("A new user message", message);
       
       io.emit("message" , message); // server sended to connected socket 
    });
});


app.get(`/chat_box` , (req,res)=>{

    res.sendFile(path.join(__dirname, "public", "chat_box.html"));
})

server.listen(port,()=> console.log(`server is running at port ${port}`));