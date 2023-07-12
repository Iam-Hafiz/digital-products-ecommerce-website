const { Tablette } = require("../../model/laptopModel")
const fileSystem = require('fs')
const { ObjectId } = require('mongodb')

const updateTablette_get = (req, res) => {
    const id = req.params.id
    if(ObjectId.isValid(id)){
        Tablette.findOne({ _id: id }).then(tablette => {
            res.render('tablettes-views/update-tablette', { title: 'Modifier une tablette', tablette })
        })
        .catch(err => {
            console.log(err)
            res.redirect('/');
        })
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}

const updateTablette_post = (req, res) => {
    const id = req.params.id
    if(ObjectId.isValid(id)){
        Tablette.findOne({ _id: id }).then(tablette => {
            function updates(){
                // Update laptop document
                tablette.title = req.body.title;
                tablette.description[0] = req.body.cpu;
                tablette.description[1] = req.body.os;
                tablette.description[2] = req.body.ram;
                tablette.description[3] = req.body.ssd;
                tablette.description[4] = req.body.gpu;
                tablette.description[5] = req.body.battery;
                tablette.description[6] = req.body.guarantee;
                tablette.description[7] = req.body.other;
                tablette.quantity = req.body.quantity;
                tablette.price = req.body.price;
                // Update database
                tablette.save()
                .then(result => {
                    Tablette.findOne({ _id: id }).then(tablette => {
                    res.render('tablettes-views/tablette-details', { title: 'détails de tablette', tablette })
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
                imageFile.mv('./public/images/tablettes/' + imageFile.name, (err) => {
                    if (err) {
                        console.log('fail to upload a  new file')
                      return res.status(500).send(err);
                    }
                })
                // Remove old file
                fileSystem.unlink('./public/images/tablettes/' + tablette.image, (err) => {
                    if (err) {
                        console.log('fail to delete the old file stored on the server', err)
                    }
                });
                // Update laptop document
                tablette.image = imageFile.name;
                updates();
            } else {
                updates();
            }
        })
        .catch(err => {
            console.log('Could not find a laptop', err)
            res.redirect('/');
        })
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}

module.exports = { updateTablette_get, updateTablette_post };