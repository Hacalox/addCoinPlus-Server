var request = require('request');

module.exports = function(app, db) {
  app.get('/number', (req, res) => {
    request('https://api.coin-hive.com/user/balance?secret='+ process.env.KEY_PRIVATE +'&name='+ req.query.name, function (error, response, body) {
      if (!error && response.statusCode == 200) {
      let BodyParsed = JSON.parse(body)
      let hashesMined = BodyParsed.balance
        request('https://www.cryptocompare.com/api/data/coinsnapshot/?fsym=XMR&tsym=USD', function (error, response, body) {
          if (!error && response.statusCode == 200) {
            BodyParsed = JSON.parse(body)
            let netHashesSecond = BodyParsed.Data.NetHashesPerSecond
            let blockReward = BodyParsed.Data.BlockReward
            request('https://min-api.cryptocompare.com/data/price?fsym=XMR&tsyms=USD', function (error, response, body) {
              if (!error && response.statusCode == 200) {
                BodyParsed = JSON.parse(body)
                let price = BodyParsed.USD
                price = parseFloat(price)
                netHashesSecond = parseFloat(netHashesSecond)
                blockReward = parseFloat(blockReward)
                hashesMined = parseFloat(hashesMined)
                let hashesSecondBlockDay = netHashesSecond / (720 * blockReward)
                let moneyMade = hashesMined * price / (hashesSecondBlockDay * 24 * 3600)
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ TotalHashes: hashesMined , TotalMoney: moneyMade}));
              }
              else{
                console.log(error);
              }
            })
          }
          else{
            console.log(error);
          }
        })
      }
      else{
        console.log(error);
      }
    })
  });
  app.get('/totalNumbers', (req, res) => {
  let foundations=['Wikimedia Foundation', 'Internet Archive', 'UNICEF', 'Doctors Without Borders']
  const foundationsLength = foundations.length
  let hashesMined = 0
  foundations.map((a,index) => {
    console.log(index, foundationsLength);
    request('https://api.coin-hive.com/user/balance?secret='+ process.env.KEY_PRIVATE +'&name='+ a, function (error, response, body) {
      if (!error && response.statusCode == 200){
      let BodyParsed = JSON.parse(body)
      console.log(BodyParsed.balance);
      hashesMined = BodyParsed.balance + hashesMined
      console.log(hashesMined);
      if(foundationsLength -1 == index) {
      request('https://www.cryptocompare.com/api/data/coinsnapshot/?fsym=XMR&tsym=USD', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          BodyParsed = JSON.parse(body)
          let netHashesSecond = BodyParsed.Data.NetHashesPerSecond
          let blockReward = BodyParsed.Data.BlockReward
          request('https://min-api.cryptocompare.com/data/price?fsym=XMR&tsyms=USD', function (error, response, body) {
            if (!error && response.statusCode == 200) {
              BodyParsed = JSON.parse(body)
              let price = BodyParsed.USD
              price = parseFloat(price)
              netHashesSecond = parseFloat(netHashesSecond)
              blockReward = parseFloat(blockReward)
              hashesMined = parseFloat(hashesMined)
              let hashesSecondBlockDay = netHashesSecond / (720 * blockReward)
              let moneyMade = hashesMined * price / (hashesSecondBlockDay * 24 * 3600)
              res.setHeader('Content-Type', 'application/json');
              res.send(JSON.stringify({ TotalHashes: hashesMined , TotalMoney: moneyMade}));
            }
            else{
              console.log(error);
            }
          })
        }
        else{
          console.log(error);
        }
      })
    }}})
  })



});
};
