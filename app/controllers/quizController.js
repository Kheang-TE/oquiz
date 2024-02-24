const {Quiz,Question} = require('../models');
const { associations } = require('../models/Answer');
const sequelize = require('../models/connexion');

const quizController = {
  // affichage page d'accueil
  homepage: async (request,response) => {
    try{
      const perPage = 6;
      const currentPage = (request.query.page) ? +request.query.page : 1;
      const offsetPage = (request.query.page) ? (request.query.page-1)*perPage : 0;
      let pagination = null;
      const nbQuizzes = await Quiz.count();
      const quizzes = await Quiz.findAll({
        attributes:['id','title','description'],
        include:[
          {
            association:'tags',
            attributes:['id','name'],
          },
          {
            association:'author',
            attributes:['id','firstname','lastname'],
          }
        ],
        order:[['title','ASC']],
        limit: perPage,
        offset: offsetPage
      });
      if(nbQuizzes > perPage){
        pagination = {
          nbPage : Math.ceil(nbQuizzes/perPage),
          currentPage
        }
      }
      response.render('home',{quizzes,pagination});
    } catch(error){
      response.status(400).send(error);
    }
  },

  // affichage d'une page de quiz
  quizDisplay: async (request,response) => {
    const {quizId} = request.params;
    try{
      const quiz = await Quiz.findOne({
        where:{id:quizId},
        include:[
          {
            association:'author',
            attributes:['id','firstname','lastname']
          },
          {
            association:'tags',
            attributes:['id','name']
          },
          {
            association:'questions',
            attributes:['description','anecdote','wiki'],
            include:[
              {
                association:'level',
                attributes:['name']
              },
              {
                association:'propositions',
                attributes:['id','description','question_id']
              }
            ],
          }
        ],    
      });
      quiz.date = new Intl.DateTimeFormat('fr-FR').format(quiz.created_at);
      response.render('quiz',{quiz});
    } catch(error){
      response.status(500).renderer('500');
    }
  },

  // envoie d'un quiz
  quizSubmit: async (request,response) => {
    try{
      // Récupère l'id du quiz
      const {quizId} = request.params;

      // récupère le résultat du joueur
      const choicePlayer = request.body;

      // récupère les bonnes réponses du quiz
      const quiz = await Quiz.findOne({
        where:{id: quizId},
        include:[
          {
            association:'author',
            attributes:['id','firstname','lastname']
          },
          {
            association:'tags',
            attributes:['id','name']
          },
          {
            association:'questions',
            attributes:['id','description','anecdote','answer_id'],
            include:[
              {
                association:'level',
                attributes:['name']
              },
              {
                association:'propositions',
                attributes:['id','description','question_id']
              }
            ]
          }
        ]
      });
      quiz.date = new Intl.DateTimeFormat('fr-FR').format(quiz.created_at);

      // crée un nouvel object avec le résultat du joueur
      const player = {};
      let score = 0;

      // on parcourt les questions du quiz
      for (const question of Object.values(quiz.questions)){

        // on vérifie que le joueur a répondu à la question
        if(Object.hasOwn(choicePlayer,question.id)){ 

           // si le joueur a trouvé la bonne réponse ou non
          const bool = (+choicePlayer[question.id] === question.answer_id) ? true : false;

          // on ajoute +1 si le joueur a trouvé la bonne réponse
          if(bool){score++;}

          // on renvoie le résultat dans le object player
          player[question.id] = [+choicePlayer[question.id],bool];

        } else{
          // dans le cas où il n'a pas répondu à la question
          player[question.id] = [null,false]
        }
      }
      // on ajoute le score à l'object player
      player['score'] = score;

      response.render('quizResult',{quiz,player});
    } catch(error){
      console.log(error);
      response.status(500).render('500');
    }

  }
}

module.exports = quizController;