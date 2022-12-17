const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const configParams = require('../configParams');


////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
/******* Controller Definitions ********/
/******************************/
const authenticationController = require('../controllers/authentication');
const rolesController = require('../controllers/roles');
const genderController = require('../controllers/gender');
const ReclamationsController = require('../controllers/reclamation');
const arrangementController = require('../controllers/arrangement');
const bulletinController = require('../controllers/bulletin');
const doctorController = require ('../controllers/doctor');
const consultationController = require ('../controllers/consultation');
const hospitalizationController = require ('../controllers/hospitalization');
const bsfdetails = require ('../controllers/bulletinFullDetails');
const dentalController = require('../controllers/dental');
const remboursementController = require('../controllers/roumbersment');
const SumController = require('../controllers/sum')
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
/************* GFS Storage Configuration **********/
/*******************************************/
// mongo URI
const mongoURI = configParams.mongoURI;
// Create mongo Connection
const conn = mongoose.createConnection(mongoURI);


////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
/******* Authentication ********/


////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
/************* Roles **********/
/***********************************/
router.route('/roles')
    .get(rolesController.getRoles)
    .post(rolesController.postRoles);
//ya ichrak el : yaany params w el esm elli baaed el : hedheka esm el paaaaaaaaaaarams 
router.route('/roles/:rolesId')
    .put( rolesController.putRoles)
    .delete(rolesController.deleteRoles);

////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
/************* Gender **********/
/***********************************/
router.route('/gender')
    .get(genderController.getGender)
    .post(genderController.postGender);

router.route('/gender/:genderId')
    .put(genderController.putGender)
    .delete(genderController.deleteGender);

////////////////////////////////////////////////////////////////////////


/************* Reclamations **********/
/***********************************/
router.route('/Reclamations')
    .get(ReclamationsController.getReclamations)
    .post(ReclamationsController.postReclamations)


router.route('/Reclamations/:cin')
    .post(ReclamationsController.postReclamations)
    .put(ReclamationsController.putReclamations)
    .delete(ReclamationsController.deleteReclamations);

////////////////////////////////////////////////////////////////////////
///////////////////////employees////////////////////////////////////////

// router.route('/employees')
//     // .get(employeController.getEmployees)
//    // .post(employeController.postEmployeesXLSX)
//     // .post(employeController.postEmployees);

// router.route('/employees/:employeesId')
//     .put( employeController.putEmployees)
//     .delete(employeController.deleteEmployees);


//************ Signup **************//
router.route('/account/signup')
    .post(authenticationController.postNewClients);
      
//************ Login **************//
router.route('/account/login')
    .post(authenticationController.postLogin);

//************ Logout **************//
router.route('/account/logout')
    .get(authenticationController.getLogout);

////////////////////////////////////////////////////////////////////////
///////////////////////bulletin////////////////////////////////////////

router.route('/bulletin')
    .get(bulletinController.getBulletin)
    .post(bulletinController.postBulletin);

router.route('/bulletin/:bulletinId')
    .put( bulletinController.putBulletin)
///////////////////////////////////////////////////////////////////////
///////////////////////doctor////////////////////////////////////////

 router.route('/doctor')
     .get(doctorController.getDoctor)
     .post(doctorController.postDoctor);

 router.route('/doctor/:doctorId')
     .put(doctorController.putDoctor)
     .delete(doctorController.deleteDoctor);

///////////////////////////////////////////////////////////////////////
///////////////////////consultation////////////////////////////////////////

router.route('/consultation')
.get(consultationController.getConsultation)
.post(consultationController.postConsultation)

///////////////////////////////////////////////////////////////////////
///////////////////////Pharmacie////////////////////////////////////////

 router.route('/arrangement')
     .get(arrangementController.getArrangement)
     .post(arrangementController.postArrangement);

 router.route('/arrangement/:arrangementId')
     .put(arrangementController.putArrangement)

///////////////////////////////////////////////////////////////////////
///////////////////////Hospitalization////////////////////////////////////////

 router.route('/hospitalization')
     .get(hospitalizationController.getHospitalization)
     .post(hospitalizationController.postHospitalization);

 router.route('/hospitalization/:hospitalizationid')
     .put(hospitalizationController.putHospitalization)  
router.route('/dental') 
.get(dentalController.getDental) 
.post(dentalController.postDental) ;

///////////////////////BulltinFullDetails////////////////////////////////////////

 router.route('/bsfdetails')
 .get(bsfdetails.getBulletinFullDetails)
 router.route('/bsfdetails/:bulletinId')
 .get(bsfdetails.getBulletinFullDetails)

 
///////////////////////remboursement////////////////////////////////////////
router.route('/remboursement')
.get(remboursementController.getRoumbersment)
.post(remboursementController.postRoumbersment);
router.route('/remboursement/:bulletinId')
.get(remboursementController.getRoumbersment)
.post(remboursementController.postRoumbersment);
router.route('/remboursement/:bulletinId/:amount')
.get(remboursementController.getRoumbersment)
.post(remboursementController.postRoumbersment);


router.route('/user')
.get(authenticationController.getUser);

router.route('/sum')
    .post(SumController.postSum);


module.exports = router;
