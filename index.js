import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname } from "path";
import session from "express-session";
import mysql from "mysql2/promise";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 9000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

// Database connection
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "", // Mac pe agar error aaye toh "root" try karna
    database: "alumni plus"
});
// const db = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Routes ---
app.get("/mysupportings/:id", async (req, res) => {
    const userId = req.params.id;
    const authUser = req.session.authUser;
    const userIs = authUser?.Role;
    
    try {
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
        const [studentData] = await db.execute("SELECT * FROM student WHERE `Enrollment_No` = ?", [enrollment]);
        const alumniId = mysupportReq[0].alumni_id;
        const [alumniData] = await db.execute("SELECT * FROM alumni WHERE ID = ?", [alumniId]);

        
        const [previousMessages] = await db.execute(
            "SELECT * FROM conversation WHERE support_id = ? ORDER BY created_at ASC",
            [supportId]
        );
        
        res.render('alumni_supporting', {
            mysupportReq,
            studentData,
            alumniData,
            userId,
            userIs,
            previousMessages,
            supportId,
            authUser
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
});

// --- WebSocket Handling (Fixed Brackets) ---
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join-support", (supportId) => {
        if (supportId) {
            socket.join(`support-${supportId}`);
            console.log(`Socket ${socket.id} joined room: support-${supportId}`);
        }
    });

    socket.on("user-message", async (data) => {
        const { supportId, senderId, senderRole, message, senderName } = data;
        console.log("Data arriving at server:", data);

        if (!message || !supportId) return;

        try {
            const [result] = await db.execute(
                "INSERT INTO conversation (support_id, sender_id, sender_role, message) VALUES (?, ?, ?, ?)",
                [supportId, senderId, senderRole, message]
            );

            const messageData = {
                id: result.insertId,
                supportId,
                senderId,
                senderRole,
                senderName,
                message,
                created_at: new Date()
            };

            io.to(`support-${supportId}`).emit("message", messageData);
        } catch (error) {
            console.error("DATABASE ERROR:", error.message);
        }
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected");
    });
});

server.listen(port, () => console.log(`Server is running at port ${port}`));