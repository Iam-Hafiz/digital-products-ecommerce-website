const { Laptop, AllinOne, Monitor, Tablette, Smartphone, Accessories } = require("../../model/laptopModel")

const home = async (req, res) => {
    try {
        // home page latest 4 laptops, 4 allinOnes and 4 monitors
        const laptops = await Laptop.find().sort({_id: -1}).limit(4)
        const allinOnes = await AllinOne.find().sort({_id: -1}).limit(4)
        const monitors = await Monitor.find().sort({_id: -1}).limit(4)
        const tablettes = await Tablette.find().sort({_id: -1}).limit(4)
        const smartphones = await Smartphone.find().sort({_id: -1}).limit(4)
        const accessories = await Accessories.find().sort({_id: -1}).limit(4)
        res.render('home', { title: 'Acceuil', laptops, allinOnes, monitors, tablettes, smartphones, accessories });
    }
    catch(err){
        console.log(err)
        res.send('<p>Une error s\'est produit, veuillez réessayer ultérieurement </p>');
    }
}

const delivery  = (req, res) => {
    res.render('main-views/delivery', { title: 'livraison'});
}

const return_product  = (req, res) => {
    res.render('users-views/return-product', { title: 'Retour Gratuit'});
}

const about  = (req, res) => {
    res.render('main-views/about', { title: ' À propos'});
}

const login_page  = (req, res) => {
    res.render('users-views/login', { title: 'Connexion'});
}

const createUser  = (req, res) => {
    res.render('users-views/createUser', { title: 'S\'inscrire'});
}

const cart  = (req, res) => {
    res.render('users-views/cart', { title: 'Mon Panier'});
}

const contact_page  = (req, res) => {
    res.render('main-views/contact', { title: 'Contactez-nous'});
}

const privacy_terms  = (req, res) => {
    res.render('main-views/privacy-terms', { title: 'terms and privacy'});
}

module.exports = {
    home,
    delivery,
    return_product,
    about,
    login_page,
    createUser,
    cart,
    contact_page,
    privacy_terms
};
