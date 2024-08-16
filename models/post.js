const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    caption: String,
    hashtags: [{
        type: String,        
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],
    image: String,
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    username : {
        type : mongoose.Schema.Types.String,
        ref: 'user'
    },
    date:{
        type: Date,
        default: Date.nowS
    }
});

module.exports = mongoose.model('post', postSchema);