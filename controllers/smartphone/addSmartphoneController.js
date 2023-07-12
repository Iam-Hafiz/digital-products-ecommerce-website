const { Smartphone } = require("../../model/laptopModel")

// get smartphones form
const getSmartphone_Form = (req, res) => {
    res.render('smartphones-views/add-smartphone', { title: 'formulaire de smartphone'});
}

// add a smartphones to database
const addSmartphone_post = (req, res) => {
    //console.log(req.body)
    // Get image file object
    const imageFile = req.files.image;

    // Upload new file
    imageFile.mv('./public/images/smartphones/' + imageFile.name, (err) => {
        if (err) {
            console.log('fail to upload a  new file')
            return res.status(500).send(err);
        }
    })
    // Create a smartphone document
    const smartphone = new Smartphone({
        title: req.body.title,
        productType: req.body.productType,
        image: imageFile.name,
        description: [
            req.body.cpu,
            req.body.os,
            req.body.ram,
            req.body.ssd,
            req.body.gpu,
            req.body.battery,
            req.body.guarantee,
            req.body.other,
        ],
        price: req.body.price,
        quantity: req.body.quantity

    })
    smartphone.save()
    .then(smartphone => {
        res.render('smartphones-views/smartphone-details', { title: 'détails de smartphone', smartphone})
    })
    .catch((err) => console.log(err));
}

module.exports = { getSmartphone_Form, addSmartphone_post };