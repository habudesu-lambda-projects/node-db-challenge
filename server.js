const express = require('express')

const server = express()
const ProjectRouter = require('./projects/project-router')
const ResourceRouter = require('./resources/resource-router')

server.use(express.json())

server.use('/api/projects', ProjectRouter)
server.use('/api/resources', ResourceRouter)

server.get('/', (req, res) => {
    res.send('<h1>Node DB Sprint Challenge</h1>')
})

module.exports = server