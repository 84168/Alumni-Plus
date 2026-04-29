import session from 'express-session';
import mysql from 'mysql2/promise';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';
import multer from 'multer';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import paymentRoutes from './routes/payment.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 8080;

// IMPORTANT: Create server from app, attach Socket.IO to it
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", 'ejs');
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(session({
    secret: 'Tarun*123',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Payment routes
app.use('/api', paymentRoutes);
app.use('/payment', paymentRoutes);

const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    connectTimeout: 30000,
    ssl: { rejectUnauthorized: false }
});

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "csealumniplus1952@gmail.com",
        pass: process.env.EMAIL_PASS
    }
});

const otpStore = {};

function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) return next();
    return res.redirect("/");
}

const globalChatUsers = new Map();
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
 
    // ── Support desk (your existing logic — unchanged) ────────
    socket.on("join-support", (supportId) => {
        if (supportId) {
            socket.join(`support-${supportId}`);
            console.log(`Socket ${socket.id} joined support room: support-${supportId}`);
        }
    });
 
    socket.on("user-message", async (data) => {
        const { supportId, senderId, senderRole, message, senderName } = data;
        if (!message || !supportId) return;
        try {
            const [result] = await db.execute(
                "INSERT INTO conversation (support_id, sender_id, sender_role, message) VALUES (?, ?, ?, ?)",
                [supportId, senderId, senderRole, message]
            );
            io.to(`support-${supportId}`).emit("message", {
                id: result.insertId,
                supportId, senderId, senderRole, senderName,
                message,
                created_at: new Date()
            });
        } catch (error) {
            console.error("DB ERROR (support chat):", error.message);
        }
    });
 
    // Global chat 
    socket.on("join-global-chat", async ({ userId, userName, userRole }) => {
        socket.join("global-chat");
 
        // Store user for online count
        globalChatUsers.set(socket.id, { userId, userName, userRole });
        io.to("global-chat").emit("online-count", globalChatUsers.size);
 
        // Send last 80 messages as history
        try {
            const [rows] = await db.execute(
                `SELECT id, sender_id AS senderId, sender_name AS senderName,
                        sender_role AS senderRole, message, created_at
                 FROM global_chat
                 ORDER BY created_at DESC
                 LIMIT 80`
            );
            // Reverse so oldest is first
            socket.emit("chat-history", rows.reverse());
        } catch (err) {
            console.error("DB ERROR (chat history):", err.message);
            socket.emit("chat-history", []);
        }
    });
 
    socket.on("global-message", async ({ userId, userName, userRole, message }) => {
        if (!message || !message.trim()) return;
        const text = message.trim().slice(0, 500); // hard cap
        const now  = new Date();
 
        try {
            const [result] = await db.execute(
                "INSERT INTO global_chat (sender_id, sender_name, sender_role, message) VALUES (?, ?, ?, ?)",
                [userId, userName, userRole, text]
            );
            io.to("global-chat").emit("global-message", {
                id:         result.insertId,
                senderId:   userId,
                senderName: userName,
                senderRole: userRole,
                message:    text,
                created_at: now
            });
        } catch (err) {
            console.error("DB ERROR (global chat insert):", err.message);
        }
    });
 
    socket.on("global-typing", ({ userId, userName, isTyping }) => {
        // Broadcast to everyone in the room EXCEPT the sender
        socket.to("global-chat").emit("global-typing", { userId, userName, isTyping });
    });
 
    socket.on("disconnect", () => {
        if (globalChatUsers.has(socket.id)) {
            globalChatUsers.delete(socket.id);
            io.to("global-chat").emit("online-count", globalChatUsers.size);
        }
        console.log("User Disconnected:", socket.id);
    });
});


// HOME
app.get("/", async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM alumni LIMIT 4");
        const [rows1] = await db.execute("SELECT * FROM `job and internship` LIMIT 3");
        const [announcement] = await db.execute("SELECT * FROM announcement");
        const [mentorshipSession] = await db.execute("SELECT * FROM mentorship_session WHERE Status = 'Scheduled'");

        const authUser = req.session.authUser || null;
        if (req.session.authUser) {
            req.session.userType = authUser.Role || null;
            req.session.Enrollment = authUser.Enrollment || null;
        }
        res.render(path.join(__dirname, './views/home.ejs'), { rows, rows1, authUser, announcement, mentorshipSession });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to load home');
    }
});

// SEND OTP
app.post("/send-otp", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[email] = { code: otp, expiresAt: Date.now() + 5 * 60 * 1000 };

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your Alumni Portal OTP Code",
            text: `Your OTP is ${otp}. It will expire in 5 minutes.`
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: "OTP sent to your email" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ message: "Failed to send OTP" });
    }
});

// VERIFY OTP
app.post("/verify-otp", (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

    const record = otpStore[email];
    if (!record) return res.status(400).json({ message: "No OTP found for this email" });
    if (Date.now() > record.expiresAt) {
        delete otpStore[email];
        return res.status(400).json({ message: "OTP expired" });
    }
    if (record.code !== otp) return res.status(400).json({ message: "Invalid OTP" });

    delete otpStore[email];
    res.json({ message: "Email verified successfully!" });
});

app.get("/email_varification", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/verifi.html"));
});

// JOB READ
app.get("/job_read", async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM `job and internship`");
        const userType = req.session.userType;
        res.render(path.join(__dirname, './views/job_read.ejs'), { rows, userType });
    } catch (err) {
        console.error(err);
        res.status(500).send("Database query failed");
    }
});

// ALUMNI READ
app.get("/alumni_read", async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM alumni LIMIT 10");
        res.render(path.join(__dirname, './views/alumni_read.ejs'), { rows });
    } catch (err) {
        console.error(err);
        res.status(500).send("Alumni Data Access Error");
    }
});

app.post("/alumni_search", async (req, res) => {
    const { Name, Batch } = req.body;
    if (!Name && !Batch) return res.redirect("/alumni_read.ejs");
    try {
        let query = "";
        let params = [];
        if (Name && Batch) { query = "SELECT * FROM alumni WHERE Full_Name = ? AND Batch = ?"; params = [Name, Batch]; }
        else if (Name) { query = "SELECT * FROM alumni WHERE Full_Name = ?"; params = [Name]; }
        else { query = "SELECT * FROM alumni WHERE Batch = ?"; params = [Batch]; }

        const [rows] = await db.execute(query, params);
        res.render(path.join(__dirname, "./views/alumni_read"), { rows });
    } catch (err) {
        console.error(err);
        res.status(500).send("No data traced");
    }
});

// JOB POST
app.post("/job_post", async (req, res) => {
    const { Title, Type, Location, Duration, Description, Requirement, Benefits, Deadline, Form_Link } = req.body;
    try {
        await db.execute(
            "INSERT INTO `job and internship` (Title, Type, Location, Duration, Description, Requirement, Benefits, Deadline, Form_Link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [Title, Type, Location, Duration, Description, Requirement, Benefits, Deadline, Form_Link]
        );
        res.redirect("/job_read");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to insert job post");
    }
});

// REGISTRATION
// app.post("/user_data", upload.single('User_ID'), async (req, res) => {
//     const { Full_Name, Enrollment_No, Contact_no, Email_ID, Course, role, Batch, Password } = req.body;
//     const User_ID_Path = req.file ? req.file.path : null;
//     try {
//         await db.execute(
//             "INSERT INTO user (Full_Name, Enrollment_No, Contact_No, Email_ID, Course, Role, Batch, Password, User_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
//             [Full_Name, Enrollment_No, Contact_no, Email_ID, Course, role, Batch, Password, User_ID_Path]
//         );
//         res.redirect("/?message=After verifying your details, we'll send an invite to your registered email. Thank you!");
//     } catch (err) {
//         console.error("Database Error:", err);
//         res.status(500).send("Registration failed.");
//     }
// });
app.post("/user_data", upload.single('User_ID'), async (req, res) => {
    const { Full_Name, Enrollment_No, Contact_no, Email_ID, Course, role, Batch, Password } = req.body;
    const User_ID_Path = req.file ? req.file.path : null;
    
    try {
        // Check if email already exists
        const [existing] = await db.execute(
            "SELECT ID FROM user WHERE Email_ID = ?", [Email_ID]
        );
        
        if (existing.length > 0) {
            return res.redirect("/register?error=Email+already+registered.+Please+use+a+different+email.");
        }

        await db.execute(
            "INSERT INTO user (Full_Name, Enrollment_No, Contact_No, Email_ID, Course, Role, Batch, Password, User_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [Full_Name, Enrollment_No, Contact_no, Email_ID, Course, role, Batch, Password, User_ID_Path]
        );
        
        res.redirect("/?message=After verifying your details, we'll send an invite to your registered email. Thank you!");
        
    } catch (err) {
        console.error("Database Error:", err);
        
        // Handle duplicate entry error
        if (err.code === 'ER_DUP_ENTRY') {
            return res.redirect("/register?error=Email+or+contact+number+already+registered.");
        }
        
        return res.redirect("/register?error=Registration+failed.+Please+try+again.");
    }
});

app.get("/register", (req, res) => {
    const error = req.query.error || null;
    res.render("register", { error });
});

// LOGIN
app.post("/login_check", async (req, res) => {
    let { role, Email_ID, Enrollment, Employee_ID, Password } = req.body;
    try {
        let rows;
        if (role == "student") {
            [rows] = await db.execute("SELECT * FROM student WHERE Enrollment_No = ? AND Password = ?", [Enrollment, Password]);
        } else if (role == "alumni") {
            [rows] = await db.execute("SELECT * FROM alumni WHERE Email_ID = ? AND Password = ?", [Email_ID, Password]);
        } else if (role == "faculty") {
            [rows] = await db.execute("SELECT * FROM faculty WHERE Employee_ID = ? AND Password = ?", [Employee_ID, Password]);
            if (rows[0]?.Email_ID == "csealumniplus1952@gmail.com") role = "admin";
        } else {
            return res.status(400).send("Invalid role specified.");
        }

        if (!rows || rows.length === 0) return res.redirect("/login.html?error=Invalid credentials");

        req.session.authUser = {
            Enrollment: rows[0].Enrollment_No || '',
            Employee_ID: rows[0].Employee_ID || '',
            Alumni_ID: rows[0].ID || '',
            Full_Name: rows[0].Full_Name,
            Email_ID: rows[0].Email_ID,
            Contact_no: rows[0].Contact_no,
            Batch: rows[0].Batch,
            Role: role,
            Bio: rows[0].Bio || "Not Updated",
            Mentorship: rows[0].Mentorship || 0,
            Image: rows[0].Image
        };

        if (req.session.authUser.Role == "admin") {
            await renderAdminPage(req, res);
        } else {
            res.redirect("/");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error in login");
    }
});

// MARK COMPLETE
app.post('/mark-complete/:id', async (req, res) => {
    const supportId = req.params.id;
    try {
        const [supportRows] = await db.execute("SELECT alumni_id, student_id FROM support WHERE id = ?", [supportId]);
        if (supportRows.length === 0) return res.json({ success: false, error: 'Support request not found' });

        const { alumni_id } = supportRows[0];
        await db.execute("UPDATE support SET status = 'fulfilled', `No of Needs` = 0 WHERE id = ?", [supportId]);
        if (alumni_id) {
            await db.execute("UPDATE alumni SET needs_supported = 0 WHERE id = ?", [alumni_id]);
        }
        return res.json({ success: true });
    } catch (error) {
        console.error('Mark complete error:', error);
        return res.json({ success: false, error: error.message });
    }
});

// EXIT FORM
app.get("/exitForm/:enrollment", async (req, res) => {
    const Enrollment = req.params.enrollment;
    const [rows] = await db.execute("SELECT exit_form FROM student WHERE Enrollment_No = ?", [Enrollment]);
    const exitFormStatus = rows[0].exit_form;
    res.render(path.join(__dirname, "./views/exit_form.ejs"), { exitFormStatus });
});

app.post("/exit_form_submission", async (req, res) => {
    try {
        const nullIfUndefined = (value) => value === undefined || value === '' ? null : value;
        const { fullName, university_rollno, email, phone, date_of_birth, gender, permanent_address, current_address, branch, year_of_education, cgpa, backlog, honors_minor_specialization, project_thesis_title, internship_completed, company_name, job_role, ctc_offered, joining_date, location_of_posting, offer_letter_upload, future_course_name, future_university_name, future_country, admission_status, entrepreneurship_plans, govt_exam_prep, other_plans, rate_institution, experience, suggestions, alumni_network, alumni_consent, data_consent, digital_signature, date_of_submission } = req.body;

        const query = `INSERT INTO exit_form (full_name, university_rollno, email, phone, date_of_birth, gender, permanent_address, current_address, branch, year_of_education, cgpa, backlog, honors_minor_specialization, project_thesis_title, internship_completed, company_name, job_role, ctc_offered, joining_date, location_of_posting, offer_letter_upload, future_course_name, future_university_name, future_country, admission_status, entrepreneurship_plans, govt_exam_prep, other_plans, rate_institution, experience, suggestions, alumni_network, alumni_consent, data_consent, digital_signature, date_of_submission) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [fullName, university_rollno, email, phone, date_of_birth, gender, permanent_address, nullIfUndefined(current_address), branch, year_of_education, cgpa, nullIfUndefined(backlog) || 0, nullIfUndefined(honors_minor_specialization), nullIfUndefined(project_thesis_title), nullIfUndefined(internship_completed), nullIfUndefined(company_name), nullIfUndefined(job_role), nullIfUndefined(ctc_offered), nullIfUndefined(joining_date), nullIfUndefined(location_of_posting), nullIfUndefined(offer_letter_upload), nullIfUndefined(future_course_name), nullIfUndefined(future_university_name), nullIfUndefined(future_country), nullIfUndefined(admission_status), nullIfUndefined(entrepreneurship_plans), nullIfUndefined(govt_exam_prep), nullIfUndefined(other_plans), rate_institution, nullIfUndefined(experience), nullIfUndefined(suggestions), alumni_network || 0, alumni_consent ? 1 : 0, data_consent ? 1 : 0, digital_signature, date_of_submission];

        await db.execute(query, values);
        await db.execute("UPDATE student SET exit_form = 1 WHERE Enrollment_No = ?", [university_rollno]);
        res.status(200).json({ success: true, message: 'Exit form submitted successfully' });
    } catch (error) {
        console.error('Error submitting exit form:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// SUPPORT DESK
app.get('/support_desk', async (req, res) => {
    const [pendingSupport] = await db.execute("SELECT * FROM support WHERE Status = 'pending'");
    const [verifiedSupport] = await db.execute("SELECT support.*, faculty.* FROM support JOIN faculty ON support.faculty_id = faculty.Employee_ID WHERE support.status = 'verified'");
    const authUser = req.session.authUser;
    const message = req.query.message || '';
    const userID = authUser?.Enrollment || authUser?.Alumni_ID || authUser?.Employee_ID || '';
    const userIs = authUser?.Role;
    let isSupported = '';

    if (userIs == "alumni" && userID) {
        const [rows] = await db.execute("SELECT needs_supported FROM alumni WHERE ID = ?", [userID]);
        isSupported = rows[0]?.needs_supported;
    } else if (userIs == "student" && userID) {
        const [rows] = await db.execute("SELECT `No of Needs` FROM support WHERE student_id = ?", [userID]);
        isSupported = rows[0]?.["No of Needs"];
    }

    res.render(path.join(__dirname, "./views/support_desk.ejs"), { verifiedSupport, pendingSupport, userID, userIs, message, isSupported,query: req.query });
});

app.get("/myAssignedSupport/:userID/:supportID", async (req, res) => {
    const userId = req.params.userID;
    const supportID = req.params.supportID;
    const authUser = req.session.authUser;
    const userID = authUser?.Enrollment || authUser?.Alumni_ID || '';

    const [row] = await db.execute("SELECT needs_supported FROM alumni WHERE ID = ?", [userId]);

    if (row[0].needs_supported == 0) {
        await db.execute("UPDATE support SET status = 'in_progress', alumni_id = ? WHERE id = ?", [userID, supportID]);
        await db.execute("UPDATE alumni SET needs_supported = 1 WHERE ID = ?", [userId]);
        res.redirect("/support_desk?message=Support assigned successfully!");
    } else {
        res.redirect("/support_desk?message=You are already supporting a request. Complete it first.");
    }
});

// MY SUPPORTINGS - Chat page
app.get("/mysupportings/:id", async (req, res) => {
    const userId = req.params.id;
    const authUser = req.session.authUser;
    const userIs = authUser?.Role;
    console.log("user role in mysupportings:", userIs);

    let mysupportReq = [];
    if (userIs === "alumni") {
        [mysupportReq] = await db.execute("SELECT * FROM support WHERE alumni_id = ? AND status = 'in_progress'", [userId]);
    } else {
        [mysupportReq] = await db.execute("SELECT * FROM support WHERE student_id = ? AND status = 'in_progress'", [userId]);
    }

    if (mysupportReq.length === 0) {
        return res.sendFile(path.join(__dirname, './public/no_support.html'));
    }

    const supportId = mysupportReq[0].id;
    const enrollment = mysupportReq[0].student_id;
    const alumniId = mysupportReq[0].alumni_id;

    const [studentData] = await db.execute("SELECT * FROM student WHERE Enrollment_No = ?", [enrollment]);
    const [alumniData] = await db.execute("SELECT * FROM alumni WHERE ID = ?", [alumniId]);
    const [previousMessages] = await db.execute(
        "SELECT * FROM conversation WHERE support_id = ? ORDER BY created_at ASC",
        [supportId]
    );

    res.render(path.join(__dirname, './views/alumni_supporting.ejs'), {
        mysupportReq,
        studentData,
        alumniData,
        userId,
        userIs,
        previousMessages,
        supportId,
        authUser
    });
});
// SUPPORT REQUEST
// app.post("/support_request", upload.single('ID_Proof'), async (req, res) => {
//     const { Enrollment_No, Request_Title, Request_Description } = req.body;
//     try {
//         const [rows] = await db.execute("SELECT `No of Needs` FROM support WHERE student_id = ?", [Enrollment_No]);
//         console.log(rows);
//         if (rows[0]['No of Needs'] === 0) {
//             await db.execute("INSERT INTO support (title, description, student_id, `No of Needs`) VALUES (?, ?, ?, ?)",
//                 [Request_Title, Request_Description, Enrollment_No, 1]);
//             res.redirect("/support_desk?message=Support request submitted successfully");
//         } else {
//             res.redirect("/support_desk?message=You can only submit one support request at a time");
//         }
//     } catch (err) {
//         console.error(err);
//     }
// });
app.post("/support_request", upload.single('ID_Proof'), async (req, res) => {
    const { Enrollment_No, Request_Title, Request_Description } = req.body;

    try {
        // Check if student already has a pending request
        const [rows] = await db.execute(
            "SELECT `No of Needs` FROM support WHERE student_id = ? AND status = 'pending'",
            [Enrollment_No]
        );

        // Get student email
        const [studentRows] = await db.execute(
            "SELECT Email_ID FROM student WHERE Enrollment_No = ?",
            [Enrollment_No]
        );

        if (!studentRows.length) {
            return res.redirect("/support_desk?error=Student not found");
        }

        const studentEmail = studentRows[0].Email_ID;

        // If rows is empty → no pending request → allow submission
        if (rows.length === 0) {
            await db.execute(
                "INSERT INTO support (title, description, student_id, student_email, `No of Needs`) VALUES (?, ?, ?, ?, ?)",
                [Request_Title, Request_Description, Enrollment_No, studentEmail, 1]
            );
            return res.redirect("/support_desk?message=Support request submitted successfully");
        } else {
            // Already has a pending request
            return res.redirect("/support_desk?message=You already have a pending request. Wait for it to be resolved first.");
        }

    } catch (err) {
        console.error(err);
        res.redirect(`/support_desk?error=${encodeURIComponent(err.sqlMessage || err.message)}`);
    }
});
// UPDATE PROFILE
app.post('/update_profile', upload.single('Profile_Image'), async (req, res) => {
    const { Contact_no, Bio, Email_ID, Role } = req.body;
    const Mentorship = req.body.Mentorship ? 1 : 0;
    let profileImageName = req.file ? req.file.filename : null;

    if (!Email_ID || !Role) return res.status(400).send("<script>alert('User identification failed.'); window.history.back();</script>");

    const isAlumni = Role.toLowerCase() === 'alumni';
    const tableName = isAlumni ? 'alumni' : 'student';

    try {
        let updateFields = ["Contact_no = ?", "Bio = ?"];
        let params = [Contact_no || null, Bio || null];

        if (isAlumni) { updateFields.push("Mentorship = ?"); params.push(Mentorship); }
        if (profileImageName) { updateFields.push("Image = ?"); params.push(profileImageName); }

        const query = `UPDATE ${tableName} SET ${updateFields.join(', ')} WHERE Email_ID = ?`;
        params.push(Email_ID);

        const [result] = await db.execute(query, params);
        if (result.affectedRows > 0) {
            res.send("<script>alert('Profile updated successfully!'); window.location.href='/';</script>");
        } else {
            res.send("<script>alert('Profile saved (no changes detected).'); window.location.href='/';</script>");
        }
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("<script>alert('Error updating profile.'); window.history.back();</script>");
    }
});

// CONTRIBUTIONS
app.post('/contribution', async (req, res) => {
    try {
        const { Alumni_ID, Amount, Is_Anonymous } = req.body;
        console.log('______');
        console.log(Is_Anonymous);
        const isAnonymous = Is_Anonymous === '1' ? 1 : 0;
        console.log(Alumni_ID);
        console.log(isAnonymous);


        await db.execute(
            `INSERT INTO contributions (Alumni_ID, Amount, Is_Anonymous, Status, Created_At)
             VALUES (?, ?, ?, 'pending', NOW())`,
            [Alumni_ID, Number(Amount), isAnonymous]
        );

        res.redirect('https://razorpay.me/@shivansh6174');
    } catch (err) {
        console.error('Contribution error:', err);
        res.redirect('/');
    }

});

// VERIFY CONTRUBUTIONS
app.post('/verify_contribution', async (req,res) =>{
    try {
        const { contribution_id } = req.body;
        await db.execute(
            `UPDATE contributions SET Status = 'verified' WHERE id = ?`,
            [contribution_id]
        );
        await renderAdminPage(req,res);
    } catch (err) {
        console.error('Verify contribution error:', err);
        await renderAdminPage(req,res);
    }
})

// MENTORSHIP
app.post('/mentorship_request', async (req, res) => {
    const [mentorshipSessions] = await db.execute("SELECT * FROM mentorship_session WHERE Status = 'Scheduled'");
    const { Enrollment_No, mentorshipCategories, reason, mode, consent } = req.body;
    const authUser = req.session.authUser;
    const userID = authUser?.Enrollment || authUser?.Alumni_ID || '';
    const userIs = authUser?.Role;

    try {
        await db.execute(
            "INSERT INTO mentorship_requests (Enrollment_No, Mentorship_Categories, Reason, Mode, consent) VALUES (?, ?, ?, ?, ?)",
            [Enrollment_No, mentorshipCategories, reason, mode, consent === 'on' ? 1 : 0]
        );
        res.render(path.join(__dirname, './views/mentorship_page.ejs'), { mentorshipSessions, userID, userIs });
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
});

app.get("/mentorshipSessionPage", async (req, res) => {
    const [mentorshipSessions] = await db.execute("SELECT * FROM mentorship_session WHERE Status = 'Scheduled'");
    const authUser = req.session.authUser;
    const userID = authUser?.Enrollment || authUser?.Alumni_ID || '';
    const userIs = authUser?.Role;
    res.render(path.join(__dirname, './views/mentorship_page.ejs'), { mentorshipSessions, userID, userIs });
});

app.get("/alumniSessionRequest", async (req, res) => {
    const authUser = req.session.authUser;
    const message = req.session.alertMessage || "";
    req.session.alertMessage = "";
    const userID = authUser?.Alumni_ID;
    const [sessionReq] = await db.execute("SELECT * FROM mentorship_session WHERE Alumni_ID = ? AND Status = 'Pending'", [userID]);
    res.render(path.join(__dirname, './views/mentorshipReqtoalumni.ejs'), { sessionReq, alertMessage: message });
});

app.get("/acceptMentorshipRequest/:sessionID", async (req, res) => {
    await db.execute("UPDATE mentorship_session SET Status = 'Accepted' WHERE Session_ID = ?", [req.params.sessionID]);
    req.session.alertMessage = "✅ Mentorship request accepted successfully!";
    res.redirect("/alumniSessionRequest");
});

app.get("/rejectMentorshipRequest/:sessionID", async (req, res) => {
    await db.execute("UPDATE mentorship_session SET Status = 'Rejected' WHERE Session_ID = ?", [req.params.sessionID]);
    req.session.alertMessage = "❌ Mentorship request rejected";
    res.redirect("/alumniSessionRequest");
});

app.get("/scheduleAlumniMentorReq/:sessionID", async (req, res) => {
    await db.execute("UPDATE mentorship_session SET Status = 'Scheduled' WHERE Session_ID = ?", [req.params.sessionID]);
    await renderAdminPage(req, res);
});

// LOGOUT
app.post('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        if (err) return next(err);
        res.clearCookie('connect.sid');
        return res.redirect('/');
    });
});



app.post("/HandleSupportRequest", async (req, res) => {
    const { Employee_ID, Enrollment_No, action } = req.body;
    try {
        if (action === "approve") {
            const verifiedAt = new Date();
            await db.execute("UPDATE support SET Status = 'verified', faculty_id = ?, verified_at = ? WHERE student_id = ?", [Employee_ID, verifiedAt, Enrollment_No]);
            await db.execute("UPDATE faculty SET Assigned = 1 WHERE Employee_ID = ?", [Employee_ID]);
        } else if (action === "reject") {
            await db.execute("UPDATE support SET Status = 'rejected' WHERE student_id = ?", [Enrollment_No]);
        }
        await renderAdminPage(req, res);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error handling support request.");
    }
});

app.post("/HandleUserRequest", async (req, res) => {
    const { ID, action } = req.body;
    if (!ID || !action) return res.status(400).send("Missing required fields.");
    
    try {
        const [rows] = await db.execute("SELECT * FROM user WHERE ID = ?", [ID]);
        if (rows.length === 0) return res.status(404).send("User not found.");
        const user = rows[0];

        if (action === "approve") {
            await db.execute("UPDATE user SET Status = 'Verified' WHERE ID = ?", [ID]);
            
            if (user.Role === "Student") {
                await db.execute(
                    "INSERT INTO student (Enrollment_No, Full_Name, Course, Contact_No, Email_ID, Batch, Password, Bio, Image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [user.Enrollment_No, user.Full_Name, user.Course, user.Contact_No, user.Email_ID, user.Batch, user.Password, '', '']
                );
            } else if (user.Role === "Alumni") {
                await db.execute(
                    "INSERT INTO alumni (Full_Name, Contact_No, Course, Email_ID, Batch, Password, Bio, Image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    [user.Full_Name, user.Contact_No, user.Course, user.Email_ID, user.Batch, user.Password, '', '']
                );
            }

            // ✅ Email in separate try-catch — won't block page render
            try {
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: user.Email_ID,
                    subject: "Application Approved - Welcome to Alumni Plus",
                    html: `<p>Dear ${user.Full_Name}, your application as <strong>${user.Role}</strong> has been approved. You can now log in.</p>`
                });
                console.log("✅ Email sent to:", user.Email_ID);
            } catch (emailErr) {
                console.error("❌ Email failed:", emailErr.message);
            }

        } else if (action === "reject") {
            await db.execute("UPDATE user SET Status = 'Rejected' WHERE ID = ?", [ID]);
        }

        // ✅ Always runs regardless of email success/failure
        await renderAdminPage(req, res);

    } catch (err) {
        console.error("HandleUserRequest error:", err);
        res.status(500).send("Error handling user request.");
    }
});

app.post("/schedule-session", async (req, res) => {
    const { sessionTitle, Alumni, Alumni_ID, Description, Date, Duration, mode, meetingLink, venue, targetAudience, registrationDeadline } = req.body;
    try {
        await db.execute(
            "INSERT INTO mentorship_session (Alumni, Alumni_ID, Session_Date, Duration, Mode, Topic, Description, Target_Audience, Registration_Deadline, Meeting_Link, Venue) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [Alumni, Alumni_ID, Date, Duration, mode, sessionTitle, Description, targetAudience, registrationDeadline, meetingLink, venue]
        );
        res.redirect("/admin");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error scheduling session");
    }
});

app.post("/schedule-session/delete/:id", async (req, res) => {
    try {
        await db.execute("DELETE FROM mentorship_session WHERE Session_ID = ?", [req.params.id]);
        await renderAdminPage(req, res);
    } catch (err) {
        console.error(err);
    }
});

app.post("/announcement", upload.single('Attachment_Url'), async (req, res) => {
    const { Title, Description, Important_Links, Posted_On, Visibility } = req.body;
    const filePath = req.file.path;
    try {
        await db.execute("INSERT INTO announcement (Title, Description, Important_Links, Posted_On, Attachment_Url, Visibility) VALUES (?,?,?,?,?,?)",
            [Title, Description, Important_Links, Posted_On, filePath, Visibility]);
        res.redirect("/admin");
    } catch (err) {
        console.error(err);
    }
});

app.post("/announcement/update/:idx", upload.single('Attachment_Url'), async (req, res) => {
    const id = req.params.idx;
    const { Title, Description, Posted_On, Visibility, Important_Links } = req.body;
    try {
        await db.execute("UPDATE announcement SET Title = ?, Description = ?, Posted_On = ?, Visibility = ?, Important_Links = ? WHERE ID = ?",
            [Title, Description, Posted_On, Visibility, Important_Links, id]);
        await renderAdminPage(req, res);
    } catch (err) {
        console.error(err);
    }
});

app.post("/announcement/delete/:id", async (req, res) => {
    try {
        await db.execute("DELETE FROM announcement WHERE ID = ?", [req.params.id]);
        await renderAdminPage(req, res);
    } catch (error) {
        res.status(500).send("Error deleting announcement.");
    }
});

app.get("/admin", async (req, res) => {
    await renderAdminPage(req, res);
});

app.post("/delete/:id", async (req, res) => {
    await db.execute('DELETE FROM `job and internship` WHERE ID = ?', [req.params.id]);
    res.redirect("/job_read");
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Change to Alumni
app.post("/admin/batch-convert-to-alumni", async (req, res) => {
  const { students } = req.body;
  if (!students || students.length === 0)
    return res.status(400).json({ success: false, message: "No students provided." });

  try {
    for (const s of students) {
      await db.execute(
        `INSERT INTO alumni (Full_Name, Contact_No, Course, Email_ID, Batch, Password)
         SELECT Full_Name, Contact_no, Course, Email_ID, Batch, Password
         FROM student WHERE Enrollment_No = ?`,
        [s.Enrollment_No]
      );
      await db.execute(
        "UPDATE student SET converted_to_alumni = 1 WHERE Enrollment_No = ?",
        [s.Enrollment_No]
      );
    }
    
    res.json({ success: true });
  } catch (err) {
    console.error("Batch convert error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/admin/students-by-batch/:batch", async (req, res) => {
  const [rows] = await db.execute(
    "SELECT Enrollment_No, Full_Name, Email_ID FROM student WHERE Batch = ? AND converted_to_alumni = 0",
    [req.params.batch]
  );
  res.json(rows);
});

app.get("/admin/students-by-batch/:batch", async (req, res) => {
  const [rows] = await db.execute(
    "SELECT Enrollment_No, Full_Name, Email_ID FROM student WHERE Batch = ?",
    [req.params.batch]
  );
  res.json(rows);
});

app.get('/me', (req, res) => {
    const u = req.session.authUser;
    if (!u) return res.json(null);
    res.json({
        id:   u.Enrollment || u.Alumni_ID || u.Employee_ID || '',
        name: u.Full_Name,
        role: u.Role   // 'student' | 'alumni' | 'faculty' | 'admin'
    });
});
 
async function renderAdminPage(req, res) {
    try {
        const [mentorshipSessions] = await db.execute("SELECT * FROM mentorship_session");
        const [announcement] = await db.execute("SELECT * FROM announcement");
        const [countUserVerification] = await db.execute("SELECT COUNT(*) AS Pending_User_Count FROM user WHERE Status = 'Pending'");
        const [countSupport] = await db.execute("SELECT COUNT(*) AS pending_count FROM support WHERE Status = 'pending'");
        const [countMentorshipReq] = await db.execute("SELECT COUNT(*) AS pendingMentorship_count FROM mentorship_requests WHERE status = 'Pending'");
        const [row1] = await db.execute("SELECT * FROM user WHERE Status = 'Pending'");
        const [rows] = await db.execute("SELECT s.*, sr.* FROM student s JOIN support sr ON s.Enrollment_No = sr.student_id WHERE sr.Status = 'Pending'");
        const [mentorshipRequests] = await db.execute("SELECT s.Full_Name, s.Email_ID, s.Contact_no, s.Enrollment_No, mr.Mentorship_Categories, mr.Reason, mr.Mode, mr.status FROM student s JOIN mentorship_requests mr ON s.Enrollment_No = mr.Enrollment_No");
        const [interestedAlumni] = await db.execute("SELECT ID, Full_Name FROM alumni WHERE Mentorship = 1");
        const [pendingMentorship] = await db.execute("SELECT * FROM mentorship_session WHERE Status = 'Pending'");
        const [acceptedMentorship] = await db.execute("SELECT * FROM mentorship_session WHERE Status = 'Accepted'");
        const [scheduledMentorship] = await db.execute("SELECT * FROM mentorship_session WHERE Status = 'Scheduled'");
        const [mentors] = await db.execute("SELECT Employee_ID, Full_Name FROM faculty WHERE Assigned = 0");
        const [contributions] = await db.execute("SELECT id, Alumni_ID, Amount, Is_Anonymous, Created_At FROM contributions WHERE Status = 'pending'")
        // console.log(contributions);
        req.session.Count = {
            countSupport: countSupport[0].pending_count,
            countMentorshipReq: countMentorshipReq[0].pendingMentorship_count,
            countUserVerification: countUserVerification[0].Pending_User_Count
        };

        res.render(path.join(__dirname, "./views/admin_page"), {
            supportCount: req.session.Count.countSupport || 0,
            mentorshipCount: req.session.Count.countMentorshipReq || 0,
            countUserVerification: req.session.Count.countUserVerification || 0,
            rows, row1, mentorshipRequests, announcement, mentorshipSessions,
            interestedAlumni, pendingMentorship, scheduledMentorship, acceptedMentorship, mentors, contributions
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading admin page.");
    }
}
// transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: "tarunparmar457@gmail.com",
//     subject: "Test Email",
//     text: "If you see this, email is working!"
// }).then(() => console.log("✅ Test email sent!"))
//   .catch(err => console.error("❌ Email error:", err.message));