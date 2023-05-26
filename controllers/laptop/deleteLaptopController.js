const { Laptop } = require("../../model/laptopModel")
const fileSystem = require('fs')
const { ObjectId } = require('mongodb')

const deleteLaptop = (req, res) => {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
        Laptop.findOne({ _id: id })
        .then(laptop => {
            // If no ressource found, send error 404
            if (!laptop) {
                res.status(404).send(`Erreur 404: la ressource n'a pas été trouvé !`);
                return;
            }

            // Remove old file
            fileSystem.unlink('./public/images/laptops/' + laptop.image, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            // delete laptop from  database
            Laptop.deleteOne({ _id: id })
            .then(res.redirect('/laptop'))
        })
        .catch(err => console.log(err))
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}

module.exports = { deleteLaptop };