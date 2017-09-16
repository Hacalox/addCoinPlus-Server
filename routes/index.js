var request = require('request');
let finalResult

module.exports = function(app, db) {
  app.get('/number', (req, res) => {
    console.log(req.query.name);
    request('https://api.coin-hive.com/user/balance?secret='+ process.env.KEY_PRIVATE +'&name='+ req.query.name, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        finalResult = body
      }
      else{
        console.log(error);
      }
    })
    // You'll create your note here.
    res.send(finalResult)
  });
};
