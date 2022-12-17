const Sum = require('../models/SumModel');
const Logger = require('../logger');
const Roumbersment = require('./roumbersment');

exports.postSum = function (req, res) {
    var Total=0
    Roumbersment.find(({
        bulletinId: req.body.id_bulletin
    } || {
        bulletinId: req.params.id_bulletin
    }))
    .exec(function (err, body) {
        if (err) {
            Logger.error(err);
            return res.status(500).send({
                error: "sys-001",
                message: "Internal error is occured"
            });
        }
        body.forEach((item) => {
            Total=item.remprice+Total
            
    })
    console.log(Total)
    let sum = new Sum({
        pricetobereimbursed : Total,
        id_bulletin: req.body.bulletinId,
    });
    sum.save(function (err) {
        if (err) {
            Logger.error(err);
            return res.status(500).send({
                error: "sys-001",
                message: "Internal error is occured"
            });
        }
        res.send({
            _id: sum._id
        })
    })
    });

}