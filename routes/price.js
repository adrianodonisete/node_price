var express = require('express');
var router = express.Router();

router.get('/b3', function(req, res, next) {
    let code_stock;
    if (req.query.stock === undefined || req.query.stock == '') {
        code_stock = 'LINX3.SA';
    } else {
        code_stock = req.query.stock.toUpperCase();
        if (code_stock.indexOf('.SA') == -1) {
            code_stock += '.SA'
        }
    }

    var unirest = require('unirest');  
    var req = unirest('GET', 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=NP75EV2DGLZWIGHM&symbol='+code_stock)
    .end(function (resp) { 
        if (resp.error) {
            // throw new Error(resp.error); 
            res.render('b3', { title: 'Cotações B3', objStock: {}, resError: true, errorMsg: resp.error});
        }

        if (!resp.error && resp.status == 200) {
            let objStock = resp.body;
            console.log(objStock);

            if (objStock['Global Quote'] !== undefined) {
                const Currency = require('../helpers/Currency');
                const currency = new Currency();

                const dateFormat = require('dateformat');
                let date = new Date(objStock['Global Quote']['07. latest trading day']);

                objStock['Global Quote']['05. price'] = currency.formatCurrency(objStock['Global Quote']['05. price'], 2, ',', '.');
                objStock['Global Quote']['09. change'] = currency.formatCurrency(objStock['Global Quote']['09. change'], 2, ',', '.');

                objStock['Global Quote']['07. latest trading day'] = dateFormat(date, 'dd/mm/yyyy');
            }
        
            res.render('b3', { title: 'Cotações B3', objStock: objStock, resError: false, errorMsg: ''});
        }
    });
});
  
module.exports = router;
  

/*
{
  "Global Quote": {
    "01. symbol":"LINX3.SA",
    "02. open":"35.4200",
    "03. high":"35.7800",
    "04. low":"34.9800",
    "05. price":"35.1900",
    "06. volume":"470000",
    "07. latest trading day":"2020-01-29",
    "08. previous close":"35.4200",
    "09. change":"-0.2300",
    "10. change percent":"-0.6493%"
  }
}
*/