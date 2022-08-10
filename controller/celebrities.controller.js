const createError = require("http-errors")
const Celebrity = require("../models/Celebrity.model");

//READ
module.exports.list = (req, res, next) =>{
  Celebrity.find()
    //.populate("movies")
    .then((celebrities) => {
      res.render("celebrities/list", {celebrities})
    })
    .catch(next)
};

module.exports.celebritiesDetail = (req, res, next) => {
  const {id} = req.params;
  Celebrity.findById(id)
    // .populate({
    //   path: "movies",
    //   populate: {
    //     path:"celebrity",
    //   }
    // })
    .then((celebrity) => {
      res.render("celebrities/detail", { celebrity })
    })
    .catch(err => {
      next(createError(404, "celebrity not found"))
    })
}

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
