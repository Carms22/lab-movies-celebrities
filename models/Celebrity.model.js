const mongoose = require ("mongoose");

const celebritySchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required: [true, "Name is required"]
    },
    occupation:{
      type:String,
      required: [true, "Occupation is required"]
    },
    catchPhrase:{
      type: String
    }
  }
);


const Celebrity = mongoose.model("Celebrity", celebritySchema);
module.exports = Celebrity;
