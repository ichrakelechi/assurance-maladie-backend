const Hospitalization = require('../models/HospitalizationModel');
const Logger = require('../logger');
const Roumbersment = require('./roumbersment');


exports.getHospitalization = function (req, res) {
    Hospitalization.find()
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

exports.postHospitalization = function (req, res) {
                let hospitalization = new Hospitalization({
                    dateE: new Date(new Date(req.body.dateE).setHours(+2)),
                    dateR: new Date(new Date(req.body.dateR).setHours(+2)),
                    amount: req.body.amount,
                    observation: req.body.observation,
                    id_bulletin: req.body.id_bulletin,
                  
                });
                
                hospitalization.save(function (err) {
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
                        _id: hospitalization._id
                    })
                })
            

        
}

exports.putHospitalization = function (req, res) {
    Hospitalization.findById(req.params.hospitalizationId)
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            if (body) {
                Hospitalization.findByIdAndUpdate(req.params.hospitalizationId, {
                    $set: req.body
                }, function (err, body) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }
                    res.send('The requested hospitalization is successfully modified.');
                })
            } else {
                res.status(400).send({
                    error: "app-002",
                    message: "The requested hospitalization is not found"
                });
            }

        })

}


/*exports.deleteHospitalization = function (req, res) {
    Hospitalization.findById(req.params.hospitalizationId)
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            if (body) {
                Hospitalization.findByIdAndRemove(req.params.hospitalizationId, function (err) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }
                    res.send('The requested hospitalization is successfully deleted.');
                })
            } else {
                res.status(400).send({
                    error: "app-002",
                    message: "The requested hospitalization is not found"
                });
            }
        })
}*/