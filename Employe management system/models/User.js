var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      unique: true,
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    currCompany:{
      id: String,
      joiningDate:Date
    },
    pastCompanies:[{
      id: String,
      joinedDate:Date,
      resignedDate:Date
    }],
    ownCompany:{
      type: String,
    },
  },
  { timestamps: true }
);

var User = mongoose.model("user", userSchema);

module.exports = User;
