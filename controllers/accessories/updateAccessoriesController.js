const { Accessories } = require("../../model/laptopModel")
const fileSystem = require('fs')
const { ObjectId } = require('mongodb')

const updateAccessories_get = (req, res) => {
    const id = req.params.id
    if(ObjectId.isValid(id)){
        Accessories.findOne({ _id: id }).then(accessories => {
            res.render('accessories-views/update-accessories', { title: 'Modifier des accessories', accessories })
        })
        .catch(err => {
            console.log(err)
            res.redirect('/');
        })
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}

const updateAccessories_post = (req, res) => {
    const id = req.params.id
    if(ObjectId.isValid(id)){
        Accessories.findOne({ _id: id }).then(accessories => {
            function updates(){
                // Update accessories document
                accessories.title = req.body.title;
                accessories.description = [ req.body.description ];
                accessories.quantity = req.body.quantity;
                accessories.price = req.body.price;
                // Update database
                accessories.save()
                .then(result => {
                    Accessories.findOne({ _id: id }).then(accessories => {
                    res.render('accessories-views/accessories-details', { title: 'détails de accessories', accessories })
                })
                })
                .catch(err => {
                    console.log('Could not update the doc or render the file', err)
                    res.redirect('/');
                })
            }
            // If new file, upload file and replace old file
            if (req.files) {
                // Get image file object
                const imageFile = req.files.image;

                // Upload new file
                imageFile.mv('./public/images/accessories/' + imageFile.name, (err) => {
                    if (err) {
                        console.log('fail to upload a  new file')
                      return res.status(500).send(err);
                    }
                })
                // Remove old file
                fileSystem.unlink('./public/images/accessories/' + accessories.image, (err) => {
                    if (err) {
                        console.log('fail to delete the old file stored on the server', err)
                    }
                });
                // Update accessories document
                accessories.image = imageFile.name;
                updates();
            } else {
                updates();
            }
        })
        .catch(err => {
            console.log('Could not find a accessories', err)
            res.redirect('/');
        })
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}

module.exports = { updateAccessories_get, updateAccessories_post };