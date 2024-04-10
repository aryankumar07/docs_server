const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    uid : {
        type : String,
        requierd : true,
    },
    createdAt : {
        type : Number,
        requierd : true,
    },
    title : {
        type : String,
        requierd : true,
        trim : true,
    },
    content : {
        type : Array,
        default : [],
    }
});

const document = mongoose.model('Document',documentSchema);

module.exports = document;