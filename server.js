const express = require('express')

const server = express()
const ProjectRouter = require('./projects/project-router')
const ResourceRouter = require('./projects/resource-router')
const TaskRouter = require('./projects/task-router')

server.use(express.json())

server.use('/api/projects', ProjectRouter)
server.use('/api/resources', ResourceRouter)
server.use('/api/tasks', TaskRouter)

server.get('/', (req, res) => {
    server.send('<h1>Node DB Sprint Challenge</h1>')
})

module.exports = server