const { Smartphone } = require("../../model/laptopModel")
const fileSystem = require('fs')
const { ObjectId } = require('mongodb')

const deleteSmartphone = (req, res) => {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
        Smartphone.findOne({ _id: id })
        .then(smartphone => {
            // If no ressource found, send error 404
            if (!smartphone) {
                res.status(404).send(`Erreur 404: la ressource n'a pas été trouvé !`);
                return;
            }

            // Remove old file
            fileSystem.unlink('./public/images/smartphones/' + smartphone.image, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            // delete laptop from  database
            Smartphone.deleteOne({ _id: id })
            .then(res.redirect('/smartphone'))
        })
        .catch(err => console.log(err))
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}

module.exports = { deleteSmartphone };