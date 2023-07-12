const { Smartphone } = require("../../model/laptopModel")
const fileSystem = require('fs')
const { ObjectId } = require('mongodb')

const updateSmartphone_get = (req, res) => {
    const id = req.params.id
    if(ObjectId.isValid(id)){
        Smartphone.findOne({ _id: id }).then(smartphone => {
            res.render('smartphones-views/update-smartphone', { title: 'Modifier un smartphone', smartphone })
        })
        .catch(err => {
            console.log(err)
            res.redirect('/');
        })
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}

const updateSmartphone_post = (req, res) => {
    const id = req.params.id
    if(ObjectId.isValid(id)){
        Smartphone.findOne({ _id: id }).then(smartphone => {
            function updates(){
                // Update smartphone document
                smartphone.title = req.body.title;
                smartphone.description[0] = req.body.cpu;
                smartphone.description[1] = req.body.os;
                smartphone.description[2] = req.body.ram;
                smartphone.description[3] = req.body.ssd;
                smartphone.description[4] = req.body.gpu;
                smartphone.description[5] = req.body.battery;
                smartphone.description[6] = req.body.guarantee;
                smartphone.description[7] = req.body.other;
                smartphone.quantity = req.body.quantity;
                smartphone.price = req.body.price;
                // Update database
                smartphone.save()
                .then(result => {
                    Smartphone.findOne({ _id: id }).then(smartphone => {
                    res.render('smartphones-views/smartphone-details', { title: 'détails de smartphone', smartphone })
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
                imageFile.mv('./public/images/smartphones/' + imageFile.name, (err) => {
                    if (err) {
                        console.log('fail to upload a  new file')
                      return res.status(500).send(err);
                    }
                })
                // Remove old file
                fileSystem.unlink('./public/images/smartphones/' + smartphone.image, (err) => {
                    if (err) {
                        console.log('fail to delete the old file stored on the server', err)
                    }
                });
                // Update laptop document
                smartphone.image = imageFile.name;
                updates();
            } else {
                updates();
            }
        })
        .catch(err => {
            console.log('Could not find a smartphone', err)
            res.redirect('/');
        })
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}

module.exports = { updateSmartphone_get, updateSmartphone_post };