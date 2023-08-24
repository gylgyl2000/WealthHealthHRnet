// Import path module
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: dbPath,
    },
    useNullAsDefault: true
})

// Create a table in the database called "employees"
knex.schema
    // Make sure no "employees" table exists before trying to create new
    .hasTable('employees')
        .then((exists) => {
            if (!exists) {
                // If no "employees" table exists create new, with "id", "firstName", "lastName",
                // "dateOfBirth", "startDate", "street", "city", "state", "zipCode" and "department" columns
                // and use "id" as a primary identification and increment "id" with every new record (employee)
                return knex.schema.createTable('employees', (table)  => {
                    table.increments('id').primary()
                    table.string('avatar')
                    table.string('firstName')
                    table.string('lastName')
                    table.date('dateOfBirth')
                    table.date('startDate')
                    table.string('street')
                    table.string('city')
                    table.string('state')
                    table.integer('zipCode')
                    table.string('department')
                })
                .then(() => {
                    // Log success message
                    console.log('Table \'Employees\' created')
                })
                .catch((error) => {
                    console.error(`There was an error creating table: ${error}`)
                })
            }
        })
        .then(() => {
            // Log success message
            console.log('done')
        })
        .catch((error) => {
            console.error(`There was an error setting up the database: ${error}`)
        })

// Just for debugging purposes:
// Log all data in "employees" table
knex.select('*').from('employees')
    .then(data => console.log('data:', data))
    .catch(err => console.log(err))

// Export the database
module.exports = knex