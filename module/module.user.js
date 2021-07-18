const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    email: String,
    age:String,
    currentJob:String,
    CityName: String,
    address: String,
});

module.exports = mongoose.model('users', userSchema);