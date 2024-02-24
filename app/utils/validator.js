const {User} = require('../models');
const emailValidator = require('email-validator');
const validator = {

  accordanceForm : async (request,response) => {
    const {firstname,lastname,email,password,confirmation} = request.body;
    let msgError = null;
    try{

      // fields guard
      if(!firstname || !lastname || !email || !password || !confirmation){
        msgError = 'Veuillez remplir tous les champs';
        return response.render('signup',{msgError});
      }

      // password guard
      if(password !== confirmation){
        msgError = 'Les mots de passe ne sont pas identiques';
        return response.render('signup',{msgError});
      }

      // email accordance guard
      if (!emailValidator.validate(email)) {
        msgError = 'Email invalide';
        return response.render('signup',{msgError});
      }

      // email exists guard
      const user = await User.findOne({where:{email}});
      if(user){
        msgError = 'Cet email a déjà été utilisé';
        return response.render('signup',{msgError});
      }
    } catch(error){
      return response.status(500).render('500');
    }
  }
}

module.exports = validator;