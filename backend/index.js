const express = require("express");
var cors = require('cors')
const { connection } = require("./config/dbConnection");
const { userRouter } = require("./routes/user.routes");
const { restaurantRouter } = require("./routes/restaurant.routes");
const { orderRouter } = require("./routes/order.routes");
require("dotenv").config();
const app = express()
app.use(cors())
app.use(express.json())
app.use("/user", userRouter)
app.use("/restaurants", restaurantRouter)
app.use("/orders", orderRouter)


app.get("/", (req, res) => {
    res.send({ message: "HOme route" })
})

app.listen(process.env.PORT, async (req, res) => {
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
})