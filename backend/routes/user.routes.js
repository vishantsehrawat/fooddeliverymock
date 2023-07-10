const express = require("express")
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
var jwt = require('jsonwebtoken');
require("dotenv").config();

const userRouter = express.Router();
userRouter.use(express.json())

// user registration

userRouter.post("/register", async (req, res) => {
    const userData = req.body;
    try {
        const alreadyRegistered = await UserModel.findOne({ email: userData.email })
        const hash = bcrypt.hashSync(userData.password, 4);
        userData.password = hash;
        console.log("🚀 ~ file: user.routes.js:12 ~ userRouter.post ~ userData:", userData)
        if (!alreadyRegistered) {
            const newUser = await UserModel(userData)
            newUser.save();
            res.status(201).send({ msg: "user registered" })
        }
        else {
            res.status(400).send({ msg: "user already registered" })

        }
    } catch (error) {
        res.status(400).send({ msg: "error occured", error: error })
        console.log(error)
    }
})

//user login
userRouter.post("/login", async (req, res) => {
    const userData = req.body;
    console.log("🚀 ~ file: user.routes.js:37 ~ userRouter.post ~ userData:", userData)
    try {
        const user = await UserModel.findOne({ email: userData.email })
        // console.log("🚀 ~ file: user.routes.js:39 ~ userRouter.post ~ user:", user)
        bcrypt.compare(userData.password, user.password, function (err, result) {
            if (result) {
                var token = jwt.sign({ userData: userData }, process.env.TOKEN_SECRET);
                res.status(201).send({ msg: "user logged in", token: token })
            }
            else {
                res.status(400).send({ msg: "wrong password" })
            }
        });
    } catch (error) {
        res.status(400).send({ msg: "error occured", error: error })
        console.log(error)
    }
})


// update password

userRouter.patch("/:id/reset", async (req, res) => {
    const { id } = req.params
    const userData = req.body;
    console.log("🚀 ~ file: user.routes.js:62 ~ userRouter.patch ~ userData:", userData)
    // console.log("🚀 ~ file: user.routes.js:62 ~ userRouter.post ~ id:", id)

    try {
        const user = await UserModel.findOne({ email: userData.email })
        console.log("🚀 ~ file: user.routes.js:67 ~ userRouter.patch ~ user:", user)
        bcrypt.compare(userData.password, user.password, async function (err, result) {
            if (result) {

                bcrypt.hash(userData.newPassword, 4, async function (err, hash) {
                    // Store hash in your password DB.
                    user.password = hash
                    myuser = await UserModel(user)
                    myuser.save();
                });
                res.status(201).send({ msg: "user password updated in" })
            }
            else {
                res.status(400).send({ msg: "wrong password" })
            }
        });
        // console.log("🚀 ~ file: user.routes.js:39 ~ userRouter.post ~ user:", user)

    } catch (error) {
        res.status(400).send({ msg: "error occured", error: error })
        console.log(error)
    }
})
module.exports = {
    userRouter
}