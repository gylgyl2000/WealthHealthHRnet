// Import database
const knex = require('./../db')

// Retrieve all employees
exports.employeesAll = async (req, res) => {
    // Get all employees from database
    knex
        .select('*') // select all records
        .from('employees') // from 'employees' table
        .then(userData => {
            // Send employees extracted from database in response
            res.json(userData)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving employees: ${err}` })
        })
}

// Create new employee
exports.employeesCreate = async (req, res) => {
    // Add new employee to database
    knex('employees')
    .insert({ // insert new record, a employee
        // 'avatar': `${req.protocol}://${req.get('host')}/images/${req.file.originalname}`,
        'avatar': req.body.avatar,
        'firstName': req.body.firstName,
        'lastName': req.body.lastName,
        'dateOfBirth': req.body.dateOfBirth,
        'startDate': req.body.startDate,
        'street': req.body.street,
        'city': req.body.city,
        'state': req.body.state,
        'zipCode': req.body.zipCode,
        'department': req.body.department
    })
        .then(() => {
            // Send a success message in response
            res.json({ message: `employee ${req.body.firstName} ${req.body.lastName} created.` })
        })
        .then(userData => {
            // Send employees extracted from database in response
            res.json(userData)
        })
        // .catch(err => {
        //     // Send a error message in response
        //     res.json({ message: `There was an error creating ${req.body.firstName}' ${req.body.lastName} employee: ${err}` })
        // })
}

// Update specific employee
exports.employeesUpdate = async (req, res) => {
    // Find specific employee in the database and update it
    knex('employees')
        .where('id', req.body.id) // find correct record based on id
        .update({ // update records
            'id': req.body.id,
            'avatar': req.body.avatar,
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'dateOfBirth': req.body.dateOfBirth,
            'startDate': req.body.startDate,
            'street': req.body.street,
            'city': req.body.city,
            'state': req.body.state,
            'zipCode': req.body.zipCode,
            'department': req.body.department
        })
        .then(() => {
            // Send a success message in response
            res.json({ message: `employee ${req.body.firstName} ${req.body.lastName} updated.` })
        })
        // .then(userData => {
        //     // Send employees extracted from database in response
        //     res.json(userData)
        // })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error updating ${req.body.firstName}' ${req.body.lastName} employee: ${err}` })
        })
}

// Remove specific employee
exports.employeesDelete = async (req, res) => {
    // Find specific employee in the database and remove it
    knex('employees')
        .where('id', req.body.id) // find correct record based on id
        .del() // delete the record
        .then(() => {
            // Send a success message in response
            res.json({ message: `employee ${req.body.id} deleted.` })
        })
        // .then(userData => {
        //     // Send employees extracted from database in response
        //     res.json(userData)
        // })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error deleting ${req.body.id} employee: ${err}` })
        })
}

// Remove all employees on the list
exports.employeesReset = async (req, res) => {
    // Remove all employees from database
    knex
        .select('*') // select all records
        .from('employees') // from 'employees' table
        .truncate() // remove the selection
        .then(() => {
            // Send a success message in response
            res.json({ message: 'employee list cleared.' })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error resetting employee list: ${err}.` })
        })
}
