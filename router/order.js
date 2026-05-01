const Router = require('express').Router();
const {create_order, get_order ,my_oders} = require('../controllers/order');
const {authmiddleware,adminmiddleware} = require('../middleware/authmiddleware');

Router.post('/', authmiddleware, create_order);
Router.get('/myOrders', authmiddleware, my_oders);
Router.get('/getOrders', adminmiddleware, get_order);

module.exports = Router;