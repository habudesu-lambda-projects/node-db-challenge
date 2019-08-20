const express = require('express')

const router = express.Router()

const Project = require('./project-model.js')

function completedToText(item) {
    if(item.completed === 0) {
        item.completed = 'false'
    } else {
        item.completed = 'true'
    }
    return item
}

router.get('/', async (req, res) => {
    try {
        const projects = await Project.getProjects()
        res.status(200).json(projects.map(project => completedToText(project)))
    }
    catch(error) {
        res.status(500).json({ message: "Could Not Get Projects", error: error})
    }
    
})

router.get('/:projectId', validateProjectId, async (req, res) => {
    res.status(200).json(completedToText(req.project))
})

router.post('/', validateProject, async (req, res) => {
    const body = req.body
    try {
        const project = await Project.addProject(body)
        res.status(201).json(completedToText(project))
    }
    catch(error) {
        res.status(500).json({ message: "Could Not Create New Project", error: error })
    }
})

router.post('/:projectId/tasks', validateProjectId, validateTask, async (req, res) => {
    const {projectId} = req.params
    const body = req.body
    try {
        const task = await Project.addTask(body, projectId)
        res.status(201).json(completedToText(task))
    }
    catch(error) {
        res.status(500).json({ message: "Could Not Create Task", error: error })
    }
})

router.get('/:projectId/tasks', validateProjectId, async (req, res) => {
    const {projectId} = req.params
    try {
        const tasks = await Project.getTasks(projectId)
        const project = await Project.getProjectById(projectId)
        res.status(200).json({
            project: completedToText(project),
            tasks: tasks.map(task => completedToText(task))})
    }
    catch(error) {
        res.status(500).json({ message: "Could Not Get Tasks", erro: error })
    }
})

//validation middlewares

async function validateProjectId( req, res, next ) {
    const { projectId } = req.params
    try {
        const project = await Project.getProjectById(projectId)
        if(project) {
            req.project = project
            next()
        } else {
            res.status(404).json({ message: `Project with id: ${projectId} does not exist`})
        }
    }
    catch(error) {
        res.status(500).json({ message: "Error with validateProjectId", error: error })
    }
}

function validateProject( req, res, next ) {
    const body = req.body
    if(!body.name) {
        res.status(400).json({ message: "Project Name is Required" })
    } else {
        next()
    }
}

function validateTask( req, res, next ) {
    const body = req.body
    if(!body.description) {
        res.status(400).json({ message: "Task Description is Required" })
    } else {
        next()
    }
}

module.exports = router