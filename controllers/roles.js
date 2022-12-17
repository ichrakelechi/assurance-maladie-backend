const Role = require('../models/roleModel');
//jebna el model mta3 el role bech nest7a9ou les attribuuu 
const Logger =require('../logger');
// y9ayed kol haja feha erreur log 

//dima baaed el export mte33na kol get wela put wela delete wela post lkoooooooooool minus
//////////////////////////////////////////////////////////////////////////////////////////

exports.getRoles = function (req, res) {
    // req == require -- res == resultat 
    Role.find()
    //find()==select * 
    // .exec ya3ni exectutili el find mte3y fel Role 
        .exec(function (err, body) {
            ///ki bech nchouf fel console 
            console.log('hedha eli hajty bih',body)
            // err == erreur 
            //body == el resultat elli talla3heli mel base lkol 
            if (err) {
                Logger.error(err);
                //return res.status(500).send ... ya3ni yab3ath erreur lel app status 500 
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            //bech yaffichili el body elli l9ah
            res.send(body);
        })
    
}

exports.postRoles = function (req, res) {
    Role.findOne({name: req.body.name})
//findOne : lawwej ka3ba ({attribu: req.body.attribu})
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
                    message: "A similar role is already exist"
                });
            } else {
                //bech ndefinih bech najem nsajlou 
                let role = new Role(
                    {
                        name: req.body.name,
                        description: req.body.description,
                    }
                );
                // taw bech naamlou el save mte3ou 
                role.save(function (err) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }
                    res.send({
                        _id: role._id
                    })
                })
            }

        })
    }

exports.putRoles = function (req, res) {
    //localhost:2550/#/{params}
    Role.findById(req.params.rolesId)
    //"findbyId" yaany tlawej bel "ObjectId" mte3ek 
    //ken bech tlawej b Id ekher yekfi ennek tekteb "findOne"
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            if (body) {
                Role.findOne({name: req.body.name, _id: {$ne: req.params.rolesId}})
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
                                message: "A similar roles is already exist"
                            });
                        } else {
                            //findByIdAndUpdate(attribu eli bech nlawej beha , {$set: el hajet eli bech nbadelhom }, function
                            Role.findByIdAndUpdate(req.params.rolesId, {$set: req.body}, function (err, body) {
                                if (err) {
                                    Logger.error(err);
                                    return res.status(500).send({
                                        error: "sys-001",
                                        message: "Internal error is occured"
                                    });
                                }
                                res.send('The requested roles is successfully modified.');
                            });
                        }

                    })
            } else {
                res.status(400).send({
                    error: "app-002",
                    message: "The requested roles is not found"
                });
            }

        })

    }

exports.deleteRoles = function (req, res) {
    Role.findById(req.params.rolesId)
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            if (body) {
                User.find({role:req.params.rolesId})
                    .exec(function (err, body) {
                        if (err) {
                            Logger.error(err);
                            return res.status(500).send({
                                error: "sys-001",
                                message: "Internal error is occured"
                            });
                        }
                        if (body.length>0){
                            res.status(400).send({
                                error: "app-003",
                                message: "The requested roles is already referenced"
                            });
                        }else{
                            Role.findByIdAndRemove(req.params.rolesId, function (err) {
                                //ken el jaw lkol fesfes bech yaaml findByIdAndRemove(attribu)
                                if (err) {
                                    Logger.error(err);
                                    return res.status(500).send({
                                        error: "sys-001",
                                        message: "Internal error is occured"
                                    });
                                }
                                res.send('The requested roles is successfully deleted.');
                            })
                        }
                    })
            } else {
                res.status(400).send({
                    error: "app-002",
                    message: "The requested roles is not found"
                });
            }
        })
}