require('dotenv').config();
const cors = require('cors');
const bcrypt = require("bcrypt")
const express = require("express"); // Importing express library from node modules
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Register = require('./Models/RegisterSchema');
const corsOptions = {
    origin: [process.env.FRONTEND_PROD, process.env.FRONTEND_LOCAL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
};

app.use(cors(corsOptions));


app.use(express.json());

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    // We need to destructure details from req 
    // res.send terminates the request-response cycle
    const isMatch = await Register.findOne({ email });
    if (isMatch) {
        return res.status(401).json({
            message: "User already exists!"
        })
    }
    else {
        try {
            const User = await Register.create({
                name,
                email,
                password: await bcrypt.hash(password, 10)
            });
            return res.status(201).json({
                message: "User Registered"
            })

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong !"
            })
        }
    }
});
const authmiddleware = async (req, res, next) => {
    const authorization = req.headers.authorization; // Header starts with "Bearer Token"
    if (!authorization) {
        return res.status(401).json({
            message: "No token provided"
        })
    }
    const token = authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or Expired Token"
        });
    }
}
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const isMatch = await Register.findOne({ email });
        const name = isMatch.name;
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "User Not Found"
            })
        }
        const hashedCompare = await bcrypt.compare(password, isMatch.password);
        if (hashedCompare != true) {
            return res.status(401).json({
                sucess: false,
                message: "Invalid Password"
            })
        }
        const token = jwt.sign({ email, name }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        return res.status(201).json({
            message: "Login Successful",
            token
        })
    } catch (error) {
        console.log(error);
    }
})
app.get('/dashboard', authmiddleware, async (req, res) => {
    res.json({
        message: `Welcome ${req.user.name} !!`
    })
})
app.post('/resetpswd', async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
    const isEmailMatch = await Register.findOne({ email });
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    if (!isEmailMatch) {
        return res.status(400).json({
            message: "User not found!"
        })
    }
    const oldPasswordMatch = await bcrypt.compare(oldPassword, isEmailMatch.password);
    if (!oldPasswordMatch) {
        return res.status(401).json({
            message: "Old password didn't match with the records!"
        })
    }
    await Register.updateOne({ email }, { password: hashedNewPassword })
    return res.status(200).json({
        message: "Password changed Successfully!"
    })
})
mongoose.connect(process.env.MONGO_URL, {
    ssl: true
}).then(() => console.log("Database Connected Successfully!"));
// Mongoose connect returns promise
// If middleware sends a response then next() must not be called and vice-versa
app.listen(process.env.PORT, () => {
    console.log(`The port is running on ${process.env.PORT} `);
});