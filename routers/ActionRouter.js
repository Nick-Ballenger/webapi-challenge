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

//Delete by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
     
        const action = await actionDB.get(id);
     
        if (!action) {
        res.status(404).json({ message: "This is not the action you're looking for. Action not found." });
      } 
      else {
        await actionsDb.remove(action.id);
        res.json(action);
      }
    } 
    
    catch (err) {
      res.status(500).json({
        message: "Server error, couldn't Delete action."
      });
    }
  });  


//update by ID
router.put("/:id", async (req, res) => {
    
    const { id } = req.params;
   
    const putAction = req.body;
    
    try {
      const action = await actionDB.get(id);

      if (!action) {
        res.status(404).json({ message: "This is not the action you're looking for. Action not found." });
      } 
      
      else {
        await actionD .update(id, putAction);
        res.json({ message: "Woo! Action updated" });
      }
    } 
    
    catch (err) {
      res.status(500).json({
        message: "Server error, couldn't update"
      });
    }
  });





  module.exports = router; 

