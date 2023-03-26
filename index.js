
const bcrypt = require("bcrypt/bcrypt")
const express = require("express");
const jwt = require("jsonwebtoken");
var cors = require('cors')

const UserModel = require("./models/User.model")
const SprintModel = require("./models/Sprint.model");
const TaskModel = require("./models/Task.model");
const connection = require("./configs/db");
const app = express();
app.use(cors())
const PORT = process.env.PORT || 8080
app.use(express.json());
require("dotenv").config()

app.get("/", (req, res) => {
    res.send("Hello")
})

app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 5, async function (err, hash) {
        if (err) {
            res.send("Something went wrong")
        }
        const user = new UserModel({
            name,
            email,
            password: hash
        })
        try {
            await user.save()
            res.json({ msg: "Signup is successfull" })
        }
        catch (err) {
            console.log(err)
            res.send("Something wrong")
        }
    });
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email })
    const hash = user.password
    bcrypt.compare(password, hash, function (err, result) {
        if (err) {
            res.send("Something went wrong")
        }
        if (result) {
            const token = jwt.sign({ userId: user._id }, process.env.jwt_secret_key);
            res.json({ message: "Login Successfull", token })
        }
        else {
            res.send("Invalid Credentials")
        }
    });
})

app.get("/dashboard", (req, res) => {
    res.json({ message: "You can access" })
})

app.post("/sprints", async (req, res) => {
    let { sprint } = req.body;
    const user = await SprintModel.findOne({ sprint });
    if (user) {
        res.send("exists")
    } else {
        const user = await SprintModel.create(req.body);
        res.send("notexists")
    }
})
app.get("/sprints", async (req, res) => {
    const user = await SprintModel.find();
    res.send(user)
})

app.post("/tasks", async (req, res) => {
    let { name } = req.body;
    const user = await TaskModel.findOne({ name });
    if (user) {
        res.send("Exist")
    } else {
        const user = await TaskModel.create(req.body);
        res.send("Not Exist")
    }
})
app.get("/tasks", async (req, res) => {
    const user = await TaskModel.find();
    res.send(user)
})
app.patch("/tasks/:id", async (req, res) => {
    let { id } = req.params;
    const user = await TaskModel.findByIdAndUpdate(id, req.body);
    res.send(user)
})
app.delete("/tasks/:id", async (req, res) => {
    let { id } = req.params;
    console.log(id)
    const user = await TaskModel.findByIdAndDelete(id);
    res.send("deleted")
})

app.listen(PORT, async () => {
    try {
        await connection
        console.log("Connect Success to db")
    }
    catch (err) {
        console.log("connect failure")
    }
})
