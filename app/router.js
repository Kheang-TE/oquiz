const { Router } = require("express");
const router = Router();

const { 
  authController,
  levelController,
  quizController,
  tagController,
  userController,
  errorController
} = require('./controllers');

const {isLogged,isAdmin} = require('./utils/isLogged');

// Initialisation des messages d'erreur
router.use(errorController.msgError);

// Initisalisation de la session
router.use(authController.session);

// accueil
router.get('/',quizController.homepage);

// catégories
router.get('/tags',tagController.tagsPage);
router.get('/tag/:tagId',tagController.tagSingle);

// auteurs
router.get('/authors',userController.authorsPage);
router.get('/author/:authorId',userController.profilPage);

// niveaux
router.get('/levels',isLogged,levelController.levelsPage);
router.post('/levels',isAdmin,levelController.insertLevel);
router.get('/level/delete/:levelId',isAdmin,levelController.deleteLevel);
router.get('/level/:levelId',isLogged,levelController.levelDetail);
router.post('/level/:levelId',isLogged,levelController.updateLevel);

// quiz
router.get('/quiz/:quizId',isLogged,quizController.quizDisplay);
router.post('/quiz/:quizId',isLogged,quizController.quizSubmit)

// signup
router.get('/signup',authController.signupPage);
router.post('/signup',authController.signupNewUser);

// login
router.get('/login',authController.loginPage);
router.post('/login',authController.loginConnect);
//logout
router.get('/logout',isLogged,authController.logout);
// profil
router.get('/profil',isLogged,authController.profilPage);

// erreur 404
router.use(errorController.notFound);

module.exports = router;