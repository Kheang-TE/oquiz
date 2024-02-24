const {User} = require('../models');
const validator = require('../utils/validator');
const bcrypt = require('bcrypt');

const authController = {

  session: (request,response,next) => {
    response.locals.user = (request.session.user) ? request.session.user : null;
    next();
  },

  signupPage: (request,response) => {
    response.render('signup');
  },
  signupNewUser: async (request,response,next) => {
    const {firstname,lastname,email,password} = request.body;
    try{

      // Vérification de la conformité du formulaire (password & email)
      await validator.accordanceForm(request,response);

      // Hashage password
      const salt = bcrypt.genSaltSync(+process.env.HASH_SALTROUNDS);
      const hash = bcrypt.hashSync(password, salt);

      // Insertion nouvel utilisateur dans la database
      await User.create({firstname,lastname,email,password:hash});

      // Redirection vers la page login
      return response.redirect('/login');

    } catch(error){
      return response.status(500).render('500');
    }
  },

  loginPage: (request,response) => {
    response.render('login');
  },
  loginConnect: async (request,response) => {
    const {email,password} = request.body;
    
    try{

      const user = await User.findOne({where:{email}});
      if(!user || !bcrypt.compareSync(password, user.password)){
        const msgError = 'L\'email ou le mot de passe invalide.';
        return response.render('login',{msgError});
      }

      request.session.user = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        create_ad: user.create_ad
      }


      response.redirect('/');
      
    } catch(error){
      response.status(500).render('500');
    }
  },
  logout: (request,response) => {
    request.session.user = null;
    response.redirect('/');
  },
  profilPage: (request,response) => {
    response.render('profil');
  }

};

module.exports = authController;