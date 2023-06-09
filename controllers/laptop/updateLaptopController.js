const { Laptop } = require("../../model/laptopModel")
const fileSystem = require('fs')
const { ObjectId } = require('mongodb')

const updateLaptop_get = (req, res) => {
    const id = req.params.id
    if(ObjectId.isValid(id)){
        Laptop.findOne({ _id: id }).then(laptop => {
            res.render('laptops-views/update-laptop', { title: 'Modifier PC portable', laptop })
        })
        .catch(err => {
            console.log(err)
            res.redirect('/');
        })
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}

const updateLaptop_post = (req, res) => {
    const id = req.params.id
    if(ObjectId.isValid(id)){
        Laptop.findOne({ _id: id }).then(laptop => {
            function updates(){
                // Update laptop document
                laptop.title = req.body.title;
                laptop.description[0] = req.body.cpu;
                laptop.description[1] = req.body.os;
                laptop.description[2] = req.body.ram;
                laptop.description[3] = req.body.ssd;
                laptop.description[4] = req.body.gpu;
                laptop.description[5] = req.body.battery;
                laptop.description[6] = req.body.guarantee;
                laptop.description[7] = req.body.other;
                laptop.quantity = req.body.quantity;
                laptop.price = req.body.price;
                // Update database
                laptop.save()
                .then(result => {
                    Laptop.findOne({ _id: id }).then(laptop => {
                    res.render('laptops-views/laptop-details', { title: 'détails PC portable', laptop })
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
                imageFile.mv('./public/images/laptops/' + imageFile.name, (err) => {
                    if (err) {
                        console.log('fail to upload a  new file')
                      return res.status(500).send(err);
                    }
                })
                // Remove old file
                fileSystem.unlink('./public/images/laptops/' + laptop.image, (err) => {
                    if (err) {
                        console.log('fail to delete the old file stored on the server', err)
                    }
                });
                // Update laptop document
                laptop.image = imageFile.name;
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

module.exports = { updateLaptop_get, updateLaptop_post };