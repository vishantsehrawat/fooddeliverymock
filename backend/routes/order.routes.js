const express = require("express")

const orderRouter = express();
orderRouter.use(express.json())



module.exports ={
    orderRouter
}