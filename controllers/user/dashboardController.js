const { User } = require("../../model/userModel")
const { Laptop } = require("../../model/laptopModel")

const user_dashboard_get = (req, res) => {
    res.render('users-views/user-dashboard', {title: 'Mon compte'} )
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
            
            //console.log(totalPrice)
        const totalLaptops = await Laptop.aggregate([
                { $match: { price: { $gte: 1600} } },
                { $project: { _id: 0,  total: { $sum: '$quantity' } } }
            ]);

           // console.log(totalLaptops)
        // user statistics
        const countUsers = await User.count({ isAdmin: { $ne: true } } )
        const date = new Date()
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
        console.log(lastYear)
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

