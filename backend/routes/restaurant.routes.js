const express = require("express")

const restaurantRouter = express();
restaurantRouter.use(express.json())



module.exports ={
    restaurantRouter
}