const express = require("express");
const { RestaurantModel } = require("../models/restaurant.model");

const restaurantRouter = express.Router();
restaurantRouter.use(express.json())


// get list of all the restaurants

restaurantRouter.get("/", async (req, res) => {
    try {
        const restaurants = await RestaurantModel.find({})
        // console.log("🚀 ~ file: restaurant.routes.js:13 ~ restaurantRouter.get ~ restaurants:", restaurants)

        res.status(200).send({ msg: "all the restaurants", data: restaurants })
    } catch (error) {
        res.status(400).send({ msg: "error occured", error: error })
        console.log(error)
    }
})

// get particular restaurant by id

restaurantRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const restaurants = await RestaurantModel.find({ _id: id })
        console.log("🚀 ~ file: restaurant.routes.js:13 ~ restaurantRouter.get ~ restaurants:", restaurants)

        res.status(200).send({ msg: "all the restaurants", data: restaurants })
    } catch (error) {
        res.status(400).send({ msg: "error occured", error: error })
        console.log(error)
    }
})

// get menu of particular restaurant
restaurantRouter.put("/:id/menu", async (req, res) => {
    const { id } = req.params
    console.log("🚀 ~ file: restaurant.routes.js:40 ~ restaurantRouter.put ~ id:", id)
    const menu = req.body;
    console.log("🚀 ~ file: restaurant.routes.js:41 ~ restaurantRouter.put ~ menu:", menu)
    try {
        const restaurants = await RestaurantModel.findOne({ _id: id })
        // console.log("🚀 ~ file: restaurant.routes.js:13 ~ restaurantRouter.get ~ restaurants:", restaurants.menu)
        restaurants.menu.push(menu);
        // console.log("🚀 ~ file: restaurant.routes.js:45 ~ restaurantRouter.put ~ restaurants:", restaurants.menu)
        const updatedRestaurant = await RestaurantModel(restaurants)
        updatedRestaurant.save();

        res.status(201).send({ msg: "menu added to restaurant", data: restaurants })
    } catch (error) {
        res.status(400).send({ msg: "error occured", error: error })
        console.log(error)
    }
})

module.exports = {
    restaurantRouter
}