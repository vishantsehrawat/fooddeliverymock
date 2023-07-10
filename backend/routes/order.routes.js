const express = require("express");
const { OrderModel } = require("../models/order.model");

const orderRouter = express();
orderRouter.use(express.json())

orderRouter.post("/", async (req, res) => {
    const order = req.body
    // console.log("🚀 ~ file: order.routes.js:9 ~ orderRouter.get ~ order:", order)
    try {
        const newOrder = await OrderModel(order)
        newOrder.save()
        res.status(201).send({ msg: "new order added" })
    } catch (error) {
        res.status(400).send({ msg: "error occured", error: error })
        console.log(error)
    }
})


// get details of specific order 

orderRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log("🚀 ~ file: order.routes.js:25 ~ orderRouter.get ~ id:", id)
    try {
        const order = await OrderModel.findOne({ _id: id })
        console.log("🚀 ~ file: order.routes.js:30 ~ orderRouter.get ~ order:", order)
        res.status(201).send({ msg: "order data fetched", data: order })
    } catch (error) {
        res.status(400).send({ msg: "error occured", error: error })
        console.log(error)
    }
})

//update order status

orderRouter.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const {status} = req.body;
    console.log("🚀 ~ file: order.routes.js:25 ~ orderRouter.get ~ id:", id)
    try {
        const order = await OrderModel.findOne({ _id: id })
        order.status = status
        const updatedOrder = await OrderModel(order)
        updatedOrder.save()
        res.status(201).send({ msg: "status updated", data: order })
    } catch (error) {
        res.status(400).send({ msg: "error occured", error: error })
        console.log(error)
    }
})
module.exports = {
    orderRouter
}