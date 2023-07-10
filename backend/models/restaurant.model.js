const mongoose = require("mongoose")

const restaurantSchema = mongoose.Schema({
    name: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
    },
    menu: [{
      _id: ObjectId,
      name: String,
      description: String,
      price: Number,
      image: String
    }]
})

const RestaurantModel = mongoose.model("restaurant", restaurantSchema
)

module.exports = {
    RestaurantModel
}