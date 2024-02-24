const {Tag} = require('../models');

const tagController = {
  tagsPage: async (request,response) => {
    try{
      const tags = await Tag.findAll({
        order:[
          ['name','ASC'],
          ['quizzes','title','ASC']
        ],
        include:[{
          association: "quizzes"
        }]
      });
      if(!tags) response.redirect('/');
      response.render('tags',{tags})
    } catch(error){
      response.status(500).send(error);
    }
  },

  tagSingle: async (request,response) => {
    const {tagId} = request.params;
    try{
      const tag = await Tag.findOne({
        include:[
          {
            association: "quizzes",
            attributes:['id','title']
          }
        ],
        order:[['quizzes','title','ASC']],
        where:{id: tagId}
      });
      response.render('tag',{tag});
    } catch(error){
      response.status(500).send(error);
    }
  },
}

module.exports = tagController;