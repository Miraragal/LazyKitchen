var express = require("express");
var router = express.Router();
const User = require("../models/userModel");
const auth = require("../auth");
const { route } = require("../server");
// Middleware CORS-- control de acceso en los navigadore. Definimos solicitudes desde http de origen cruzado

// Get User Listing
router.get("/", auth.verifyUser, auth.veryAdmin, (req, res, next) => {
  User.find()
    .then((user) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(user);
    })
    .catch((err) => next(err));
});
//SignUp
//CreateAdmin
//Login
route.get(
  "/facebook/token",
  passport.authenticate("facebook-token"),
  (req, res) => {
    if (req.user) {
      //const token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        token: token,
        status: "You are successfully logged in!",
      });
    }
  }
);
//Logout
route.get('logout', (req, res, next)=>{
 if(req.session){
     req.session.destroy("Content-Type", "application/json");
     res.redirect('/')
 }else{
     const err= new Error('You are not logged in!');
     err.status=401;
     return next(err);
 }
})
