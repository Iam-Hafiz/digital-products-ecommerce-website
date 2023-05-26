const { Monitor } = require("../../model/laptopModel")

// all  monitors page
const monitorPage = (req, res) => {
    Monitor.find()
    .then(monitors => {
        res.render('monitor-views/monitor', { title: 'Ecrans', monitors});
    })
    .catch(err => console.log(err))
}

// single monitor details
const monitorDetails = (req, res) => {
    const id = req.params.id
    Monitor.findOne({_id: id})
    .then(monitor => {
        res.render('monitor-views/monitor-details', { title: 'détails d\'Ecrans', monitor});
    })
    .catch(err => console.log(err))
}

module.exports = {
    monitorPage,
    monitorDetails
};