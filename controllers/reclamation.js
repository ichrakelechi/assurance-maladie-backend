const Reclamations = require('../models/reclamationModel');
const Logger =require('../logger');

exports.getReclamations = function (req, res) {
    Reclamations.find()
        .exec(function (err, body) {
            if (err){
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            res.send(body);
        })
};


exports.postReclamations = function (req, res) {
    Reclamations.findOne({description: req.body.description})
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
                    message: "A similar Reclamations is already exist"
                });
            } else {
                let reclamations = new Reclamations(
                    {
                        titre :req.params.titre,
                        cin: req.params.cin,
                        description: req.body.description,
                    }
                );
                reclamations.save(function (err) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }
                    res.send({
                        _id: reclamations._id
                    })
                })
            }

        })
};

exports.putReclamations = function (req, res) {
    Reclamations.findById(req.params.ReclamationsId)
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            if (body) {
                Reclamations.findOne({description: req.body.description, _id: {$ne: req.params.ReclamationsId}})
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
                                message: "A similar Reclamations is already exist"
                            });
                        } else {
                            Reclamations.findByIdAndUpdate(req.params.ReclamationsId, {$set: req.body}, function (err, body) {
                                if (err) {
                                    Logger.error(err);
                                    return res.status(500).send({
                                        error: "sys-001",
                                        message: "Internal error is occured"
                                    });
                                }
                                res.send('The requested Reclamations is successfully modified.');
                            });
                        }

                    })
            } else {
                res.status(400).send({
                    error: "app-002",
                    message: "The requested Reclamations is not found"
                });
            }

        })

};

exports.deleteReclamations = function (req, res) {
    Reclamations.findById(req.params.ReclamationsId)
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            if (body) {
                Reclamations.findByIdAndRemove(req.params.ReclamationsId, function (err) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }
                    res.send('The requested Reclamations is successfully deleted.');
                })
            } else {
                res.status(400).send({
                    error: "app-002",
                    message: "The requested Reclamations is not found"
                });
            }
        })
};

