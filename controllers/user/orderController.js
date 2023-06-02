const { Order } = require("../../model/orderModel")
const { Laptop } = require("../../model/laptopModel")
const { ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

const Save_order = (req, res) => {
    var getUserId = null;
   //console.log( req.cookies.jwtCookie)
    const token = req.cookies.jwtCookie;
    jwt.verify(token, process.env.jwt_secret, (err, decodedToken) => {
        if(err){
            console.log(err)
        } else {
            getUserId = decodedToken.id
        }
        //console.log('tocken content is :', decodedToken);
    });

    const productId = req.body.productId
    const quantity = req.body.productsInCart
    const title = req.body.title
    const totalProducts = req.body.totalProducts
    const totalPrice = req.body.totalPrice

    if(productId && quantity && title && productId.length === quantity.length && quantity.length === title.length) {
        var products = [];
        for (let i = 0; i < quantity.length; i++ ) {
            if(ObjectId.isValid(productId[i])){
                products.push({ productId: productId[i], quantity: quantity[i], title: title[i] })
            }  else {
                res.status(500).json({error: 'ID Invalid'})
            }
        }

        //console.log('products are:', products)
        if(getUserId){
            //console.log('user id is :', getUserId)
            const order = new Order({
                userId: getUserId,
                products: products,
                totalProducts: totalProducts,
                totalPrice: totalPrice,
            })
            order.save()
            .then(result => {
                res.render('users-views/order', { order: true, title: 'Commande'})
            })
            .catch((err) => {
                console.log(err)
                res.render('users-views/order', { order: false, title: 'Commande'})
            })
        }
    } else {
        if(ObjectId.isValid(productId)){
            if(getUserId && productId && quantity && title && totalPrice && totalProducts){
                products = [{productId, quantity, title }];
                const order = new Order({
                    userId: getUserId,
                    products: products,
                    totalProducts: totalProducts,
                    totalPrice: totalPrice,
                })
                order.save()
                .then(result => {
                    res.render('users-views/order', { order: true, title: 'Commande'})
                })
                .catch((err) => {
                    console.log(err)
                    res.render('users-views/order', { order: false, title: 'Commande'})
                })
            } else {
                res.render('users-views/order', { order: false, title: 'Commande'})
            }
        }else {
            res.status(500).json({error: 'ID Invalid'})
        }
    }
}

module.exports = { Save_order };