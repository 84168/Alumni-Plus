import session from 'express-session'
import mysql from 'mysql2/promise';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", 'ejs');

app.use(session({
  secret: 'Tarun*123',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));



// TO CONNECT TO MYSQL SERVER 
const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Tarun*123",
    database: "alumni plus"
});

// ROUTE TO REGISTRATION PAGE 
app.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname , './public/home.html'));
    res.sendFile(path.join(__dirname, './public/login.html'));
})

app.get("/job_read", async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM `job and internship`");
        // res.send({rows});
        res.render(path.join(__dirname, './views/job_read.ejs'), { rows });
    } catch (err) {
        console.error(err);
        res.status(500).send("Database query failed");
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
            (Title, Type, Location, Duration, Description, Requirements, Benefits, Deadline, Form_Link, created_At) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            Title,
            Type,
            Location,
            Duration,
            Description,
            Requirement,
            Benefits,
            Deadline,
            Form_Link,
            new Date()
        ]);
        res.redirect("/job_read");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to insert job post");
    }

})

app.post("/user_data", async (req, res) => {
    console.log(req.body); // You should see your submitted form data
    // res.send("Data received.");
    const {
        fullName,
        email,
        role,
        batch,
        password,
        terms
    } = req.body;
    const termsAccepted = terms === 'on' ? 1 : 0;

    try {
        await db.execute(`
            INSERT INTO \`user\`  
            (\`Full Name\` , Email, Role, Batch, Password, Terms) 
            VALUES (?, ?, ?, ?, ?, ?)`, [
            fullName,
            email,
            role,
            batch,
            password,
            termsAccepted
            // new Date()
        ]);
        // res.send("data received");
        res.sendFile(path.join(__dirname , "./public/login.html"));
    } catch (err) {
        console.error(err);
        res.status(500).send("not received");
    }
});

app.post("/login_check", async (req, res) => {
    console.log(req.body);
    // res.send("received");
    const {
        role,
        email,
        password,
    } = req.body;

    // console.log(role , email , password);

    try {
        const [rows1] = await db.execute(
            "SELECT `Full Name` FROM user WHERE email = ? AND password = ? AND role = ?", [email,password,role]
        );
        const fullName = rows1.length > 0 ? rows1[0]['Full Name'] : null;
        console.log("full name is : " , fullName);

        const [rows] = await db.execute(
            "SELECT * FROM user WHERE email= ? AND password = ? AND role=?", [email, password, role]
        );

        if (rows.length > 0) {
            req.session.userType = role;
            req.session.userName = fullName;
            console.log('UserType set in session:', req.session.userType, req.session.userName);
            res.redirect("/home");
        } else {
        console.log("data not found");
    }
} catch (err) {
    console.error(err);
    res.status(500).send("Server error");
}
});


// ROUTE TO HOME PAGE AFTER LOGIN VERFICATION
app.get("/home", (req, res) => {
    const userType = req.session.userType;
    const userName = req.session.userName;
    console.log("we are in /home", userType , userName);
    res.render("home", { userType , userName});
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