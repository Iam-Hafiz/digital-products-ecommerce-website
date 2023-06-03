const { User } = require("../../model/userModel")
const { Order } = require("../../model/orderModel")
const { Laptop } = require("../../model/laptopModel")
const { ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

const user_dashboard_get = async (req, res) => {
    let getUserId = null;
    const token = req.cookies.jwtCookie;
    jwt.verify(token, process.env.jwt_secret, (err, decodedToken) => {
        if(err){
            console.log(err)
        } else {
            getUserId = decodedToken.id
        }
    });
    try {
        if(ObjectId.isValid(getUserId)){
            const orders = await Order.find({userId: getUserId}).sort({_id: -1})
            let orderInfo = [];
            if(orders){
                orders.forEach(order => {
                    const date = new Date(`${order.createdAt}`)
                    const dateFormat = new Intl.DateTimeFormat().format(date)
                    //console.log('date loock:', new Intl.DateTimeFormat().format(date))
                    orderInfo.push({ date: `${dateFormat}`, products: order.products, totalPrice: order.totalPrice })
                })
                //console.log('here:', orderInfo)
                res.render('users-views/user-dashboard', { orderInfo, title : 'Mon compte'})  
            } else {
                res.render('users-views/user-dashboard', { orderInfo, title : 'Mon compte'})
            }
        }  else {
            res.status(500).json({error: 'ID Invalid'})
        }
    } catch (error) {
        console.log(error)
    }
}

const admin_panel_get = async (req, res) => {
    try {
        const countlaptops = await Laptop.count()
        const laptops = await Laptop.find().sort({_id: -1})
        const totalPrice = await Laptop.aggregate([
                {
                  $group:
                    { _id: 0, totalAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } } }
                }
            ]);
            
        const totalLaptops = await Laptop.aggregate([
                { $match: { price: { $gte: 1600} } },
                { $project: { _id: 0,  total: { $sum: '$quantity' } } }
            ]);

           // console.log(totalLaptops)
        // user statistics
        const countUsers = await User.count({ isAdmin: { $ne: true } } )
        const date = new Date()
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
        //console.log('last year value:', lastYear)
        const data = await User.aggregate([
                { $match: { createdAt: { $gte: lastYear } } },

                //Passe along the documents with the requested fields to the next stage in the pipeline with $project
                { $project: { month: { $month: '$createdAt' } } },
                // sum 1 is equal to $count in this case
                { $group: { _id: '$month', total: { $sum: 1 } } }
            ]);
            
           // console.log(data)
        res.render('users-views/admin-panel', { countUsers, countlaptops, laptops, totalLaptops, totalPrice, data, title: 'Administrateur'} )
    } catch(err) {
        console.log(err)
        res.status(500).json('la requête envoyée par le navigateur n\'a pas pu être traitée pour une raison qui n\'a pas pu être identifiée' + err);
    }
}

module.exports = { user_dashboard_get, admin_panel_get };

