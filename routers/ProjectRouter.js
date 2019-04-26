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

  //Get project by ID
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


  //Post project
  router.post("/", async (req, res) => {
    const project = req.body;
    
    try {
        const addProject = await projectDB.insert(project);
        res.status(200).json({message: "New project added successfully"});
    }
    
    catch (err){
        res.status(500).json({message: "Server error, couldn't add project."});
    }
});

//Delete by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
     
        const project = await projectDB.get(id);
     
        if (!project) {
        res.status(404).json({ message: "This is not the project you're looking for. project not found." });
      } 
      else {
        await projectsDb.remove(project.id);
        res.json(project);
      }
    } 
    
    catch (err) {
      res.status(500).json({
        message: "Server error, couldn't Delete project."
      });
    }
  });

//Update by ID
router.put("/:id", async (req, res) => {
    
    const { id } = req.params;
   
    const putProject = req.body;
    
    try {
      const project = await projectDB.get(id);

      if (!project) {
        res.status(404).json({ message: "This is not the project you're looking for. project not found." });
      } 
      
      else {
        await projectD .update(id, putProject);
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
