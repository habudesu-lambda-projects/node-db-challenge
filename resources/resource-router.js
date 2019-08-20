const express = require('express')

const router = express.Router()

const Resource = require('./resource-model.js')

router.get('/', async (req, res) => {
    try {
        const resources = await Resource.getResources()
        res.status(200).json(resources)
    }
    catch(error) {
        res.status(500).json({ message: "Could Not Get Resources", error: error })
    }
})

router.post('/', validateResource, async (req, res) => {
    const body = req.body
    try {
        const resource = await Resource.addResource(body)
        res.status(201).json(resource)
    }
    catch(error) {
        res.status(500).json({ message: "Could Not Add Resource", error: error })
    }
})

//validation middlewares

function validateResource( req, res, next ) {
    const body = req.body
    if(!body.name) {
        res.status(400).json({ message: "Resource Name is Required" })
    } else {
        next()
    }
}

module.exports = router