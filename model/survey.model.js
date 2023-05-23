const mongoose = require('mongoose')

const surveySchema = new mongoose.Schema({
    email:String,
    name:String,
    description:String,
    typeofsurvey:String,
    othercriteria:String,
    image:String,
    startdate:String,
    endDate:String
},{
    timestamps:true
})

module.exports =new mongoose.model('survey' , surveySchema)