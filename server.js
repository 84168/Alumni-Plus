import session from 'express-session'
import mysql from 'mysql2/promise';
import express from 'express';
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';
import multer from 'multer';
import { dir } from 'console';
import { ppid } from 'process';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For form submissions
app.use(bodyParser.json());
app.set("view engine", 'ejs');
app.use('/uploads', express.static('uploads'));
dotenv.config()
app.use('/uploads', express.static('uploads'));

// const router = express.Router()
const otpStore = {}

const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, 'uploads/');
    // },
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);

    }
});
const upload = multer({ storage });

app.use(session({
    secret: 'Tarun*123',
    resave: false,
    // saveUninitialized: true,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// TO CONNECT TO MYSQL SERVER 
const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "alumni plus"
});

// Small helper: auth guard for private routes
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) return next();
    return res.redirect("/");
}

// ROUTE TO HOME PAGE 
app.get("/", async (req, res) => {

    // res.send("hello world");
    try {
        const [rows] = await db.execute(`SELECT * FROM alumni LIMIT 4;`);// alumni data to show at home
        const [rows1] = await db.execute("SELECT * FROM `job and internship` LIMIT 3");//job intern data
        const [announcement] = await db.execute("SELECT * FROM `announcement`");
        const [mentorshipSession] = await db.execute("SELECT * FROM `mentorship_session` WHERE Status = 'Scheduled'");

        const authUser = req.session.authUser || null;
        if (req.session.authUser) {
            req.session.userType = authUser.Role || null;
            req.session.Enrollment = authUser.Enrollment || null;
            // req.session.ID = autherUser.ID || null  alumni ID is not showing in query and return in req.body 
        }
        console.log("announcemnets ar : ", req.session.userType);
        res.render(path.join(__dirname, './views/home.ejs'), { rows, rows1, authUser, announcement, mentorshipSession });

    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to load home');
    }
});
// SENDING USER APPROVAL EMAIL NOTIFICATION
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "csealumniplus1952@gmail.com",
        pass: "kcdrdlpsgzvzebul"
    }
})

app.post("/send-otp", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        otpStore[email] = {
            code: otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        };
        console.log(process.env.EMAIL_USER);
        console.log(process.env.EMAIL_PASS)
        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your Alumni Portal OTP Code",
            text: `Your OTP is ${otp}. It will expire in 5 minutes.`
        };

        // Send email
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

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    const record = otpStore[email];

    if (!record) {
        return res.status(400).json({ message: "No OTP found for this email" });
    }

    if (Date.now() > record.expiresAt) {
        delete otpStore[email];
        return res.status(400).json({ message: "OTP expired" });
    }

    if (record.code !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP is valid
    delete otpStore[email];
    res.json({ message: "Email verified successfully!" });
});
app.get("/email_varification", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/verifi.html"));
})
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

app.get("/alumni_read", async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM `alumni` LIMIT 10");
        res.render(path.join(__dirname, './views/alumni_read.ejs'), { rows });
    } catch (err) {
        console.error(err);
        res.status(500).send("Alumni Data Access Error");
    }
})

app.post("/alumni_search", async (req, res) => {
    // console.log(req.body)
    const {
        Name,
        Batch
    } = req.body;

    if (!Name && !Batch) {
        return res.redirect("/alumni_read.ejs")
    }
    try {
        let query = "";
        let params = [];

        if (Name && Batch) {
            query = "SELECT * FROM alumni WHERE Full_Name = ? AND Batch = ? ";
            params.push(Name);
            params.push(Batch);
        }
        if (Name && !Batch) {
            query = "SELECT * FROM alumni WHERE Full_Name = ? ";
            params.push(Name);

        }
        if (!Name && Batch) {
            query = "SELECT * FROM alumni WHERE  Batch = ? ";
            params.push(Batch);
        }
        const [rows] = await db.execute(query, params);
        console.log(rows);
        res.render(path.join(__dirname, "./views/alumni_read"), { rows });
    } catch (err) {
        console.error(err);
        res.status(500).send("No data tracesed");
    }
})

// ROUTE TO JOB_POST
app.post("/job_post", async (req, res) => {

    console.log(req.body);
    const {
        Title,
        Type,
        Location,
        Duration,
        Description,
        Requirement,
        Benefits,
        Deadline,
        Form_Link
    } = req.body;

    try {
        console.log("hell");
        await db.execute(`
            INSERT INTO \`job and internship\` 
            (Title, Type, Location, Duration, Description, Requirement, Benefits, Deadline, Form_Link) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            Title,
            Type,
            Location,
            Duration,
            Description,
            Requirement,
            Benefits,
            Deadline,
            Form_Link
        ]);
        res.redirect("/job_read");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to insert job post");
    }

})

// FOR REGISTRATION 
app.post("/user_data", upload.single('User_ID'), async (req, res) => {
    console.log(req.body); // You should see your submitted form data
    let {
        Full_Name,
        Enrollment_No,
        Contact_no,
        Email_ID,
        Course,
        role,
        Batch,
        Password
    } = req.body;

    const User_ID = req.file.path || null;

    try {
        await db.execute(`INSERT INTO user (Full_Name,Enrollment_No, Contact_No, Email_ID, Course, Role, Batch, Password, User_ID) VALUES (?,?,?,?,?,?,?,?,?)`, [

            Full_Name,
            Enrollment_No,
            Contact_no,
            Email_ID,
            Course,
            role,
            Batch,
            Password,
            User_ID
        ]);
        res.redirect("/?message=After verifying your details, we'll send an invite to your registered email. Thank you!");


    } catch (err) {
        console.error(err);
        res.status(500).send("not received");
    }
});

app.post("/login_check", async (req, res) => {
    console.log(req.body);
    let { role, Course, Email_ID, Enrollment, Employee_ID, Password } = req.body;
    // let {role} = req.body;
    try {

        let rows;
        if (role == "student") {
            //let{ Course, Enrollment,Email_ID,Employee_ID, Password} = req.body;
            [rows] = await db.execute("SELECT * FROM student WHERE Enrollment_No = ? AND Password = ?", [Enrollment, Password]);
        } else if (role == "alumni") {
            // let{ Course, Email_ID, Enrollment, Password} = req.body;
            [rows] = await db.execute("SELECT * FROM alumni WHERE Email_ID = ? AND Password = ?", [Email_ID, Password]);
        } else if (role == "faculty") {
            // let{ Course, Email_ID, Enrollment, Password} = req.body;
            [rows] = await db.execute("SELECT * FROM faculty WHERE Employee_ID = ? AND Password = ?", [Employee_ID, Password]);
            // console.log("role is : ", role, " email is : ", rows[0].Email_ID);
            if (rows[0].Email_ID == "csealumniplus1952@gmail.com") {
                role = "admin";
            }
            // console.log("updated role is  : ", role)
        }
        else {
            return res.status(400).send("Invalid role specified. this is the error ");
        }

        if (!rows || rows.length === 0) {
            res.send("No database connection");
        }

        console.log("rows data contains : ", rows);
        req.session.authUser = {
            Enrollment: rows[0].Enrollment_No || '',
            Employee_ID: rows[0].Employee_ID || '',
            Alumni_ID: rows[0].ID || '',
            Full_Name: rows[0].Full_Name,
            Email_ID: rows[0].Email_ID,
            Contact_no: rows[0].Contact_no,
            Batch: rows[0].Batch,
            Role: role
        };

        console.log("auth user :", req.session.authUser);

        if (req.session.authUser.Role == "admin") {
            await renderAdminPage(req, res);

        } else {
            res.redirect("/");
        }


    } catch (err) {
        console.error(err);
        res.status(500).send("Server error and in login error");
    }
});
app.get("/exitForm/:enrollment", async (req, res) => {
    const Enrollment = req.params.enrollment;

    const [rows] = await db.execute("SELECT `exit_form` FROM student WHERE Enrollment_No = ?", [Enrollment]);
    console.log("exit form rows contain : ", rows);
    const exitFormStatus = rows[0].exit_form;

    res.render(path.join(__dirname, "./views/exit_form.ejs"), { exitFormStatus });
})
app.post("/exit_form_submission", async (req, res) => {
    try {
        // Helper function to convert undefined to null
        const nullIfUndefined = (value) => value === undefined || value === '' ? null : value;

        const {
            fullName,  // Changed from full_name to match form
            university_rollno,
            email,
            phone,
            date_of_birth,
            gender,
            permanent_address,
            current_address,
            branch,
            year_of_education,
            cgpa,
            backlog,
            honors_minor_specialization,
            project_thesis_title,
            internship_completed,
            placed,  // Add this field
            company_name,
            job_role,
            ctc_offered,
            joining_date,
            location_of_posting,
            offer_letter_upload,
            higherStudies,  // Changed from higherStudies to match form
            future_course_name,
            future_university_name,
            future_country,
            admission_status,
            entrepreneurship_plans,
            govt_exam_prep,
            other_plans,
            rate_institution,
            experience,
            suggestions,
            alumni_network,
            alumni_consent,
            data_consent,
            digital_signature,
            date_of_submission
        } = req.body;

        const query = `
      INSERT INTO exit_form (
        full_name, university_rollno, email, phone, date_of_birth, gender,
        permanent_address, current_address, branch, year_of_education, cgpa, backlog,
        honors_minor_specialization, project_thesis_title, internship_completed,
        company_name, job_role, ctc_offered, joining_date, location_of_posting,
        offer_letter_upload, future_course_name, future_university_name, future_country,
        admission_status, entrepreneurship_plans, govt_exam_prep, other_plans,
        rate_institution, experience, suggestions, alumni_network, alumni_consent,
        data_consent, digital_signature, date_of_submission
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        const values = [
            fullName,  // Changed
            university_rollno,
            email,
            phone,
            date_of_birth,
            gender,
            permanent_address,
            nullIfUndefined(current_address),
            branch,
            year_of_education,
            cgpa,
            nullIfUndefined(backlog) || 0,
            nullIfUndefined(honors_minor_specialization),
            nullIfUndefined(project_thesis_title),
            nullIfUndefined(internship_completed),
            // Only include placement details if placed === 'yes'
            nullIfUndefined(company_name),
            nullIfUndefined(job_role),
            nullIfUndefined(ctc_offered),
            nullIfUndefined(joining_date),
            nullIfUndefined(location_of_posting),
            nullIfUndefined(offer_letter_upload),
            // Only include higher studies details if higherStudies === 'yes'
            nullIfUndefined(future_course_name),
            nullIfUndefined(future_university_name),
            nullIfUndefined(future_country),
            nullIfUndefined(admission_status),
            nullIfUndefined(entrepreneurship_plans),
            nullIfUndefined(govt_exam_prep),
            nullIfUndefined(other_plans),
            rate_institution,
            nullIfUndefined(experience),
            nullIfUndefined(suggestions),
            alumni_network || 0,
            alumni_consent ? 1 : 0,
            data_consent ? 1 : 0,
            digital_signature,
            date_of_submission
        ];

        await db.execute(query, values);
        await db.execute("UPDATE student SET `exit_form` = 1 WHERE `Enrollment_No` = ?", [university_rollno]);

        res.status(200).json({ success: true, message: 'Exit form submitted successfully' });
    } catch (error) {
        console.error('Error submitting exit form:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// SUPPORT DESK SHOWING CARD TO STUDENTS
app.get('/support_desk', async (req, res) => {
    const [pendingSupport] = await db.execute("SELECT * FROM `support` WHERE `Status` = 'pending' ");
    const [verifiedSupport] = await db.execute(`SELECT support.*, faculty.* FROM support JOIN faculty ON support.faculty_id = faculty.Employee_ID WHERE support.status = 'verified' `);
    console.log("pending is : ", pendingSupport)
    console.log("verified is : ", verifiedSupport)

    const authUser = req.session.authUser;
    const message = req.query.message || '';

    const userID = authUser?.Enrollment || authUser?.Alumni_ID || authUser?.Employee_ID || '';
    const userIs = authUser?.Role;
    let isSupported = '';

    console.log("user is : ", userIs);

    if (userIs == "alumni") {
        if (userID != '') {
            const [rows] = await db.execute("SELECT `needs_supported` FROM alumni WHERE ID = ?", [userID]);
            isSupported = rows[0]?.needs_supported;
        }
    } else if (userIs == "faculty") {
        if (userID != '') {
            const [rows] = await db.execute("SELECT `Assigned` FROM faculty WHERE Employee_ID = ?", [userID]);
            isSupported = rows[0]?.Assigned;
        }
    }

    console.log("is supported is :", isSupported)
    res.render(path.join(__dirname, "./views/support_desk.ejs"), { verifiedSupport, pendingSupport, userID, userIs, message, isSupported }); // it is ejs file
})
app.get("/myAssignedSupport/:userID/:supportID", async (req, res) => {

    const userId = req.params.userID;
    const supportID = req.params.supportID;
    const authUser = req.session.authUser;
    const userID = authUser?.Enrollment || authUser?.Alumni_ID || '';
    const userIs = authUser?.Role;
    // req.session.msg = "";
    const [pendingSupport] = await db.execute("SELECT * FROM `support` WHERE `Status` = 'pending' ");
    const [verifiedSupport] = await db.execute(`SELECT support.*, faculty.* FROM support JOIN faculty ON support.faculty_id = faculty.Employee_ID WHERE support.status = 'verified' `);


    const [row] = await db.execute("SELECT needs_supported FROM alumni WHERE ID = ?", [userId]);
    console.log("suppored row is ", row[0].needs_supported);

    if (row[0].needs_supported == 0) {
        db.execute("UPDATE support SET status = 'in_progress', alumni_id = ? WHERE id = ?; ", [userID, supportID]);
        db.execute("UPDATE alumni SET `needs_supported`= 1 WHERE ID = ?", [userId]);

        console.log("userID", userId)
        // console.log("userID", supportID)
        // res.render(path.join(__dirname, "./views/support_desk.ejs"), { msg: "Support assigned successfully!" , userID, userIs, pendingSupport, verifiedSupport});
        res.redirect("/support_desk?message=Support assigned successfully!");
    } else {
        //     res.render(path.join(__dirname, "./views/support_desk.ejs"), { msg: "Alumni You are already being supporting a request you are not allowed to support multiple requests at a time" , userID, userIs,pendingSupport,verifiedSupport});
        res.redirect("/support_desk?message=Alumni You are already being supporting a request you are not allowed to support multiple requests at a time");
    }

})

app.get("/mysupportings/:id", async (req, res) => {
    const id = req.params.id;
    console.log("my supporting id is : ", id);
    res.redirect("/alumni_supporting.html");
})
app.post("/edit_profile", upload.single('Image'), async (req, res) => {
    const ID = req.session.ID;

    const { Full_Name, Contact_no, Email_ID, Bio } = req.body; SS
    const Image = req.file ? req.file.path : null;

    try {

        let [rows] = await db.execute(
            `UPDATE alumni SET Full_Name = ?, Contact_no = ?, Email_ID = ?, Bio = ?, Image = ? WHERE ID = ?`,
            [Full_Name, Contact_no, Email_ID, Bio, Image, ID]
        );
        res.send("Profile updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating profile");
    }
});


// MENTORSHIP REQUEST   DO OPTIMIZATION HERE  SHOWING AT MENTORSHIP_PAGE.EJS
app.post('/mentorship_request', async (req, res) => {

    const [mentorshipSessions] = await db.execute("SELECT * FROM `mentorship_session` WHERE Status = 'Scheduled'");
    console.log("Mentorship Request Data : ", req.body)
    const {
        Enrollment_No,
        mentorshipCategories,
        reason,
        mode,
        consent
    } = req.body;

    // const enroll = authUser.Enrollment;
    const authUser = req.session.authUser;

    const userID = authUser?.Enrollment || authUser?.Alumni_ID || '';
    const userIs = authUser?.Role;

    try {
        await db.execute(
            "INSERT INTO mentorship_requests (Enrollment_No, Mentorship_Categories, Reason, Mode, consent) VALUES (?, ?, ?, ?, ?)",
            [
                Enrollment_No,
                mentorshipCategories,
                reason,
                mode,
                consent === 'on' ? 1 : 0
            ]
        );
        res.render(path.join(__dirname, './views/mentorship_page.ejs'), { mentorshipSessions, userID, userIs });
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
});



app.get("/mentorshipSessionPage", async (req, res) => {
    const [mentorshipSessions] = await db.execute("SELECT * FROM `mentorship_session` WHERE Status = 'Scheduled'");
    console.log(mentorshipSessions);
    const authUser = req.session.authUser;

    const userID = authUser?.Enrollment || authUser?.Alumni_ID || '';
    const userIs = authUser?.Role;
    console.log("console.log uerid is iser user is", userID, userIs)
    res.render(path.join(__dirname, './views/mentorship_page.ejs'), { mentorshipSessions, userID, userIs });
})

app.get("/alumniSessionRequest", async (req, res) => {
    const authUser = req.session.authUser;
    const message = req.session.alertMessage || "";
    req.session.alertMessage = "";
    const userID = authUser?.Alumni_ID;
    const [sessionReq] = await db.execute("SELECT * FROM `mentorship_session` WHERE Alumni_ID = ?  AND Status = 'Pending'", [userID]);

    res.render(path.join(__dirname, './views/mentorshipReqtoalumni.ejs'), { sessionReq, alertMessage: message });
});
app.get("/acceptMentorshipRequest/:sessionID", async (req, res) => {
    const sessionID = req.params.sessionID;

    await db.execute("UPDATE `mentorship_session` SET Status = 'Accepted' WHERE Session_ID = ?", [sessionID]);
    req.session.alertMessage = "✅ Mentorship request accepted successfully!";
    res.redirect("/alumniSessionRequest",);
})
app.get("/rejectMentorshipRequest/:sessionID", async (req, res) => {
    const sessionID = req.params.sessionID;

    await db.execute("UPDATE `mentorship_session` SET Status = 'Rejected' WHERE Session_ID = ?", [sessionID]);
    req.session.alertMessage = "❌ Mentorship request rejected";
    res.redirect("/alumniSessionRequest");
})
app.get("/scheduleAlumniMentorReq/:sessionID", async (req, res) => {
    const sessionID = req.params.sessionID;

    await db.execute("UPDATE `mentorship_session` SET Status = 'Scheduled' WHERE Session_ID = ?", [sessionID]);
    await renderAdminPage(req, res);

})
// Logout (destroy session and clear cookie)
app.post('/logout', (req, res, next) => {

    req.session.destroy((err) => {
        if (err) return next(err);
        res.clearCookie('connect.sid');
        return res.redirect('/');

    });
});

app.post("/support_request", upload.single('ID_Proof'), async (req, res) => {
    const { Enrollment_No, Request_Title, Request_Description } = req.body;
    const FilePath = req.file?.path;
    try {
        const [rows] = await db.execute("SELECT `No of Needs` FROM `support` WHERE student_id = ?", [Enrollment_No]);
        if (rows.length === 0) {
            // await db.execute("INSERT INTO `support_requests` (Enrollment_No , Request_Title, Request_Description, ID_Proof, No_of_Request ) VALUES (? , ? ,? ,?, ?)",
            //     [Enrollment_No, Request_Title, Request_Description, FilePath, 1]);
            await db.execute("INSERT INTO `support` (title,description, student_id,  `No of Needs`) VALUES (? , ? ,?, ?)", // ADD STUDENT EMAIL
                [Request_Title, Request_Description, Enrollment_No, 1]);
            res.redirect("/support_desk?message=Support request submitted successfully"); // THIS NEEDS TO BE .EJS
        } else {
            res.redirect("/support_desk?message=You can only submit one support request at a time");
        }
    } catch (err) {
        console.error(err);
    }
});

app.post("/HandleSupportRequest", async (req, res) => {
    console.log(req.body)
    const { Employee_ID, Enrollment_No, action } = req.body;

    console.log("Handling support request for:", Enrollment_No, "Action:", action);

    try {
        if (action === "approve") {
            const verifiedAt = new Date();
            await db.execute(
                "UPDATE support SET Status = 'verified', faculty_id = ?, verified_at = ? WHERE student_id = ?",
                [Employee_ID, verifiedAt, Enrollment_No]
            );
            await db.execute(
                "UPDATE faculty SET Assigned = 1 WHERE Employee_ID = ?", [Employee_ID]
            )

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
    console.log("handele user request : ", req.body);

    if (!ID || !action) {
        return res.status(400).send("Missing required fields.");
    }
    try {
        // Fetch user details using the provided ID
        const [rows] = await db.execute("SELECT * FROM user WHERE ID = ?", [ID]);
        const user = rows[0];
        console.log("user is : ", user);

        if (rows.length === 0) {
            return res.status(404).send("User not found.");
        }

        if (action === "approve") {

            await db.execute("UPDATE user SET Status = 'Verified' WHERE ID = ?", [ID]);
            if (user.Role === "Student") {
                await db.execute(
                    `INSERT INTO student (Enrollment_No, Full_Name, Course, Contact_No, Email_ID,  Batch, Password) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [
                        user.Enrollment_No,
                        user.Full_Name,
                        user.Course,
                        user.Contact_No,
                        user.Email_ID,
                        user.Batch,
                        user.Password
                    ]
                );
            } else if (user.Role === "Alumni") {
                await db.execute(
                    `INSERT INTO alumni (Full_Name, Contact_No, Course,  Email_ID,  Batch, Password) VALUES (?, ?, ?, ?, ?, ?)`,
                    [
                        user.Full_Name,
                        user.Contact_No,
                        user.Course,
                        user.Email_ID,
                        user.Batch,
                        user.Password
                    ]
                );
            }
            // Send approval email
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: user.Email_ID,
                subject: "Application Approved - Welcome to Our Educational Platform",
                html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #2c5aa0; margin-bottom: 10px;">Application Approved</h1>
                <div style="width: 50px; height: 3px; background-color: #2c5aa0; margin: 0 auto;"></div>
            </div>
            
            <p>Dear ${user.Full_Name},</p>
            
            <p>We are pleased to inform you that your application to join our educational platform as a <strong>${user.Role}</strong> has been <span style="color: #28a745; font-weight: bold;">approved</span>.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #2c5aa0; margin: 20px 0;">
                <h3 style="color: #2c5aa0; margin-top: 0;">Next Steps:</h3>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Log in to your account using your registered credentials</li>
                    <li>Complete your profile setup if not already done</li>
                    <li>Review the platform guidelines and policies</li>
                    <li>Explore the available resources and tools</li>
                </ul>
            </div>
            
            <p>As a ${user.Role}, you will have access to:</p>
            <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Comprehensive learning resources</li>
                <li>Interactive educational tools</li>
                <li>Community forums and discussions</li>
                <li>Progress tracking and analytics</li>
            </ul>
            
            
            <p>We look forward to supporting your educational journey with us.</p>
            
            <p>Best regards,<br>
            <strong>The Academic Team</strong><br>
            Your Educational Platform</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px;">
                <p>This is an automated message. Please do not reply to this email.</p>
            </div>
        </div>
    `
            });


        } else if (action === "reject") {
            await db.execute("UPDATE user SET Status = 'Rejected' WHERE ID = ?", [ID]);

        }
        await renderAdminPage(req, res);
    } catch (err) {
        console.error(err);
    }

})

app.post("/schedule-session", async (req, res) => {
    const {
        sessionTitle,
        Alumni,
        Alumni_ID,
        Description,
        Date,
        Duration,
        mode,
        meetingLink,
        venue,
        targetAudience,
        registrationDeadline,

    } = req.body;

    console.log(req.body);

    try {
        await db.execute(
            "INSERT INTO mentorship_session (Alumni, Alumni_ID, Session_Date, Duration, Mode, Topic, Description, Target_Audience, Registration_Deadline, Meeting_Link, Venue) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                Alumni,
                Alumni_ID,
                Date,
                Duration,
                mode,
                sessionTitle,
                Description,
                targetAudience,
                registrationDeadline,
                meetingLink,
                venue
            ]
        );
        res.redirect("/admin");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error scheduling session");
    }
});

app.post("/schedule-session/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log("mentorship dele id is : ", id);
    try {
        await db.execute("DELETE FROM `mentorship_session` WHERE Session_ID = ?", [id]);
        await renderAdminPage(req, res);
    } catch (err) {
        console.error(err);
    }
})
app.post("/announcement", upload.single('Attachment_Url'), async (req, res) => {
    const {
        Title,
        Description,
        Important_Links,
        Posted_On,
        Visibility
    } = req.body;
    const { path } = req.file;

    console.log(path);

    try {
        await db.execute("INSERT INTO announcement (Title,Description,Important_Links,Posted_On, Attachment_Url, Visibility) VALUES (?,?,?,?,?,?)", [
            Title,
            Description,
            Important_Links,
            Posted_On,
            path,
            Visibility
        ])
        res.redirect("/admin")
    } catch (err) {
        console.error(err)
    }
});

app.post("/announcement/update/:idx", upload.single('Attachment_Url'), async (req, res) => {
    const id = req.params.idx;
    const { Title, Description, Posted_On, Visibility, Important_Links } = req.body;
    try {
        console.log("updated values are : ", req.body)
        console.log("ID is : ", id)

        await db.execute(`
    UPDATE announcement 
    SET Title = ?, Description = ?, Posted_On = ?, Visibility = ?, Important_Links = ?
    WHERE ID = ?
  `, [
            Title, Description, Posted_On, Visibility, Important_Links, id
        ])

        await renderAdminPage(req, res);
    } catch (err) {
        console.error(err)
    }
});

app.post("/announcement/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await db.execute("DELETE FROM announcement WHERE ID = ?", [id]);
        await renderAdminPage(req, res);
    } catch (error) {
        res.status(500).send("Error deleting announcement.");
    }
});

// FOR FORM RESUBMISSION ON REFRESH
app.get("/admin", async (req, res) => {
    await renderAdminPage(req, res);
})

app.post("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await db.execute('DELETE FROM `job and internship` WHERE ID = ?', [id]);
    res.redirect("/job_read");
})

app.get("/chat_box", (req, res) => {
    res.redirect("http://localhost:9000/");
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})

// HELPER FUNCTION FOR SUPPORT REQUEST ::::
async function renderAdminPage(req, res) {
    try {
        const [mentorshipSessions] = await db.execute("SELECT * FROM mentorship_session");
        const [announcement] = await db.execute("SELECT * FROM announcement");
        const [countUserVerification] = await db.execute("SELECT COUNT(*) AS `Pending_User_Count` FROM `user` WHERE Status = 'Pending';");
        const [countSupport] = await db.execute("SELECT COUNT(*) AS `pending_count` FROM `support` WHERE Status = 'pending';");
        const [countMentorshipReq] = await db.execute("SELECT COUNT(*) AS `pendingMentorship_count` FROM `mentorship_requests` WHERE status = 'Pending';");
        const [row1] = await db.execute("SELECT * FROM user WHERE Status = 'Pending';");
        const [rows] = await db.execute("SELECT s.*, sr.* FROM student s JOIN support sr ON s.Enrollment_No = sr.student_id WHERE sr.Status = 'Pending';");
        const [mentorshipRequests] = await db.execute(`SELECT s.Full_Name, s.Email_ID, s.Contact_no, s.Enrollment_No,mr.Mentorship_Categories, mr.Reason, mr.Mode, mr.status FROM student s JOIN mentorship_requests mr ON s.Enrollment_No = mr.Enrollment_No`);
        const [interestedAlumni] = await db.execute(`SELECT ID, Full_Name FROM alumni WHERE Mentorship = 1`);
        const [pendingMentorship] = await db.execute("SELECT * FROM `mentorship_session` WHERE Status = 'Pending'");
        const [acceptedMentorship] = await db.execute("SELECT * FROM `mentorship_session` WHERE Status = 'Accepted'");
        const [scheduledMentorship] = await db.execute("SELECT * FROM `mentorship_session` WHERE Status = 'Scheduled'");
        const [mentors] = await db.execute("SELECT Employee_ID, Full_Name FROM faculty WHERE Assigned = 0")

        req.session.Count = {
            countSupport: countSupport[0].pending_count,
            countMentorshipReq: countMentorshipReq[0].pendingMentorship_count,
            countUserVerification: countUserVerification[0].Pending_User_Count
        };
        console.log("intereste alumni", interestedAlumni);
        // // console.log("User table data ", row1);
        // console.log("mentorshipSessions : ", mentorshipSessions )

        res.render(path.join(__dirname, "./views/admin_page"), {
            supportCount: req.session.Count.countSupport || 0,
            mentorshipCount: req.session.Count.countMentorshipReq || 0,
            countUserVerification: req.session.Count.countUserVerification || 0,
            rows,
            row1,
            mentorshipRequests,
            announcement,
            mentorshipSessions,
            interestedAlumni,
            pendingMentorship,
            scheduledMentorship,
            acceptedMentorship,
            mentors
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading admin page.");
    }
}
