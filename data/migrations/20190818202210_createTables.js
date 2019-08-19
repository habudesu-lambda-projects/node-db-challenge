
exports.up = function(knex) {
  knex.schema
    .createTable('projects', tbl => {
        tbl.increment()
        tbl.string('name').notNullable()
        tbl.string('description')
        tbl.boolean('completed').notNullable().defaultTo('false')
    })
    .createTable('resources', tbl => {
        tbl.increment()
        tbl.string('name').notNullable()
        tbl.string('description')
    })
    .createTable('tasks', tbl => {
        tbl.increment()
        tbl.string('description').notNullable()
        tbl.string('notes').notNullable()
        tbl.boolean('completed').notNullable().defaultTo('false')
        tbl.integer('projectId').unsigned().notNullable().references('projects.id')
    })
    .createTable('project_resource', tbl => {
        tbl.increment()
        tbl.integer('projectId').unsigned().notNullable().references('projects.id')
        tbl.integer('resourceId').unsigned().notNullable().references('resources.id')
    })
};

exports.down = function(knex) {
  knex.schema
    .dropTableIfExists('project_resource')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
