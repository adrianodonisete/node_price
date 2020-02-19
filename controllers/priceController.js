module.exports.getPrice = (req, res) => {
    let code_stock;
    if (req.params.stock !== undefined) {
        code_stock = req.params.stock.toUpperCase();
    } else if (req.query.stock !== undefined) {
        code_stock = req.query.stock.toUpperCase();
    } else {
        code_stock = 'LINX3.SA';
    }
    
    if (code_stock.indexOf('.SA') == -1) {
        code_stock += '.SA'
    }

    var unirest = require('unirest');  
    var req = unirest('GET', 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=NP75EV2DGLZWIGHM&symbol='+code_stock)
    .end(function (resp) { 
        if (resp.error) {
            res.render('b3', { title: 'Cotações B3', objStock: {}, resError: true, errorMsg: resp.error});
        }

        if (!resp.error && resp.status == 200) {
            let objStock = resp.body;

            if (objStock['Global Quote'] !== undefined) {
                const Currency = require('../helpers/Currency');
                const currency = new Currency();

                const dateFormat = require('dateformat');
                let date = objStock['Global Quote']['07. latest trading day'];
                date = new Date(date);

                objStock['Global Quote']['05. price'] = currency.formatCurrency(objStock['Global Quote']['05. price'], 2, ',', '.');
                objStock['Global Quote']['10. change percent'] = currency.formatCurrency(objStock['Global Quote']['10. change percent'], 2, ',', '.');

                objStock['Global Quote']['07. latest trading day'] = dateFormat(date, 'dd/mm/yyyy');
            }
        
            res.render('b3', { title: 'Cotações B3', objStock: objStock, resError: false, errorMsg: ''});
        }
    });
};

module.exports.listStocks = (req, res) => {
    // arrStock = {
    //     'abev3': 'Ambev',
    // };
    const arrStock = [
        'ABEV3',
        'B3SA3',
        'BBDC3',
        'COGN3',
        'EGIE3',
        'ENBR3',
        'EQTL3',
        'FLRY3',
        'GRND3',
        'IRBR3',
        'ITUB3',
        'LEVE3',
        'LINX3',
        'LREN3',
        'MDIA3',
        'ODPV3',
        'PSSA3',
        'RADL3',
        'WEGE3',
        'BBPO11',
        'FIIB11',
        'GGRC11',
        'HGBS11',
        'HGLG11',
        'HGRE11',
        'KNRI11',
        'MXRF11',
        'VILG11',
        'VISC11',
        'XPML11',        
        'SMAC11',        
        'BOVA11',        
    ];
    res.render('stocks', { title: 'Cotações B3 - Lista de Ações', arrStock: arrStock});
};
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