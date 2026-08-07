const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydatabase');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    imageUrl: String,
});
module.exports = mongoose.model('User', userSchema);