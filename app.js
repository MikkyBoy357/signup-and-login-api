var createError = require('http-errors')
var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var app = express()

const userRouter = require('./api/routes/user')

// mongoose.connect(
//     'mongodb+srv://node-rest-shop:'
//     + process.env.MONGO_ATLAS_PW +
//     '@node-rest-shop-ynkrt.mongodb.net/test?retryWrites=true'
//     // {
//     //     useMongoClient: true
//     // }
// );

//mongoose.connect('mongodb+srv://node-rest-shop:node-rest-shop@node-rest-shop-ynkrt.mongodb.net/test?retryWrites=true')

const mongoUri = 'mongodb+srv://node-shop:' 
    + process.env.MONGO_ATLAS_PW
    + '@node-rest-shop-xjumf.mongodb.net/test?retryWrites=true&w=majority';
console.log(mongoUri);
mongoose.connect(mongoUri, {
    useNewUrlParser: true
});
console.log(mongoUri);
//mongoose.Promise = global.Promise;

mongoose.connection
    .once('open', ()=>console.log('Database Connected'))
    .on('error', (err)=>{
        console.log("Error Connecting to Database", err)
});

// local mongoose
// mongoose.connect('mongodb://localhost:27017/MEAN-CRUD-book-library', { promiseLibrary: require('bluebird') })
//     .then(() =>  console.log('Mongoose connection successful on mongodb://localhost:27017/MEAN-CRUD-book-library'))
//     .catch((err) => console.error(err));

mongoose.Promise = global.Promise

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Origin',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET')
    return res.status(200).json({})
  }
  next()
})

app.use('/user', userRouter)

// error handler
app.use(function (req, res, next) {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use(function (error, req, res, next) {
  res.status(error.status || 500)
  res.json({
    msg: 'Inside app.js error handler',
    error: {
      message: error.message
    }
  })
})

module.exports = app
