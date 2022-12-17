const Bulletin = require('../models/bulletinModel');
const Logger =require('../logger');
const User = require('../models/userModel');

exports.getBulletin = function (req, res) {
    Bulletin.find()
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

exports.postBulletin = function (req, res) {
    Bulletin.findOne({id_bulletin: req.body.id_bulletin})
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            if (body) {
                res.status(400).send({
                    error: "app-001",
                    message: "A similar care report is already exist"
                });
            } else {
               
                let bulletin = new Bulletin(
                    {
                        id_bulletin: req.body.id_bulletin,
                        id_u: req.body.id_u,
                        claimNumber: req.body.claimNumber,
                        dateBulettin: new Date(req.body.dateBulettin).setHours(+2),
                        companyName: req.body.companyName,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        adress: req.body.adress,
                        Proffesion: req.body.Proffesion,
                        sick: req.body.sick,
                        sickFirstName: req.body.sickFirstName,
                        sickLastName: req.body.sickLastName,
                        cinSick: req.body.cinSick,

                    }
                );
                bulletin.save(function (err) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }
                    res.send({
                        _id: bulletin._id
                    })
                })
            }

        })
    }

exports.putBulletin = function (req, res) {
    Bulletin.findById(req.params.bulletinId)
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            if (body) {
                Bulletin.findOne({id_bulletin: req.body.id_bulletin, _id: {$ne: req.params.bulletinId}})
                    .exec(function (err, body) {
                        if (err) {
                            Logger.error(err);
                            return res.status(500).send({
                                error: "sys-001",
                                message: "Internal error is occured"
                            });
                        }
                        if (body) {
                            res.status(400).send({
                                error: "app-001",
                                message: "A similar care report is already exist"
                            });
                        } else {
                            Bulletin.findByIdAndUpdate(req.params.bulletinId, {$set: req.body}, function (err, body) {
                                if (err) {
                                    Logger.error(err);
                                    return res.status(500).send({
                                        error: "sys-001",
                                        message: "Internal error is occured"
                                    });
                                }
                                res.send('The requested care report is successfully modified.');
                            });
                        }

                    })
            } else {
                res.status(400).send({
                    error: "app-002",
                    message: "The requested care report is not found"
                });
            }

        })

    }

// exports.deleteRoles = function (req, res) {
//     Role.findById(req.params.rolesId)
//         .exec(function (err, body) {
//             if (err) {
//                 Logger.error(err);
//                 return res.status(500).send({
//                     error: "sys-001",
//                     message: "Internal error is occured"
//                 });
//             }
//             if (body) {
//                 User.find({role:req.params.rolesId})
//                     .exec(function (err, body) {
//                         if (err) {
//                             Logger.error(err);
//                             return res.status(500).send({
//                                 error: "sys-001",
//                                 message: "Internal error is occured"
//                             });
//                         }
//                         if (body.length>0){
//                             res.status(400).send({
//                                 error: "app-003",
//                                 message: "The requested roles is already referenced"
//                             });
//                         }else{
//                             Role.findByIdAndRemove(req.params.rolesId, function (err) {
//                                 //ken el jaw lkol fesfes bech yaaml findByIdAndRemove(attribu)
//                                 if (err) {
//                                     Logger.error(err);
//                                     return res.status(500).send({
//                                         error: "sys-001",
//                                         message: "Internal error is occured"
//                                     });
//                                 }
//                                 res.send('The requested roles is successfully deleted.');
//                             })
//                         }
//                     })
//             } else {
//                 res.status(400).send({
//                     error: "app-002",
//                     message: "The requested roles is not found"
//                 });
//             }
//         })
// }