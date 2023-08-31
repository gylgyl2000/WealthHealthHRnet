// Import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
// const http = require('http');
const path = require('path');
const multer = require('multer');
// Import database
const knex = require('./db')
// Import routes
const employeesRouter = require('./routes/employees-route')
const filesRouter = require('./routes/file-route')

const uploadFile = require("./middleware/upload");

// Set default port for express app
const PORT = process.env.PORT || 4001

// Create express app
const app = express()

// Apply middleware
// Note: Keep this at the top, above routes
app.use(express.json());
// app.use(helmet())
// app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

// app.use(express.urlencoded({ extended: true }));
// filesRouter(app);
let setCache = function (req, res, next) {
    // here you can define period in second, this one is 5 minutes
    const period = 31536000 
    // you only want to cache for GET requests
    if (req.method === 'GET') {
        res.set('Cache-control', `public, max-age=${period}`)
    } else {
        // for the other requests set strict no caching parameters
        res.set('Cache-control', `no-store`)
    }
    // remember to call next() to pass on the request
    next()
}
// now call the new middleware function in your app
app.use(setCache)

app.use('/uploads', express.static('./uploads'));

app.get('/posts', (req, res) => {
    const return_data = data => res.json(data);
    const handle_error = err => console.error(err);
  
    knex('employees')
        .where({})
        .then(return_data)
        .catch(handle_error);
});

// app.use('/images', filesRouter)
// const upload = multer({ dest: 'images/' });
// app.post("/upload", upload.single('fileToUpload'), (req, res) => {
//     res.json({
//         url: `/images/${req.file.originalname}`,
//     })
//     console.log(req.file);
//     res.send("upload complete");
// });

app.post('/submit', uploadFile, (req, res, next) => {
    console.log(req.file);
    console.log(req.body.text);
    knex('employees')
        .where('id', req.body.id)
        .insert({
            'avatar': req.file.path,
        })
        .then(res => console.log(res))
        .catch(err => console.error(err));
    return;
});

// Implement employees route
app.use('/employees', employeesRouter)


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
