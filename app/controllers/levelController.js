const {Level} = require('../models');

const levelController = {
  levelsPage : async (request,response) => {
    try{
      const levels = await Level.findAll({
        order:[['name','ASC']]
      });
      response.render('levels',{levels});
    } catch(error){
      response.status(500).render("500");
    }
  },
  
  insertLevel: async (request,response) => {
    const {name} = request.body;
    try{
      const level = await Level.findOne({where:{name}});
      if(!level){
        new Level({name}).save();
      }
      response.redirect('/levels');
    } catch(error){
      response.status(400).render('500')
    }
  },

  deleteLevel: async (request,response) => {
    const {levelId} = request.params;
    try{
      await Level.destroy({where:{id:levelId}});
      response.redirect('/levels');
    } catch(error){
      response.status(500).render('500');
    }
  },

  updateLevel: async (request,response) => {
    const {levelId} = request.params;
    const {name} = request.body;
    try{
      await Level.update({name},{
        where:{id: levelId}
      });
      response.redirect('/levels');
    } catch(error){
      response.status(500).render('500');
    }
  },

  levelDetail: async (request,response) => {
    const {levelId} = request.params;
    try{
      const level = await Level.findOne({
        include:[{
          association: 'questions'
        }],
        where:{
          id: levelId
        },
      });
      response.render('level',{level});
    } catch(error){
      response.status(500).render('500');
    }
  },
};

module.exports = levelController;