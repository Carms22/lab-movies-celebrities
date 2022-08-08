const mongoose = require ("mongoose");

const celebritySchema = new mongoose.Schema(
  {
    name:{
      type:String 
    },
    occupation:{
      type:String
    },
    catchPhrase:{
      type: String
    }
  },
  {
    toObject: {virtuals: true}
  }
);

celebritySchema.virtual("movies",{
  ref: "Movie",
  localField: "_id",
  foreignField: "celebrity",
  justOne: false,
});

const Celebrity = mongoose.model("Celebrity", celebritySchema);
module.exports = Celebrity;
