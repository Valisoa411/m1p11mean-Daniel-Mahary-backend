const express = require('express');

const router = express.Router();

const managerController = require('../controllers/managerController');
const serviceController = require('../controllers/serviceController');
const employeController = require('../controllers/employeController');

const verifyToken = require('../middleware/tokenmiddleware');

const multer = require('multer');
const offreSpecialController = require('../controllers/offreSpecialController');
const rendezVousController = require('../controllers/rendezVousController');

// Configuration Multer pour le téléchargement de fichiers
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Configuration Cloudinary

// router.post('/init', managerController.initManager);
router.post('/login', managerController.loginManager);

router.get('/service', serviceController.allServices);
router.get('/service/:id', serviceController.getServiceById);

const routerManager = () => {
  const routerMan = express.Router();

  //route qui a besoin d'authentification client
  routerMan.post('/createEmploye', upload.single('photo'), managerController.createEmploye);
  routerMan.get('/listEmploye', managerController.liste_employe);
  routerMan.delete('/deleteEmploye/:id', managerController.delete_employe);

  routerMan.post('/employe', employeController.createEmploye);
  
  routerMan.get('/search', managerController.searchEmploye);

  routerMan.post('/service', serviceController.createService);
  routerMan.put('/service', serviceController.updateService);
  routerMan.delete('/service/:id', serviceController.deleteService);

  routerMan.post('/offreSpecial', offreSpecialController.createOffreSpecial);
  routerMan.get('/offreSpecial', offreSpecialController.allOffreSpecials);
  routerMan.get('/offreSpecial/:id', offreSpecialController.getOffreSpecialById);
  routerMan.put('/offreSpecial', offreSpecialController.updateOffreSpecial);
  routerMan.delete('/offreSpecial/:id', offreSpecialController.deleteOffreSpecial);
  routerMan.get('/listeRdv' , employeController.listeRdvForViewManager);
  routerMan.get('/searchRdv' , employeController.searchRdvViewForManager);
  routerMan.get('/moyenneHeureTravail', employeController.MoyenneHeureTravail);
  routerMan.get('/info_employe', managerController.info_employe);
  routerMan.get('/byDate', rendezVousController.byDate);
  routerMan.get('/byMonth', rendezVousController.byMonth);
  routerMan.get('/byDateChiffreAffaire', rendezVousController.byDateChiffreAffaire);
  routerMan.get('/byMonthChiffreAffaire', rendezVousController.byMonthChiffreAffaire);
  routerMan.get('/beneficeByMonth', rendezVousController.benefice);
  routerMan.post('/createTypeDepense', managerController.createTypeDepense);
  routerMan.post('/createDepense', managerController.createDepense);
  routerMan.get('/listeTypeDepense', managerController.allTypeDepense);
  routerMan.get('/listeDepense', managerController.allDepense);
  routerMan.get('/getTypeDepense', managerController.getTypeDepenseId);
  routerMan.delete('/deleteDepense/:id', managerController.delete_depense);

  return routerMan;
}

router.use(verifyToken('manager'), routerManager());


module.exports = router;