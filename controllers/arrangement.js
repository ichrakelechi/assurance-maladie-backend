const Arrangement = require('../models/ArrangementModel');
const Logger = require('../logger');
const Roumbersment = require('./roumbersment');


exports.getArrangement = function (req, res) {
    Arrangement.find()
        .exec(function (err, body) {

            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            res.send(body);
        })

}

exports.postArrangement = function (req, res) {
    
                let arrangement = new Arrangement({
                    name: req.body.name,
                    nomenclature: req.body.nomenclature,
                    amount: req.body.amount ,
                    id_bulletin: req.body.id_bulletin
                   
                });
                
                arrangement.save(function (err) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }else{ 
                        Roumbersment.getRoumbersment(req,res)
                    } 
                    res.send({
                        _id: arrangement._id
                    })
                })
            

        
}

exports.putArrangement = function (req, res) {
    Arrangement.findById(req.params.arrangementId)
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            if (body) {
                Arrangement.findByIdAndUpdate(req.params.arrangementId, {
                    $set: req.body
                }, function (err, body) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }
                    res.send('The requested Arrangement is successfully modified.');
                })
            } else {
                res.status(400).send({
                    error: "app-002",
                    message: "The requested Arrangement is not found"
                });
            }

        })

}


