const Doctor = require('../models/doctorModel');
const Logger = require('../logger');



exports.getDoctor = function (req, res) {
    Doctor.find()
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

exports.postDoctor = function (req, res) {
    let doctor = new Doctor({
        name: req.body.name,
        adress: req.body.adress,
        city: req.body.city,
        MAPlocation: req.body.MAPlocation,
        mobile : req.body.mobile
    });
    doctor.save(function (err) {
        if (err) {
            Logger.error(err);
            return res.status(500).send({
                error: "sys-001",
                message: "Internal error is occured"
            });
        }
        res.send({
            _id: doctor._id
        })
    })



}

exports.putDoctor = function (req, res) {
    // Doctor.findById(req.body.doctorId)
    //     .exec(function (err, body) {
    //         console.log('hello',req.body)
    //         if (err) {
    //             Logger.error(err);
    //             return res.status(500).send({
    //                 error: "sys-001",
    //                 message: "Internal error is occured"
    //             });
    //         }
            if (req.body) {
                Doctor.findByIdAndUpdate(req.body.idD, {
                    $set: req.body
                }, function (err, body) {
                    console.log('donne2',req.body)
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }
                    res.send('The requested Doctor is successfully modified.');
                })
            } else {
                res.status(400).send({
                    error: "app-002",
                    message: "The requested Doctor is not found"
                });
            }

        // })

}


exports.deleteDoctor = function (req, res) {
    Doctor.findById(req.params.doctorId)
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            if (body) {
                Doctor.findByIdAndRemove(req.params.doctorId, function (err) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }
                    res.send('The requested Doctor is successfully deleted.');
                })
            } else {
                res.status(400).send({
                    error: "app-002",
                    message: "The requested Doctor is not found"
                });
            }
        })
}