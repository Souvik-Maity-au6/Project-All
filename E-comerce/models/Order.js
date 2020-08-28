var mongoose = require('mongoose');
var Schema = mongoose.Schema;

orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    product: {
            type: Schema.Types.ObjectId,
            ref: 'product'
}
},{timestamps: true})




var Order = mongoose.model('order', cartSchema);
module.exports = Order;