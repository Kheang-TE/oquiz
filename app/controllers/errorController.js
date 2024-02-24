const errorController = {
  notFound: (request,response) => {
    response.status(404).render('404');
  },

  msgError: (request,response,next) => {
    response.locals.msgError = null;
    next();
  },
}

module.exports = errorController;