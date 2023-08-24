// Import express
const express = require('express')

// Import employees-controller
const employeesRoutes = require('./../controllers/employees-controller.js')

// Create router
const router = express.Router()

const multer = require('../middleware/upload.js')
const filesRoutes = require('./../controllers/file-controller.js')

// Add route for GET request to retrieve all employee
// In server.js, employees route is specified as '/employees'
// this means that '/all' translates to '/employees/all'
router.get('/all', employeesRoutes.employeesAll)

// Add route for POST request to create new employee
// In server.js, employees route is specified as '/employees'
// this means that '/create' translates to '/employees/create'
router.post('/create', employeesRoutes.employeesCreate)

// Add route for PUT request to update specific employee
// In server.js, employees route is specified as '/employees'
// this means that '/update' translates to '/employees/update'
router.put('/update', employeesRoutes.employeesUpdate)

// Add route for PUT request to delete specific employee
// In server.js, employees route is specified as '/employees'
// this means that '/delete' translates to '/employees/delete'
router.put('/delete', employeesRoutes.employeesDelete)

// Add route for PUT request to reset employeeshelf list
// In server.js, employees route is specified as '/employees'
// this means that '/reset' translates to '/employees/reset'
router.put('/reset', employeesRoutes.employeesReset)

// router.post('/upload', filesRoutes.upload)

// Export router
module.exports = router