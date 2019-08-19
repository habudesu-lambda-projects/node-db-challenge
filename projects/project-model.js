const db = require('../data/db-config.js')

module.exports = {
    getProjects,
    getProjectById,
    addProject,
    addTask,
    getTasks
}

function getProjects() {
    return db('projects')
}

function getProjectById(id) {
    return db('projects').where({id})
}

function addProject(project) {
    return db('projects').insert(project)
}

function addTask(task, projectId) {
    return db('tasks').insert({...task, "projectId": projectId})
}

function getTasks(projectId) {
    return db('tasks').where({projectId})
}