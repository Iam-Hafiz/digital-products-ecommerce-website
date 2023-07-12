const { Accessories } = require("../../model/laptopModel")
const fileSystem = require('fs')
const { ObjectId } = require('mongodb')

const deleteAccessories = (req, res) => {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
        Accessories.findOne({ _id: id })
        .then(accessories => {
            // If no ressource found, send error 404
            if (!accessories) {
                res.status(404).send(`Erreur 404: la ressource n'a pas été trouvé !`);
                return;
            }

            // Remove old file
            fileSystem.unlink('./public/images/accessories/' + accessories.image, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            // delete accessories from  database
            Accessories.deleteOne({ _id: id })
            .then(res.redirect('/accessories'))
        })
        .catch(err => console.log(err))
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}

module.exports = { deleteAccessories };