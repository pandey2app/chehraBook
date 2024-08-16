const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chehraBook');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    username: String,
    image: String,
    phone: String,
    posts : [{type : mongoose.Schema.Types.ObjectId, ref: 'post'}],
    likedPosts : [{type : mongoose.Schema.Types.ObjectId, ref: 'post'}]
});

module.exports = mongoose.model('user', userSchema);