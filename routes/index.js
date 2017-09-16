var request = require('request');

module.exports = function(app, db) {
  app.get('/number', (req, res) => {
    console.log(req.query.name);
    request('https://api.coin-hive.com/user/balance?secret='+ process.env.KEY_PRIVATE +'&name='+ req.query.name, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body) // Print the google web page.
      }
      else{
        console.log(error);
      }
    })
    // You'll create your note here.
    console.log(req.body);
    // console.log(req);
    res.send(req.body)
  });
};
