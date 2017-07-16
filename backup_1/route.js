var Index = require("./myindex");

module.exports = function(app){
  app.use(function(req, res, next){
    app.locals.sockets[0].write('11');
  })

  app.get('/api_ledopen', Index.open)

  app.get('/api_ledclose', Index.close)

  app.post('/api_ledcontrol', Index.control)
}