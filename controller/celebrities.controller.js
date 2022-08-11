const createError = require("http-errors")
const Celebrity = require("../models/Celebrity.model");

//READ
module.exports.list = (req, res, next) =>{
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/list", {celebrities})
    })
    .catch(next)
};

module.exports.celebritiesDetail = (req, res, next) => {
  const {id} = req.params;
  Celebrity.findById(id)
    .then((celebrity) => {
      res.render("celebrities/detail", { celebrity })
    })
    .catch(err => {
      next(createError(404, "celebrity not found"))
    })
}

//create
module.exports.create = (req, res, next) => {
  res.render("celebrities/form")
}

module.exports.doCreate = (req, res, next) => {
  const celebrity = req.body;
  
  Celebrity.create(celebrity)
    .then((createdCelebrity) => {
      res.redirect("/celebrities")
    })
    .catch( err =>{
      res.render("celebrities/form", {
        celebrity,
        errors: err.errors
      })
      next(err)
    })
}
module.exports.edit = (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then( (celebrity) => {
      res.render("celebrities/edit", { celebrity })
    })
    .catch(next)
}

module.exports.doEdit = (req, res, next) => {
  const { id } = req.params;
  Celebrity.findByIdAndUpdate( id,req.body, { new: true} )
    .then( (celebrity) => {
      res.redirect(`/celebrities/${celebrity.id}`)
    })
    .catch(next)
}

//Delete
module.exports.delete = (req, res, next) => {
  const { id } = req.params;
  Celebrity.findByIdAndDelete(id)
    .then( () => {
      res.redirect("/celebrities")
    })
    .catch(next)
}
