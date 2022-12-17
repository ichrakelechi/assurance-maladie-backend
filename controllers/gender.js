const Gender = require('../models/genderModel');
const Logger =require('../logger');

exports.getGender = function (req, res) {
    Gender.find()
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


exports.postGender = function (req, res) {
    Gender.findOne({name: req.body.name})
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
                    message: "A similar gender is already exist"
                });
            } else {
                let gender = new Gender(
                    {
                        name: req.body.name,
                        description: req.body.description
                    }
                );
                gender.save(function (err) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }
                    res.send({
                        _id: gender._id
                    })
                })
            }

        })
};

exports.putGender = function (req, res) {
    Gender.findById(req.params.genderId)
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            if (body) {
                Gender.findOne({name: req.body.name, _id: {$ne: req.params.genderId}})
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
                                message: "A similar gender is already exist"
                            });
                        } else {
                            Gender.findByIdAndUpdate(req.params.genderId, {$set: req.body}, function (err, body) {
                                if (err) {
                                    Logger.error(err);
                                    return res.status(500).send({
                                        error: "sys-001",
                                        message: "Internal error is occured"
                                    });
                                }
                                res.send('The requested gender is successfully modified.');
                            });
                        }

                    })
            } else {
                res.status(400).send({
                    error: "app-002",
                    message: "The requested gender is not found"
                });
            }

        })

};

exports.deleteGender = function (req, res) {
    Gender.findById(req.params.genderId)
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            if (body) {
                Gender.findByIdAndRemove(req.params.genderId, function (err) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }
                    res.send('The requested gender is successfully deleted.');
                })
            } else {
                res.status(400).send({
                    error: "app-002",
                    message: "The requested gender is not found"
                });
            }
        })
};
