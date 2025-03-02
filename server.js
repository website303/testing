const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send-ip", (req, res) => {
    const userIP = req.body.ip;

    // Configure email transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "davidlivesly@gmail.com",
            pass: "prob wcoj vnhy avvs"  // Use App Passwords if 2FA is enabled
        }
    });

    const mailOptions = {
        from: "davidlivesly@gmail.com",
        to: "davidlivesly@gmail.com",
        subject: "New Visitor IP Logged",
        text: `Visitor IP: ${userIP}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            res.status(500).send("Error sending email.");
        } else {
            console.log("Email sent:", info.response);
            res.send("IP Logged & Emailed Successfully");
        }
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));
