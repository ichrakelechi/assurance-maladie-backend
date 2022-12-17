// const Employees = require('../models/EmployeesModel');
// const Logger = require('../logger');
// const Users = require('../models/userModel')



// /*exports.postEmployeesXLSX = function (req, res) {
//    // Reading our test file
// const file = reader.readFile("data/user.xlsx")
  
// let data = []
  
// const sheets = file.SheetNames
  
// for(let i = 0; i < sheets.length; i++)
// {
//    const temp = reader.utils.sheet_to_json(
//         file.Sheets[file.SheetNames[i]])
//    temp.forEach((res) => {
//       data.push(res)
//    })
  
// }
  
// // Printing data
// console.log(data)

// // foreach lel post fel DB
// console.log(data)

// //verif cin 
// // console.log(data[0].cin)

// for(let i = 0; i < sheets.length; i++){
// Users.findOne({cin: data[i].cin})
// .exec(function (err, body) {
//     if (err) {
//         Logger.error(err);
//         return res.status(500).send({
//             error: "sys-001",
//             message: "Internal error is occured"
//         });
//     } else if (body) {
//         console.log('am here')
//         console.log(body.cin)
//         if ((body.firstName!=data[i].firstName) || (body.lastName!=data[i].lastName) || (body.dateDeNaissance!=data[i].dateDeNaissance))
//         {
//             let users = new Users({
//                 cin:data[i].cin,
//                 firstName: data[i].firstName,
//                 lastName: data[i].lastName,
//                 dateDeNaissance: data[i].dateDeNaissance,
//                 adress: data[i].adress,
//                 password: encodePassword(data[i].password),
//                 profession: data[i].profession,
//                 dateDentreTravail: data[i].dateDentreTravail,
//                 Salary: data[i].Salary,
//                 id_u: data[i].id_u,
//                 conjoint: data[i].conjoint,
//                 familySituation: data[i].familySituation,
//                 weddingDate: data[i].weddingDate,
//                 conjointPlan: data[i].conjointPlan,
//                 professionConjoint: data[i].professionConjoint,
//                 id_conjoint: data[i].id_conjoint,
//                 inscriptionDate: data[i].inscriptionDate,
//                 affiliateNumber: data[i].affiliateNumber,
//                 active: true,
//                 role: "626f0848dfdc130a1046713b", // role reference automatiquement ou par defaut 
//             });
//             user.save(function (err) {
//                 if (err) {
//                     Logger.error(err);
//                     return res.status(500).send({
//                         error: "sys-001",
//                         message: "Internal error is occured"
//                     });
//                 }
//             });
//             res.send({
//                 _id: user._id
//     })

// }else{
//         console.log('hedhi else')
//  }}
// })}
// }*/
// exports.getEmployees = function (req, res) {
//     Employees.find()
//         .exec(function (err, body) {

//             if (err) {
//                 Logger.error(err);
//                 return res.status(500).send({
//                     error: "sys-001",
//                     message: "Internal error is occured"
//                 });
//             }
//             res.send(body);
//         })

// }

// // exports.postEmployees = function (req, res) {
// //     Employees.findOne({
// //             cin: req.body.cin
// //         })
// //         .exec(function (err, body) {
// //             if (err) {
// //                 Logger.error(err);
// //                 return res.status(500).send({
// //                     error: "sys-001",
// //                     message: "Internal error is occured"
// //                 });
// //             }
// //             if (body) {
// //                 res.status(400).send({
// //                     error: "app-001",
// //                     message: "A similar Employeese is already exist"
// //                 });
// //             } else {
// //                 let employees = new Employees({
// //                     cin: req.body.cin,
// //                     firstName: req.body.firstName,
// //                     lastName: req.body.lastName,
// //                     dateDeNaissance: new Date(new Date(req.body.dateDeNaissance).setHours(+2)) 
// //                     // el new date heki bech tsallah el enhar tjibou bedhabt fel base de donne 
// //                 });
// //                 // taw bech naamlou el save mte3ou 
// //                 employees.save(function (err) {
// //                     if (err) {
// //                         Logger.error(err);
// //                         return res.status(500).send({
// //                             error: "sys-001",
// //                             message: "Internal error is occured"
// //                         });
// //                     }
// //                     res.send({
// //                         _id: employees._id
// //                     })
// //                 })
// //             }

// //         })
// // }

// exports.putEmployees = function (req, res) {
//     Employees.findById(req.params.employeesId)
//         .exec(function (err, body) {
//             if (err) {
//                 Logger.error(err);
//                 return res.status(500).send({
//                     error: "sys-001",
//                     message: "Internal error is occured"
//                 });
//             }
//             if (body) {
//                 Employees.findByIdAndUpdate(req.params.employeesId, {
//                     $set: req.body
//                 }, function (err, body) {
//                     if (err) {
//                         Logger.error(err);
//                         return res.status(500).send({
//                             error: "sys-001",
//                             message: "Internal error is occured"
//                         });
//                     }
//                     res.send('The requested employee is successfully modified.');
//                 })
//             } else {
//                 res.status(400).send({
//                     error: "app-002",
//                     message: "The requested employee is not found"
//                 });
//             }

//         })

// }


// exports.deleteEmployees = function (req, res) {
//     Employees.findById(req.params.employeesId)
//         .exec(function (err, body) {
//             if (err) {
//                 Logger.error(err);
//                 return res.status(500).send({
//                     error: "sys-001",
//                     message: "Internal error is occured"
//                 });
//             }
//             if (body) {
//                 Employees.findByIdAndRemove(req.params.employeesId, function (err) {
//                     if (err) {
//                         Logger.error(err);
//                         return res.status(500).send({
//                             error: "sys-001",
//                             message: "Internal error is occured"
//                         });
//                     }
//                     res.send('The requested employee is successfully deleted.');
//                 })
//             } else {
//                 res.status(400).send({
//                     error: "app-002",
//                     message: "The requested employee is not found"
//                 });
//             }
//         })
// }