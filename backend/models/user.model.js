const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    email: {type:String,unique:true},
    password: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    }
})

const UserModel = mongoose.model("user", userSchema)

module.exports = {
    UserModel
}