const { collectDefaultMetrics, register } = require('prom-client');

collectDefaultMetrics();

var express = require('express');
var app = express();
var uuid = require('node-uuid');
const fs = require('fs');

var pg = require('pg');
const conString = {
    user: process.env.DBUSER,
    database: process.env.DB,
    password: process.env.DBPASS,
    host: process.env.DBHOST,
    port: process.env.DBPORT                
};

// Metrics 
app.get('/metrics', async (_req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});
// test 
app.get('/test', async (_req, res)=>{
  const data = fs.readFileSync('resumeData.json', 'utf8');
  const databases = JSON.parse(data);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(databases)
})
// Routes
app.get('/api/status', function(req, res) {
//'SELECT now() as time', [], function(err, result
  
  const Pool = require('pg').Pool
  const pool = new Pool(conString)
  // connection using created pool
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT now() as time', (err, result) => {
      release()
    if (err) {
      console.log(err);
      return console.error('Error executing query', err.stack)
    }
    res.status(200).send(result.rows);
  });
});

  // pool shutdown
  pool.end()
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
