const Consultation = require('../models/consultationModel');
const Roumbersment = require('./roumbersment');// COPIER COLLER 1
const Logger = require('../logger');



exports.getConsultation = function (req, res) {
    Consultation.find()
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

exports.postConsultation = function (req, res) {
    Consultation.find({code : req.body.code})
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            } else {
                let consultation = new Consultation({
                    dateConsultation: req.body.Date,
                    doctorName: req.body.doctorName,
                    amount: req.body.amount,
                    code: req.body.code,
                    id_bulletin: req.body.id_bulletin

                });
                
                consultation.save(function (err) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }else{ //COPIER COLLER 2
                        Roumbersment.getRoumbersment(req,res)
                    } // HATA HOUNI 
                    res.send({
                        _id: consultation._id
                    })
                })
            }
        })
}
