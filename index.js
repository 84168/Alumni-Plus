import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname } from "path";
import session from "express-session";
import mysql from "mysql2/promise";
import {createServer} from 'http';
// import {Server} from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 9000;

const server = http.createServer(app);
// const io = new Server(server);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080", // allow your frontend origin
    methods: ["GET", "POST"]
  }
});


// Database connection
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "alumni plus"
});

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route to get support details
app.get("/mysupportings/:id", async (req, res) => {
    const userId = req.params.id;
    const authUser = req.session.authUser;
    const userIs = authUser?.Role;
    console.log("user role in mysupportings : ", userIs);
    
    let mysupportReq = [];
    if (userIs === "alumni") {
        [mysupportReq] = await db.execute("SELECT * FROM support WHERE `alumni_id` = ? AND status = 'in_progress'", [userId]);
    } else {
        [mysupportReq] = await db.execute("SELECT * FROM support WHERE `student_id` = ? AND status = 'in_progress'", [userId]);
    }
    
    if (mysupportReq.length === 0) {
        return res.send("No active support requests found.");
    }

    const supportId = mysupportReq[0].id;
    const enrollment = mysupportReq[0].student_id;
    const Employee_ID = mysupportReq[0].faculty_id;

    const [studentData] = await db.execute("SELECT * FROM student WHERE `Enrollment_No` = ?", [enrollment]);
    // const [facultyData] = await db.execute("SELECT * FROM faculty WHERE `Employee_ID` = ? ", [Employee_ID]);
    
    // Get previous chat messages
    const [chatMessages] = await db.execute(
        "SELECT * FROM conversation WHERE support_id = ? ORDER BY created_at ASC",
        [supportId]
    );
    
    console.log("my supporting is : ", mysupportReq);
    res.render(path.join(__dirname, './views/alumni_supporting.ejs'), {
        mysupportReq,
        studentData,
        // facultyData,
        userId,
        userIs,
        chatMessages,
        supportId
    });
});

// Route to mark support as complete (faculty only)
app.post("/mark-complete/:supportId", async (req, res) => {
    const { supportId } = req.params;
    const authUser = req.session.authUser;
    
    if (authUser?.Role !== 'faculty') {
        return res.status(403).json({ error: "Only faculty can mark requests as complete" });
    }

    try {
        await db.execute("UPDATE support SET status = 'completed' WHERE id = ?", [supportId]);
        res.json({ success: true, message: "Request marked as complete" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update status" });
    }
});

// WebSocket handling
io.on("connection", (socket) => {
    console.log(`A new user connected: ${socket.id}`);

    // Join a specific support room
    socket.on("join-support", (supportId) => {
        socket.join(`support-${supportId}`);
        console.log(`Socket ${socket.id} joined support-${supportId}`);
    });

    // Handle incoming messages
    socket.on("user-message", async (data) => {
        const { supportId, senderId, senderRole, message, senderName } = data;
        
        try {
            // Save message to database
            await db.execute(
                "INSERT INTO conversation (support_id, sender_id, sender_role, message) VALUES (?, ?, ?, ?)",
                [supportId, senderId, senderRole, message]
            );

            // Get the inserted message with timestamp
            const [result] = await db.execute(
                "SELECT * FROM conversation WHERE support_id = ? ORDER BY created_at DESC LIMIT 1",
                [supportId]
            );

            const messageData = {
                id: result[0].id,
                supportId,
                senderId,
                senderRole,
                senderName,
                message,
                created_at: result[0].created_at
            };

            // Broadcast to all users in the support room
            io.to(`support-${supportId}`).emit("message", messageData);
            
            console.log(`Message from ${senderName} (${senderRole}): ${message}`);
        } catch (error) {
            console.error("Error saving message:", error);
            socket.emit("error", { message: "Failed to send message" });
        }
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(port, () => console.log(`Server is running at port ${port}`));