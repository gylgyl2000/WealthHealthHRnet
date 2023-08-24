// Import dependencies
// const bodyParser = require('body-parser')
// const compression = require('compression')
// const helmet = require('helmet')
// const http = require('http');
// const path = require('path');
// Import routes
// const employeesRouter = require('./routes/employees-route')
// const filesRouter = require('./routes/file-route')
const express = require('express')
const multer = require("multer")
const cors = require('cors')
const fs = require("fs")
const employeesRoutes = require('./controllers/employees-controller')

// Set default port for express app
const PORT = process.env.PORT || 4001

// Create express app
const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) =>{
        if (!fs.existsSync('images')) {
            fs.mkdirSync('images')
        }
        cb(null, 'images');
    },
    filename(_, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

// Apply middleware
// Note: Keep this at the top, above routes
app.use(express.json());
app.use(cors())
// app.use(helmet())
// app.use(compression())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// app.use(express.urlencoded({ extended: true }));
// filesRouter(app);

// Implement employees route
// app.use('/employees', employeesRouter)

app.use('/images', express.static('images'))

app.get('/all', employeesRoutes.employeesAll)
app.post('/create', employeesRoutes.employeesCreate)
app.put('/update', employeesRoutes.employeesUpdate)
app.put('/delete', employeesRoutes.employeesDelete)
app.put('/reset', employeesRoutes.employeesReset)

app.post('/upload', upload.single('image'), (req, res) =>{
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})

// Implement 500 error route
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something is broken.')
})

// Implement 404 error route
app.use(function (req, res, next) {
    res.status(404).send('Sorry we could not find that.')
})

// Start express app
app.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}`)
})

// const server = http.createServer(app);

// server.listen(PORT, () => {
//     console.log(`Server is running on: ${PORT}`)
// })
