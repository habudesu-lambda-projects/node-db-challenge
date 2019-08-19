const db = require('../data/db-config.js')

module.exports = {
    getResources,
    getResourceById,
    addResource
}

function getResources() {
    return db('resources')
}

function getResourceById(id) {
    return db('resources').where({id})
}

function addResource(resource) {
    return db('resources').insert(resource)
}