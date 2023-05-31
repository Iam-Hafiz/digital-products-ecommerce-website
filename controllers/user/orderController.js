const { Order } = require("../../model/orderModel")
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

const Save_order = (req, res) => {
    let getUserId = null
   // const { products, totalPrice, totalProducts } = req.body;
    const token = req.cookies.jwtCookie;
    jwt.verify(token, process.env.jwt_secret, (err, decodedToken) => {
        //console.log('tocken content is :', decodedToken);
        getUserId = decodedToken.id;
    });
    //console.log(getUserId)
    if(getUserId){
        const order = new Order({
            userId: getUserId,
            products: req.body.products,
            totalProducts: req.body.totalProducts,
            totalPrice: req.body.totalPrice,
        })
        order.save()
        .then(result => {
            res.status(201).json({ order: true });
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ orderFailed: true, error: err });
        })
    }
}

module.exports = { Save_order };