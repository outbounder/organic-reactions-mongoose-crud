var chain = require("organic-alchemy").http.chain
var fromActions = require("organic-reactions-rest").fromActions
var expressSend = require("organic-reactions-expressSend").expressSend

module.exports.crud = function(base_url, model) {
  return chain(
    fromActions(base_url, {
      "GET /list":  function(req, res, next){
        model.find({}).exec(next)
      },
      "GET /:id": function(req, res, next) {
        model.findById(req.params.id).exec(next)
      },
      "POST /create": function(req, res, next) {
        model.create(req.body, next)
      },
      "PUT /:id": function(req, res, next){
        model.findByIdAndUpdate(req.params.id, req.body, next)
      },
      "DELETE /:id": function(req, res, next) {
        model.findByIdAndRemove(req.params.id, next)
      }
    }),
    expressSend)
}