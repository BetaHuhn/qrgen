let mongoose = require('mongoose')
var Schema = mongoose.Schema;

let schema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    code: {
        type: String,
        required: true,
        unique: true 
    },
    url: {
        type: String,
        required: true,
        unique: true    
    },
    count: {
        type: Number
    },
    addedAt:{
        type: Date,
        required: true
    }
})

schema.methods.increase = function() {
    this.count += 1;
}

const Short = mongoose.model('Short', schema)
module.exports = Short