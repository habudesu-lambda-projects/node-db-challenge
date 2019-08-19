const express = require('express')

const router = express.Router()

const Project = require('./project-model.js')

router.get('/', async (req, res) => {
    try {
        const projects = await Project.getProjects()
        res.status(200).json(projects)
    }
    catch(error) {
        res.status(500).json({ message: "Could Not Get Projects", error: error})
    }
    
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', validateProject, async (req, res) => {
    const body = req.body
    try {
        const project = await Project.addProject(body)
        res.status(201).json(project)
    }
    catch(error) {
        res.status(500).json({ message: "Could Not Create New Project", error: error })
    }
})

//validation middlewares

async function validateProjectId( req, res, next ) {
    const { id } = req.params
    try {
        const project = await Project.getProjectById(id)
        if(project) {
            req.project = project
            next()
        } else {
            res.status(404).json({ message: `Project with id: ${id} does not exist`})
        }
    }
    catch(error) {
        res.status(500).json({ message: "Error with validateProjectId", error: error })
    }
}

function validateProject( req, res, next) {
    const body = req.body
    if(!body.name) {
        res.status(400).json({ message: "Project Name is Required" })
    } else {
        next()
    }
}

module.exports = router