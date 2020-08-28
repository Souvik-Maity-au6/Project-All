var mongoose = require('mongoose');
var Schema = mongoose.Schema;

blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user: {
       id: {
            type: Schema.Types.ObjectId,
            ref: 'user'
       },
       name:{
            type: String,
            ref: 'user'
       }
    }
},
{ timestamps: true }
)




var Blog = mongoose.model('blog', blogSchema);
module.exports = Blog;