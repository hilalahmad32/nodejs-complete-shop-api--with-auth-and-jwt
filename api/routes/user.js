import express from 'express';
// import Users from './models/user.js';
import bcrypt from 'bcryptjs'
import Users from '../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();
const users = express.Router();

users.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const bpassword = await bcrypt.hashSync(password, 10);
    const is_email = await Users.findOne({ email: email });
    if (is_email) {
        res.send("Email already exist");
    } else {
        const user = new Users({
            name: name,
            email: email,
            password: bpassword,
        });
        const result = await user.save();
        if (result) {
            res.send("user add successfully");
        } else {
            res.send("somethign woirng");
        }
    }


});
users.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const userEmail = await Users.findOne({ email: email });
    if (userEmail) {
        const c_password = bcrypt.compare(password, userEmail.password);
        if (c_password) {
            const token = jwt.sign({
                email: userEmail.email,
                user_id: userEmail._id,
            },process.env.TOKEN);
            res.send(token);
        } else {
            res.send("invalid email and password")
        }
    }
    else {
        res.send("invalid email and password")

    }
})


users.get("/users", (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token,process.env.TOKEN);
        console.log(decode);
    } catch (error) {
        res.send("UnAuth")
    }
})

export default users;