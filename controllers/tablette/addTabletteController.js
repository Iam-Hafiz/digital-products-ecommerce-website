const { Tablette } = require("../../model/laptopModel")

// get laptop form
const getTablette_Form = (req, res) => {
    res.render('tablettes-views/add-tablette', { title: 'formulaire de Tablette'});
}

// add a laptop to database
const addTablette_post = (req, res) => {
    //console.log(req.body)
    // Get image file object
    const imageFile = req.files.image;

    // Upload new file
    imageFile.mv('./public/images/tablettes/' + imageFile.name, (err) => {
        if (err) {
            console.log('fail to upload a  new file')
            return res.status(500).send(err);
        }
    })
    // Create a laptop document
    const tablette = new Tablette({
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
    tablette.save()
    .then(tablette => {
        res.render('tablettes-views/tablette-details', { title: 'détails de tablette', tablette})
    })
    .catch((err) => console.log(err));
}

module.exports = { getTablette_Form, addTablette_post };