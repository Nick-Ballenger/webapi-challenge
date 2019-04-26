const express = require('express');
const router = express.Router();

const actionDB =require('../data/helpers/actionModel')

//Get list of Actions
router.get("/", async (req, res) => {
    
    try {
      const actionList = await actionDB.get();
      res.json(actionList);
    } 
    
    catch (err) {
      res.status(500).json({ message: `Server error, couldn't retrieve list` });
    }
  });

  router.get("/:Id", async (req, res) => {
    const {ID} = req.params;
    try {
      const action = await actionDB.get(ID);

      if (!action) {
        res.status(404).json({ message: "This is not the action you're looking for. Action not found" });
      } 
      
      else {
        res.json(action);
      }
    } 
    
    catch (err) {
      res
        .status(500)
        .json({ message: "Server error, couldn't retrieve action." });
    }
  });



  module.exports = router; 

