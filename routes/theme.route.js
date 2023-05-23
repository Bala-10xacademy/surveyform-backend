const express = require('express');
const themeRouter = express.Router();
const Theme = require('../model/theme.model');

themeRouter.get('/themes', async (req, res) => {
    try {
      let allTheme = await Theme.find()
      res.status(200).json({
        status:"Success",
        result : allTheme
    })
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

themeRouter.post('/themes', async (req, res) => {
  try {
    const {
      themeOpt,
      themeName,
      themeType,
      fromType,
      allQuestionMandatory,
      enableSkip,
      optionType,
      font,
      color
    } = req.body;

    const newTheme = new Theme({
      themeOpt,
      themeName,
      themeType,
      fromType,
      allQuestionMandatory,
      enableSkip,
      optionType,
      font,
      color
    });
    const savedTheme = await newTheme.save();

    res.status(201).json(savedTheme);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = themeRouter;
