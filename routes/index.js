var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/b3', function(req, res, next) {
  console.log('b3 passando')
  var unirest = require('unirest');
  var content = 'b';

  var req = unirest('GET', 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=NP75EV2DGLZWIGHM&symbol=LINX3.SA')
    .end(function (resp) { 
      if (resp.error) throw new Error(resp.error); 
      console.log(content);
      content = resp.raw_body;
      console.log(content);
      // console.log(resp.raw_body);
    });
    
  
    res.send(content);
});

module.exports = router;
