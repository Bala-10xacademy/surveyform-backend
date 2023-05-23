const mongoose = require('mongoose')

const themeSchema = new mongoose.Schema({
    themeOpt: String,
    themeName: String,
    themeType: String,
    fromType: String,
    allQuestionMandatory: String,
    enableSkip: String,
    optionType: String,
    font: String,
    color: String
},{
    timestamps:true
})

module.exports =new mongoose.model('themes' , themeSchema)