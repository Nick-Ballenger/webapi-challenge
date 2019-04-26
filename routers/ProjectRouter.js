const express = require('express');
const router = express.Router();

const projectDB =require('../data/helpers/projectModel')

//Get List of Projects
router.get("/", async (req, res) => {
    
    try {
      const projectList = await projectDB.get();
      res.json(projectList);
    } 
    
    catch (err) {
      res.status(500).json({ message: `Server error couldn't retrieve list` });
    }
  });

  router.get("/:Id", async (req, res) => {
    const {ID} = req.params;
    try {
      const project = await projectDB.get(ID);

      if (!project) {
        res.status(404).json({ message: "This is not the project you're looking for. project not found" });
      } 
      
      else {
        res.json(project);
      }
    } 
    
    catch (err) {
      res
        .status(500)
        .json({ message: "Server error, couldn't retrieve project." });
    }
  });



  module.exports = router; 
