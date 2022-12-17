const Bulletin = require('../models/bulletinModel');
const Dental = require('../models/DentalModel');
const Consultation = require('../models/consultationModel');
const Arrangement = require('../models/ArrangementModel');
const Hospitalization = require('../models/HospitalizationModel');
const Roumbersment = require('../models/RoumbersmentModel');


const Logger = require('../logger');
const User = require('../models/userModel');

exports.getBulletinFullDetails = function (req, res) {
    Bulletin.find({
            bulletinId: req.body.id_bulletin
        } || {
            bulletinId: req.params.idbulletin
        })
        .exec(function (err, Bulletinbody) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            Dental.find({
                    bulletinId: req.body.id_bulletin
                } || {
                    bulletinId: req.params.idbulletin
                })
                .exec(function (err, Dentalbody) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }
                    Consultation.find({
                            bulletinId: req.body.id_bulletin
                        } || {
                            bulletinId: req.params.idbulletin
                        })
                        .exec(function (err, Consultationbody) {
                            if (err) {
                                Logger.error(err);
                                return res.status(500).send({
                                    error: "sys-001",
                                    message: "Internal error is occured"
                                });
                            }
                            Arrangement.find({
                                    bulletinId: req.body.id_bulletin
                                } || {
                                    bulletinId: req.params.idbulletin
                                })
                                .exec(function (err, Arrangementbody) {
                                    if (err) {
                                        Logger.error(err);
                                        return res.status(500).send({
                                            error: "sys-001",
                                            message: "Internal error is occured"
                                        });
                                    }
                                    Hospitalization.find({
                                            bulletinId: req.body.id_bulletin
                                        } || {
                                            bulletinId: req.params.idbulletin
                                        })
                                        .exec(function (err, Hospitalizationbody) {
                                            if (err) {
                                                Logger.error(err);
                                                return res.status(500).send({
                                                    error: "sys-001",
                                                    message: "Internal error is occured"
                                                });
                                            }
                                            Roumbersment.find({
                                                bulletinId: req.body.id_bulletin
                                            } || {
                                                bulletinId: req.params.idbulletin
                                            })
                                                .exec(function (err, Roumbersmentbody) {
                                                    if (err) {
                                                        Logger.error(err);
                                                        return res.status(500).send({
                                                            error: "sys-001",
                                                            message: "Internal error is occured"
                                                        });
                                                    }
                                                    var FullDetails = Bulletinbody+Dentalbody+Consultationbody+Arrangementbody+Hospitalizationbody+Roumbersmentbody.remprice
                                                    res.send(FullDetails);
                                                })
                                        })
                                })
                        })
                })
        })

}

//bs>dental>hospitalization>pharmacie>docteur
