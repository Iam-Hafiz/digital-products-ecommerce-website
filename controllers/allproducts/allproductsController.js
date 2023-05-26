const { Laptop, AllinOne, Monitor } = require("../../model/laptopModel")

const products = async (req, res)=> {
    try {
        const laptops = await Laptop.find()
        const allinOnes = await AllinOne.find()
        const monitors = await Monitor.find()

        if(laptops && allinOnes && monitors) {
        // sent data to front-end js file
          res.status(201).json({ laptops, allinOnes, monitors });
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = { products };