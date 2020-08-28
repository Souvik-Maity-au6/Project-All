var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var companySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    currEmployees: [{
      id: Schema.Types.ObjectId,
      name:String,
      joinedDate:Date      
    }],
    pastEmployees: [{
      id: String,
      name:String,
      resiginedDate:Date
    }],
    creator:{
      id:String,
      name:String
    },
   
  },
  { timestamps: true }
);

var Company = mongoose.model("company", companySchema);

module.exports = Company;
