const { Laptop } = require("../../model/laptopModel")

// get laptop form
const getLaptopForm = (req, res) => {
    res.render('laptops-views/add-laptop', { title: 'laptop form'});
}

// add a laptop to database
const addLaptop_post = (req, res) => {
    //console.log(req.body)
    // Get image file object
    const imageFile = req.files.image;

    // Upload new file
    imageFile.mv('./public/images/laptops/' + imageFile.name, (err) => {
        if (err) {
            console.log('fail to upload a  new file')
            return res.status(500).send(err);
        }
    })
    // Create a laptop document
    const laptop = new Laptop({
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
    laptop.save()
    .then(laptop => {
        res.render('laptops-views/laptop-details', { title: 'détails PC portable', laptop})
    })
    .catch((err) => console.log(err));
}

module.exports = { getLaptopForm, addLaptop_post };