const express = require('express')
const app = express()
const bodyParser = require('body-parser');
require('dotenv').config()

const port = process.env.PORT || 8000
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app, {});
app.listen(port, () => {
  console.log('Working!');
});

app.get('/', function (req, res) {
  res.send('Hello World!')
})
