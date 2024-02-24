const {User} = require('../models');
const sequelize = require('../models/connexion');

const userController = {
  authorsPage: async (request,response) => {
    try{
      const users = await User.findAll({
        attributes: [
          'id',
          'lastname',
          'firstname',
          'role',
          [sequelize.fn('LEFT', sequelize.col('lastname'), 1), 'letter'],
        ],
        order:[['lastname','ASC']],
        raw: true,
      });

      // objet des auteurs regroupé par lettre
      const authors = {}
      for(const user of users){
        const letter = user.letter.toUpperCase();
        // crée la lettre si elle n'existe pas encore
        if(!authors[letter]){
          authors[letter] = [];
        }
        authors[letter].push(user);
      }

      response.render('authors',{authors});
    } catch(error){
      response.status(400).send(error);
    }
  },

  profilPage: async (request,response) => {
    const {authorId} = request.params;
    try{
      const user = await User.findOne({
        include:[
          {
            association: 'quizzes',
            attributes:['id','title'],
          }
        ],
        order:[['quizzes','title','asc']],
        where:{id: authorId}
      });
      if(!user) response.status(404).redirect('/404');
      response.render('profil',{user});
    } catch(error){
      response.status(400).send(error);
    }
  },
}

module.exports = userController;