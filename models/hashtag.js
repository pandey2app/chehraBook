const mongoose = require('mongoose');


const hashtagSchema = mongoose.Schema({
    tag: {
        type: String,
    },
    used: {type: Number, default: 1},
});

module.exports = mongoose.model('hashtag', hashtagSchema);