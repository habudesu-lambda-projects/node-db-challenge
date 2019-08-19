const express = require('express')

const router = express.Router()

const Project = require('./project-model.js')

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

//validation middlewares

async function validateProjectId( req, res, next ) {
    const { id } = req.params
    try {
        const project = await db('projects').where({id})
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

module.exports = router