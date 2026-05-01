const expressasynchandler = require('express-async-handler');
const order_model = require('../models/order');

const create_order = expressasynchandler(async(req,res)=>{
    const {items}= req.body.items;
    let total_price = 0;
    let total_items = 0;
    let order_items = [];
    items.forEach(item => {
        total_price += item.price * item.quantity;
        total_items += item.quantity;
        order_items.push({
            id : item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
        });

    });
    const new_order = await order_model.create({
        user: req.user.id,
        items: order_items,
        total_price: total_price,
        total_items: total_items
    });
    console.log(`new order created successfully as ${new_order} by the user ${req.user.email}`);
    return res.status(201).json(new_order);
});

const my_oders = expressasynchandler(async(req,res)=>{
    const user_id = req.user.id;
    const orders = await order_model.find({user: user_id});
    return res.status(200).json(orders);
});

const get_order = expressasynchandler(async(req,res)=>{
    const orders = order_model.find();
    return res.status(200).json(orders);
});

module.exports = {create_order, my_oders, get_order};