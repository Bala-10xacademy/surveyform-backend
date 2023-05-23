require('dotenv').config();
const express = require('express');
const surveyRouter = express.Router();
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const GridFsBucket = mongodb.GridFSBucket;
const client = new MongoClient(process.env.DB_URL);
const surveyModel = require('../model/survey.model')
 
const Storage = new GridFsStorage({
    url : process.env.DB_URL,
    file : (req , file) =>{
        console.log(file);
        return {
            bucketName : process.env.DB_COLLECTION,
            filename : `${Date.now()}_${file.originalname}`
        }
    }});

const Upload = multer({
    storage:Storage
})

surveyRouter.post('/survey' , Upload.single("image") , async(req , res)=>{
    console.log(req.body);
    try{
        let newSurvey = await new surveyModel({
            ...req.body,
            image : `image/${req.file.filename}`
        })
        console.log(newSurvey);
        let result = await newSurvey.save();
        res.status(200).json({
            status:"Success",
            message:"survey created Successfully",
            result:result
        })
    }
    catch(err){
        res.status(400).json({
            status:"Failed",
            message: err.message
        })
    }
});

surveyRouter.get('/surveys' , async(req , res)=>{
console.log("hello")
    try{
        let allSurveys = await surveyModel.find()
        res.status(200).json({
            status:"Success",
            result : allSurveys
        })
    }
    catch(err){
        res.status(400).json({
        status:"Failed",
        message: err.message
    })
    }
});

surveyRouter.get('/image/:name' , async(req , res) =>{
    try{
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const collection = new GridFsBucket(db , {
            bucketName: process.env.DB_COLLECTION
        })
        const loadImage = collection.openDownloadStreamByName(req.params.name);
        loadImage.on("data" , data=> res.status(200).write(data));
        loadImage.on('error' , (err)=>{
            res.status(400).send({status:"Failed" , message:err.message})
        })
        loadImage.on("end" , ()=>{
            res.end();
        })
    }
    catch(err){
        res.status(500).send({
            status:"Server Error",
            message:err.message
        })
    }
});

surveyRouter.delete('/survey/:_id', async (req, res) => {
    try {
        const surveyId = req.params._id;
        await surveyModel.findByIdAndDelete(surveyId);
        
        let allSurveys = await surveyModel.find();
        
        res.status(200).json({
            status: "Success",
            result: allSurveys
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
});

surveyRouter.put('/survey/:id', Upload.single("image"), async (req, res) => {
    const surveyId = req.params.id;
    console.log(req.body);
    try {
      let updatedSurvey = {
        ...req.body,
        image: `image/${req.file.filename}`
      };
      let result = await surveyModel.findByIdAndUpdate(surveyId, updatedSurvey, { new: true });
      if (!result) {
        return res.status(404).json({
          status: "Failed",
          message: "Survey not found"
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Survey updated successfully",
        result: result
      });
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: err.message
      });
    }
  });
  


module.exports = surveyRouter

