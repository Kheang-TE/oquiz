const Answer = require('./Answer');
const Level = require('./Level');
const Question = require('./Question');
const Quiz = require('./Quiz');
const Tag = require('./Tag');
const User = require('./User');

// Answer <=> Question
Question.hasMany(Answer,{
  as: 'propositions',
  foreignKey: 'question_id'
});
Answer.belongsTo(Question,{
  as: 'questions',
  foreignKey: 'question_id'
});
Question.belongsTo(Answer,{
  as: 'good_answer',
  foreignKey: 'answer_id',
});

// Level <=> Question
Question.belongsTo(Level,{
  as: 'level',
  foreignKey: 'level_id'
});
Level.hasMany(Question,{
  as: 'questions',
  foreignKey: 'level_id'
});

// Quiz <=> Tag
Quiz.belongsToMany(Tag,{
  as: 'tags',
  through: 'quiz_has_tag',
  foreignKey: 'quiz_id',
  otherKey: 'tag_id'
});
Tag.belongsToMany(Quiz,{
  as: 'quizzes',
  through: 'quiz_has_tag',
  foreignKey: 'quiz_id',
  otherKey: 'tag_id'
});

// Quiz <=> User
Quiz.belongsTo(User,{
  as: 'author',
  foreignKey:'author_id'
});
User.hasMany(Quiz,{
  as: 'quizzes',
  foreignKey:'author_id'
});

// Quiz <=> Question
Quiz.hasMany(Question,{
  as:'questions',
  foreignKey:'quiz_id'
});
Question.belongsTo(Quiz,{
  as:'quiz',
  foreignKey:'quiz_id'
});


module.exports = {
  Answer,
  Level,
  Question,
  Quiz,
  Tag,
  User,
}