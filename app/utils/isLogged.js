const isLogged = (request,response,next) => {
  if(!request.session.user){
    return response.render('notAuthorized');
  }
  next();
}

const isAdmin = (request,response,next) => {
  const member = request.session.user;
  const url = request.originalUrl;
  console.log(url);
  if(!member){
    return response.render('notAuthorized');
  }
  if(member.role !== 'admin'){
    return response.render('notAuthorized');
  }
  next();
}

module.exports = {isLogged,isAdmin}