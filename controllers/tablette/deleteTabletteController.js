const { Tablette } = require("../../model/laptopModel")
const fileSystem = require('fs')
const { ObjectId } = require('mongodb')

const deleteTablette = (req, res) => {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
        Tablette.findOne({ _id: id })
        .then(tablette => {
            // If no ressource found, send error 404
            if (!tablette) {
                res.status(404).send(`Erreur 404: la ressource n'a pas été trouvé !`);
                return;
            }

            // Remove old file
            fileSystem.unlink('./public/images/tablettes/' + tablette.image, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            // delete laptop from  database
            Tablette.deleteOne({ _id: id })
            .then(res.redirect('/tablette'))
        })
        .catch(err => console.log(err))
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}

module.exports = { deleteTablette };