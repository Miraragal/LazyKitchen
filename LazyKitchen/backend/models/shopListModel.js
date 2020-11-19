const mongoose= require ('mongoose');
const Schema = mongoose.Schema;

const shoppingSchema= new Schema ({
    product:{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    quantity:{type: Number, default: 1},
})




module.exports = mongoose.model("Shopping", shoppingSchema);