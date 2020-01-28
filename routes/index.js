var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/b3', function(req, res, next) {
  // console.log('b3 passando');

  // ---------------
  var unirest = require('unirest');
  // console.error('1.');

  var req = unirest('GET', 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=NP75EV2DGLZWIGHM&symbol=LINX3.SA')
    .end(function (resp) { 
      // console.error(resp);

      // if (resp.error) throw new Error(resp.error); 

      if (!resp.error && resp.status == 200) {
        res.send(resp.body);
      }
    });
  // ---------------
});

module.exports = router;


/*




    
  // var https = require('follow-redirects').https;
  const { http, https } = require('follow-redirects');
  const fs = require('fs');

  var options = {
    'method': 'GET',
    'hostname': 'www.alphavantage.co',
    'path': '/query?function=GLOBAL_QUOTE&apikey=NP75EV2DGLZWIGHM&symbol=WEGE3.SA',
    'headers': {
    },
    'maxRedirects': 20
  };

  var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      console.error('1.');
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      console.error('2.');
      var body = Buffer.concat(chunks);
      console.log(body.toString());
      console.error('3.');
    });

    res.on("error", function (error) {
      console.error('4.');
      console.error(error);
    });
  });

  req.end(() => {
    console.error('6.');
  });
*/