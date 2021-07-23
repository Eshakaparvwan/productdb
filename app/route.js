// const { product } = require('../models/mongose.js');

module.exports=(app) =>{
    const product=require('./controllers/controller.js')

    app.post('/prod',product.create);
    app.get('/prod',product.findAll);
    app.put('/prod/:prodId',product.update);
    app.delete('/prod/:prodId',product.delete);

};