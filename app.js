const express = require('express')
const app = express()
const bodyParser = require('body-parser');
var cors = require('cors')
require('dotenv').config()

app.use(cors())
const port = process.env.PORT || 8000
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app, {});
app.listen(port, () => {
  console.log('Working!');
});

app.get('/', function (req, res) {
  res.send('Hello World!')
})
