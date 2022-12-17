const Dental = require('../models/DentalModel');
const Logger = require('../logger');
const Roumbersment = require('./roumbersment');


exports.getDental = function (req, res) {
    Dental.find()
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

exports.postDental = function (req, res) {
            
                let dental = new Dental({
                    type: req.body.type,
                    tooth: req.body.tooth,
                    coefficient: req.body.coefficient,
                    date: new Date(new Date(req.body.date).setHours(+2)),
                    fees: req.body.fees,
                    montant: req.body.montant,
                    id_bulletin: req.body.id_bulletin
                    
                });
                dental.save(function (err) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }else{ //COPIER COLLER 2
                        Roumbersment.getRoumbersment(req,res)
                    } 
                    res.send({
                        _id: dental._id
                    })
                })
            

        
}

exports.putDental = function (req, res) {
    Dental.findById(req.params.dentalId)
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            if (body) {
                Dental.findByIdAndUpdate(req.params.dentalId, {
                    $set: req.body
                }, function (err, body) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }
                    res.send('The requested tooth is successfully modified.');
                })
            } else {
                res.status(400).send({
                    error: "app-002",
                    message: "The requested tooth is not found"
                });
            }

        })

}


/*exports.deleteDental = function (req, res) {
    Dental.findById(req.params.dentalId)
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            if (body) {
                Dental.findByIdAndRemove(req.params.dentalId, function (err) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }
                    res.send('The requested tooth is successfully deleted.');
                })
            } else {
                res.status(400).send({
                    error: "app-002",
                    message: "The requested tooth is not found"
                });
            }
        })
}*/