const { Accessories } = require("../../model/laptopModel")

// get laptop form
const getAccessories_Form = (req, res) => {
    res.render('accessories-views/add-accessories', { title: 'formulaire de accessories'});
}

// add a accessories to database
const addAccessories_post = (req, res) => {
    //console.log(req.body)
    // Get image file object
    const imageFile = req.files.image;

    // Upload new file
    imageFile.mv('./public/images/accessories/' + imageFile.name, (err) => {
        if (err) {
            console.log('fail to upload a  new file')
            return res.status(500).send(err);
        }
    })
    // Create a accessories document
    const accessories = new Accessories({
        title: req.body.title,
        productType: req.body.productType,
        image: imageFile.name,
        description: [
            req.body.description
        ],
        price: req.body.price,
        quantity: req.body.quantity

    })
    accessories.save()
    .then(accessories => {
        res.render('accessories-views/accessories-details', { title: 'détails de accessories', accessories})
    })
    .catch((err) => console.log(err));
}

module.exports = { getAccessories_Form, addAccessories_post };