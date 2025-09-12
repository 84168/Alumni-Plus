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
// const router = express.Router()
const otpStore = {}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
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
        const authUser = req.session.authUser || null;
        if (req.session.authUser) {
            req.session.userType = authUser.Role || null;
            req.session.Enrollment = authUser.Enrollment || null;
            // req.session.ID = autherUser.ID || null  alumni ID is not showing in query and return in req.body 
        };

        res.render(path.join(__dirname, './views/home.ejs'), { rows, rows1, authUser });

    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to load home');
    }
});
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
app.post("/user_data", async (req, res) => {
    console.log(req.body); // You should see your submitted form data
    let {
        Full_Name,
        Contact_no,
        Email_ID,
        role,
        Batch,
        Password,
    } = req.body;

    try {
        if (role == "alumni") {
            await db.execute(`
            INSERT INTO alumni 
            (Full_Name, Contact_no, Email_ID, Batch, Password) 
            VALUES (?, ?, ?, ?, ?)`, [
                Full_Name,
                Contact_no,
                Email_ID,
                Batch,
                Password

            ]);
            res.sendFile(path.join(__dirname, "./public/login.html"));
        }
        if (role = "student") {
            await db.execute(`
            INSERT INTO student 
            (Full_Name, Contact_no, Email_ID, Batch, Password) 
            VALUES (?, ?, ?, ?, ?)`, [
                Full_Name,
                Contact_no,
                Email_ID,
                Batch,
                Password

            ]);
            res.sendFile(path.join(__dirname, "./public/login.html"));
        }
        // res.send("data received");

    } catch (err) {
        console.error(err);
        res.status(500).send("not received");
    }
});

app.post("/login_check", async (req, res) => {
    console.log(req.body);
    let { role, Email_ID, Enrollment, Password } = req.body;


    try {

        let rows;
        if (role == "student") {
            [rows] = await db.execute("SELECT * FROM student WHERE Enrollment_No = ? AND Password = ?", [Enrollment, Password]);

        } else if (role == "alumni") {
            [rows] = await db.execute("SELECT * FROM alumni WHERE Email_ID = ? AND Password = ?", [Email_ID, Password]);
        } else {
            return res.status(400).send("Invalid role specified.");
        }

        if (!rows || rows.length === 0) {
            res.send("No database connection");
        }

        console.log("rows data contains : ", rows);
        req.session.authUser = {
            Enrollment: rows[0].Enrollment_No || '',
            Full_Name: rows[0].Full_Name,
            Email_ID: rows[0].Email_ID,
            Contact_no: rows[0].Contact_no,
            Batch: rows[0].Batch,
            Role: role
        };

        console.log("auth user :", req.session.authUser);
        res.redirect("/");

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error and in login error");
    }
});

app.post("/edit_profile", upload.single('Image'), async (req, res) => {
    const ID = req.session.ID;

    const { Full_Name, Contact_no, Email_ID, Bio } = req.body;
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

// SUPPORT DESK
app.get('/support_desk' , (req,res) =>{
    res.sendFile(path.join(__dirname, "./views/support_desk.html")); // it is ejs file
})
// MENTORSHIP REQUEST 
app.get('/mentorship_request' , (req,res) =>{
    
})
// Logout (destroy session and clear cookie)
app.post('/logout', (req, res, next) => {

    req.session.destroy((err) => {
        if (err) return next(err);
        res.clearCookie('connect.sid');
        return res.redirect('/');

    });
});

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