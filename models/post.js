const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    caption: String,
    hashtags: [{
        type: String,        
    }],
    image: String,
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date:{
        type: Date,
        default: Date.nowS
    }
});

module.exports = mongoose.model('post', postSchema);