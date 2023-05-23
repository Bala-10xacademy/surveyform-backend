const express = require('express');
const quesRouter = express.Router();
const surveyModel = require('../model/question.model');

quesRouter.post('/ques', async (req, res) => {
  try {
    const { question, options } = req.body;

    if (!question || !options || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Invalid question or options provided'
      });
    }

    const newQues = new surveyModel({
      question: question,
      options: options
    });

    const result = await newQues.save();

    res.status(200).json({
      status: 'Success',
      message: 'MCQ question created successfully',
      mcq: result
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message
    });
  }
});

module.exports = quesRouter;
