var express = require('express');
var env = require('dotenv').config();

const db = require('./helper/db')() ;

var indexRouter = require('./routes/index');

var app = express();

app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

// error handler
app.use(function(err, req, res, next) {
  res.send(`Server Error : ${err.message}` );
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Example app listening on port ${process.env.SERVER_PORT}`)
})
