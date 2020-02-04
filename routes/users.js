var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/b3/:stock', function (req, res) {
  console.log('and this matches too');
  res.send(req.params.stock);
  // next();, next, id
})

module.exports = router;
