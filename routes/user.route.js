const express = require('express');
const userRouter = express.Router();
const userModel = require('../model/user.model')



userRouter.post('/register', async (req, res) => {
    console.log(req.body)
    const { name, email, phoneNumber, profession, password } = req.body;

    if (!name || !email || !phoneNumber || !profession || !password) {
        return res.status(400).send('Insufficient Data');
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).send('User with this email already exists plss login');
        }

        const new_student = new userModel({ name, email, phoneNumber, profession, password });
        const result = await new_student.save();

        res.status(201).send(result);
    } catch (err) {
        console.error(`Error inserting data: ${err.message}`);
        res.status(500).send('Internal Server Error');
    }
});

const jwt = require('jsonwebtoken');
const SECRETKEY = 'MYSECRETKEY';

userRouter.post('/login' , async(req , res)=>{
    const {email , password} = req.body;
    if (!email || !password) {
        return res.status(400).send('Insufficient Data');
    }
    try{
        const user = await userModel.findOne({ email });
        if(user){
            if(user.password == password){
                jwt.sign(user.email , SECRETKEY , (err , token)=>{
                    res.status(202).send({token});
                })
                
            }else{
                res.status(401).send("Incorrect Password");
            }
        }else{
            res.status(404).send("No user Found");
        }
    }
    catch (err) {
        console.error(`Error inserting data: ${err.message}`);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = userRouter;



