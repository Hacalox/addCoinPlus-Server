const express = require('express')
const app = express()
const bodyParser = require('body-parser');
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app, {});
app.listen(3000, () => {
  console.log('Working!');
});

app.get('/', function (req, res) {
  res.send('Hello World!')
})
