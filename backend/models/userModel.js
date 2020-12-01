const mongoose= require ('mongoose');

const Schema = mongoose.Schema;

const userSchema= new Schema ({
    facebookId: String,
    name:{type: String, required: true},
    lastname:{type: String, required: true},
    email:{type: String, required: true, unique:true, dropDups:true},
    isAdmin:{type: Boolean, default: false}
})



module.exports = mongoose.model("User", userSchema);