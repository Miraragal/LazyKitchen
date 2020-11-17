const mongoose= require ('mongoose');

//const passportLocalMongoose = require ('passport-local-mongoose')
const Schema = mongoose.Schema;

const userSchema= new Schema ({
    name:{type: String, required: true},
    email:{type: String, required: true, unique:true, dropDups:true},
    //facebookId: String,
    isAdmin:{type: Boolean, required:true, default: false}
})

//userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User", userSchema);