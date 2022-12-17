const Children = require('../models/ChildrenModel');
const Logger = require('../logger');



exports.getChildren = function (req, res) {
    Children.find()
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

exports.postChildren = function (req, res) {
    Children.findOne({
            cin: req.body.cin
        })
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
                    message: "A similar Child is already exist"
                });
            } else {
                let children = new Children({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    observation: req.body.observation,
                    dateDeNaissance: new Date(new Date(req.body.dateDeNaissance).setHours(+2)),
                    id_u: req.params.id_u 
                   
                });
                children.save(function (err) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }
                    res.send({
                        _id: children._id
                    })
                })
            }

        })
}

exports.putChildren = function (req, res) {
    Children.findById(req.params.childrenId)
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            if (body) {
                Children.findByIdAndUpdate(req.params.childrenId, {
                    $set: req.body
                }, function (err, body) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }
                    res.send('The requested Child is successfully modified.');
                })
            } else {
                res.status(400).send({
                    error: "app-002",
                    message: "The requested Child is not found"
                });
            }

        })

}


exports.deleteChildren = function (req, res) {
    Children.findById(req.params.childrenId)
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            if (body) {
                Children.findByIdAndRemove(req.params.childrenId, function (err) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }
                    res.send('The requested Child is successfully deleted.');
                })
            } else {
                res.status(400).send({
                    error: "app-002",
                    message: "The requested Child is not found"
                });
            }
        })
}