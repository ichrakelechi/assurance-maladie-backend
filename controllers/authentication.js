const User = require('../models/userModel');
const jwt = require('jsonwebtoken'); //passport
const Logger = require('../logger');
const configParams = require('../configParams');
const crypto = require("crypto"); //cryptage mot de passe et decryptage
const nodemailer = require('nodemailer');
var reader = require('xlsx');

//function taaml cryptage lel mot de passe donc el mot de passe mmayet9ayedch fel base de donne kif ma howa 
// par example mot de passe "12356" yet9ayed fel base de donne "jazbhdlhomjazbdulè_ç_çé"'yè_çàé"
function encodePassword(str) {
    var mykey = crypto.createCipher('aes192', configParams.cryptoSecret);
    var mystr = mykey.update(str, 'utf8', 'hex');
    mystr += mykey.final('hex');
    return mystr;
}

//function taaml decryptage lel mot de passe 
function decodePassword(str) {
    var mykey = crypto.createDecipher('aes192', configParams.cryptoSecret);
    var mystr = mykey.update(str, 'hex', 'utf8');
    mystr += mykey.final('utf8');
    return mystr;
}

// el encryptionKey mte3na hne howa "FdaYIw90v2" mawjoud fel configParams

function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}


//houni el Signup
exports.postNewClients = function (req, res) {
    // Reading our test file
    const file = reader.readFile("data/user.xlsx")
    let data = []
    const sheets = file.SheetNames
    for (let i = 0; i < sheets.length; i++) {
        const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
        temp.forEach((res) => {
            data.push(res)
        })
    }
    // Printing data
    var found
    data.forEach(item => {
        console.log('item.cin', item.cin)
        User.findOne({cin: item.cin})
            .exec(function (err, bodyUser) {
                if (err) {
                    Logger.error(err);
                    return res.status(500).send({
                        error: "sys-001",
                        message: "Internal error is occured"
                    });
                }
                if (bodyUser === null){
                    console.log('pt1')
                        console.log('ken feregh')
                        console.log('ddn',new Date(item.dateDeNaissance))
                        var tempPsw = generatePassword()
                        let user = new User({
                            cin: item.cin,
                            firstName: item.firstName,
                            lastName: item.lastName,
                            dateDeNaissance: new Date(item.dateDeNaissance),
                            adress: item.adress,
                            gender: item.gender,
                            password: encodePassword(tempPsw),
                            email: item.email.toLowerCase(),
                            profession: item.profession,
                            campanyName: item.campanyName,
                            dateDentreTravail: new Date(item.dateDentreTravail),
                            Salary: item.Salary,
                            conjoint: item.conjoint,
                            familySituation: item.familySituation,
                            weddingDate: item.weddingDate,
                            conjointPlan: item.conjointPlan,
                            professionConjoint: item.professionConjoint,
                            id_conjoint: item.id_conjoint,
                            affiliateNumber: item.affiliateNumber,
                            active: true,
                            role: "client",
                            beneficiaire: item.beneficiaire,
                            lieuDeParente: item.lieuDeParente,
                            mobile: item.mobile,
                        });
                        user.save(function (err) {
                            if (err) {
                                Logger.error(err);
                                return res.status(500).send({
                                    error: "sys-001",
                                    message: "Internal error is occured"
                                });
                            }
                        })
                        setTimeout(() => { console.log("Done ",user._id); }, 2000);
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            port: 465,
                            secure: true,
                            auth: {
                              user: 'bessem085@gmail.com',
                              pass: 'Hfjao24cV!'
                            }
                          });
                          var mailOptions = {
                            from: 'bessem085@gmail.com',
                            to: item.email,
                            subject: 'confirmation signup',
                            text: ('voici votre mot de passe' + tempPsw)
                          };
                          
                          transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                          });
                }
                else {
                        console.log('mailing')
                }
            })
    })
    console.log('mdpichrak',encodePassword('ichrak'))
    // else {
    //     console.log('ken l9ah')
    //     if (req.body.cin == item.cin) {
    //         console.log('connected')
    //         res.status(200).send({
    //             auth: true,
    //             role: req.body.role,
    //         });
    //     } else {
    //         console.log('error passcode or cin')
    //         return res.status(401).send({
    //             error: "auth-001",
    //             message: "auth non valid"
    //         });
    //     }
    // }
}

//houni el login
exports.postLogin = function (req, res) {
    console.log(req.body.cin,req.body.password,req.body.role)
    User.findOne({cin: req.body.cin})
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            if (body == null) {
                res.status(401).send({
                    error: "auth-001",
                    message: "Invalid username or password"
                });
            } else {
                console.log('am here')
                if (req.body.role.toLowerCase() === 'client' &&
                    body.role &&
                    decodePassword(body.password) === req.body.password &&body.active) {
                        var token = jwt.sign({
                            id: body._id
                        }, configParams.tokenSecret, {
                            expiresIn: 14400 // expires in 4 hours
                        });
                        res.status(200).send({
                            auth: true,
                            role: req.body.role,
                            token: token
                        })
                        console.log(' here')
                } else if (req.body.role.toLowerCase() === 'internal' &&
                    body.role &&
                    decodePassword(body.password) === req.body.password) {
                        var token = jwt.sign({
                            id: body._id
                        }, configParams.tokenSecret, {
                            expiresIn: 14400 // expires in 4 hours
                        });
                        res.status(200).send({
                            auth: true,
                            role: req.body.role,
                            token: token
                        })
                } else {
                    return res.status(401).send({
                        error: "auth-001",
                        message: "Invalid username or password"
                    });
                }
            }
        });
};

exports.getLogout = function (req, res) {
    res.status(200).send({
        auth: false,
        token: null
    });
};
exports.getUser = function (req, res) {
    User.find()
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
exports.putUser = function (req, res) {
    User.findById(req.params.userId)
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            if (body) {
                User.findByIdAndUpdate(req.params.userId, {
                    $set: req.body
                }, function (err, body) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }
                    res.send('The requested employee is successfully modified.');
                })
            } else {
                res.status(400).send({
                    error: "app-002",
                    message: "The requested employee is not found"
                });
            }

        })

}
exports.deleteUser = function (req, res) {
    User.findById(req.params.userId)
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            if (body) {
                User.findByIdAndRemove(req.params.userId, function (err) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }
                    res.send('The requested employee is successfully deleted.');
                })
            } else {
                res.status(400).send({
                    error: "app-002",
                    message: "The requested employee is not found"
                });
            }
        })
}


// exports.postAuthenticationSignup = function (req, res) {
//     Employees.findOne({cin: req.body.cin})
//         .exec(function (err, dataEmployees) {
//             if (err) {
//                 Logger.error(err);
//                 return res.status(500).send({
//                     error: "sys-001",
//                     message: "Internal error is occured"
//                 });
//             }
//             if (dataEmployees) {
//                 User.findOne({cin: req.body.cin})
//                     .exec(function (err, dataUser) {
//                         if (err) {
//                             Logger.error(err);
//                             return res.status(500).send({
//                                 error: "sys-001",
//                                 message: "Internal error is occured"
//                             });
//                         } else if (dataUser) {
//                             res.status(400).send({
//                                 error: "app-003",
//                                 message: "The requested user is already SignedUp"
//                             });
//                         } else {
//                             console.log('dataEmployees._cin',dataEmployees._cin)
//                             let user = new User({
//                                 cin: req.body.cin,
//                                 firstName: dataEmployees.firstName,
//                                 lastName: dataEmployees.lastName,
//                                 dateDeNaissance: dataEmployees.dateDeNaissance,
//                                 adress: req.body.adress,
//                                 password: encodePassword(req.body.password),
//                                 profession: req.body.profession,
//                                 dateDentreTravail: req.body.dateDentreTravail,
//                                 Salary: req.body.Salary,
//                                 id_u: req.body.id_u,
//                                 conjoint: req.body.conjoint,
//                                 familySituation: req.body.familySituation,
//                                 weddingDate: req.body.weddingDate,
//                                 conjointPlan: req.body.conjointPlan,
//                                 professionConjoint: req.body.professionConjoint,
//                                 id_conjoint: req.body.id_conjoint,
//                                 inscriptionDate: req.body.inscriptionDate,
//                                 affiliateNumber: req.body.affiliateNumber,
//                                 active: true,
//                                 role: "626f0848dfdc130a1046713b", // role reference automatiquement ou par defaut 
//                             });
//                             user.save(function (err) {
//                                 if (err) {
//                                     Logger.error(err);
//                                     return res.status(500).send({
//                                         error: "sys-001",
//                                         message: "Internal error is occured"
//                                     });
//                                 }
//                             });
//                             
//                             const sendEmail = async (email) => {
//                                 try {
//                                     const transporter = nodemailer.createTransport({
//                                         host: 'smtp.gmail.com',
//                                         service: 'gmail',
//                                         port: 465,
//                                         secure: true,
//                                         auth: {
//                                             user: 'ichrak.elechi99@gmail.com',
//                                             pass: 'ysknztkvohzxuvbq',
//                                         },
//                                     });
//                                     await transporter.sendMail({
//                                         from: 'ichrak.elechi99@gmail.com',
//                                         to: email,
//                                         subject: 'confirmation signup',
//                                         text: ('voici votre mot de passe'+password),
//                                     });
//                                     console.log("email sent sucessfully");
//                                 } catch (error) {
//                                     console.log(error, "email not sent");
//                                 }
//                             };

//                             module.exports = sendEmail;
//                         }
//                          res.send({
//                                 _id: user._id
//                             })

//                     })
//             } else {
//                 res.status(400).send({
//                     error: "app-002",
//                     message: "The requested employee is not found"
//                 });
//             }

//         })
// }