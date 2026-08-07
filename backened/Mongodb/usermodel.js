const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydatabase');

const userSchema =mongoose.Schema({
    name:String,
    email:String,
    username:String
});

const userModel = mongoose.model('User', userSchema);
module.exports = { userModel };