const Movie = require("../models/Movie.model");
const Celebrity = require ("../models/Celebrity.model");
const createError = require ("http-errors");

//CREATE
module.exports.create = (req, res, next) => {
  Celebrity.find()
    .then( (celebrities) => {
      res.render("movies/form.hbs", { celebrities })
    })
    .catch(next)
}
module.exports.doCreate = (req, res, next) =>{
  const movie = req.body;
  Movie.create(movie)
    .then((createdMovie) =>{
      res.redirect("/movies")
    })
    .catch(err => {
      res.render("movies/form", { 
        movie,
        errors: err.errors,
      })
      next(err)
    })
}

//READ
module.exports.list = (req, res, next) => {
  Movie.find()
   .then(movies =>{
    res.render("movies/list", { movies })
   })
   .catch(next)  
}

module.exports.moviesDetail = (req, res, next) => {
  const {id} = req.params;
  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/detail", { movie })
    })
    .catch(err => {
      next(createError(404, "movie not found"))
    })
}
//EDIT
module.exports.edit = (req, res, next) => {
  const { id } = req.params;
 
  Movie.findById(id)
  .populate("cast")
  .then ((movie) => {
    Celebrity.find()
    .then((celebrities) => {
      res.render("movies/edit", { movie, celebrities })
    })
  })
  .catch(next)
}

module.exports.doEdit = (req, res, next) =>{
  const { id } = req.params;
  Movie.findByIdAndUpdate(id, req.body, { new: true})
    .then( movie => {
      res.redirect(`/movies/${movie.id}`)
    })
    .catch(next)
}

//DELETE
module.exports.delete = (req, res, next) => {
  const {id} = req.params;
  Movie.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/movies")
    })
    .catch(next)
}
