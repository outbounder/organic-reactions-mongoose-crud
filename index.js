var rest = require("organic-reactions-rest")
var jsonResponse = require("organic-alchemy").http.jsonResponse;

module.exports.crud = function(base_url, model) {
  return rest.fromActions(base_url, {
    "GET /list": function(req, res, next) {
      model.find({}).exec(jsonResponse(res, next))
    },
    "GET /:id": function(req, res, next) {
      model.findById(req.params.id).exec(jsonResponse(res, next))
    },
    "POST /create": function(req, res, next) {
      model.create(req.body, jsonResponse(res, next))
    },
    "PUT /:id": function(req, res, next){
      model.findByIdAndUpdate(req.params.id, req.body, jsonResponse(res, next))
    },
    "DELETE /:id": function(req, res, next) {
      model.findByIdAndRemove(req.params.id, jsonResponse(res, next))
    }
  })
}