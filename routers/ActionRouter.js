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
//Get action by ID
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

  //Post Action
  router.post("/", async (req, res) => {
    const action = req.body;
    
    try {
        const addAction = await actionDB.insert(action);
        res.status(200).json({message: "New action added successfully"});
    }
    
    catch (err){
        res.status(500).json({message: "Server error, couldn't add action."});
    }
});





  module.exports = router; 

