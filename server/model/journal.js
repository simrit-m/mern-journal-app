const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalSchema = new Schema({
    title : {
        type : String
    },
    description : {
        type: String
    },
    date  :{
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("Journal", journalSchema);