require('dotenv').config();
const cors = require('cors');
const bcrypt = require("bcrypt")
const express = require("express"); // Importing express library from node modules
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Register = require('./Models/RegisterSchema');
const allowedOrigins = [
    process.env.FRONTEND_PROD,
    process.env.FRONTEND_LOCAL
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        // allow main prod, localhost, and ALL Vercel preview deployments
        if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
            callback(null, true);
        } else {
            console.log("Blocked CORS request from:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
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
    try {
        const authHeader = req.headers.authorization; //In this case, it just says it has something, this aint the token yet 
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(404).json({
                message: "No token provided"
            })
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;
        const { oldPassword, newPassword } = req.body;
        const user = await Register.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "User not found !"
            })
        }
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Old Password didn't match records!"
            })
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        return res.status(200).json({
            message: "Password Changed successfully!"
        })
    } catch (error) {
        if (error.name == "TokenExpiredError") {
            return res.status(401).json({
                message: "Token Expired"
            })
        }
        if (error.name == "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid Token "
            })
        }
        return res.status(500).json({
            message: "Server Error!"
        })
    }
});

mongoose.connect(process.env.MONGO_URL, {
    ssl: true
}).then(() => console.log("Database Connected Successfully!"));
// Mongoose connect returns promise
// If middleware sends a response then next() must not be called and vice-versa
app.listen(process.env.PORT, () => {
    console.log(`The port is running on ${process.env.PORT} `);
});