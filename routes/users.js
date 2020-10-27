var express = require('express');
var router = express.Router();
const passport = require("passport");

/* GET users listing. */

router.get('/', (req, res, next) => {
  res.render('login');
});

router.post('/', (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if(err){
      return next(err)
    }
    if(!user){
      return res.send("Wrong usernmame or password")
    }
    req.login(user, () => {
      res.redirect("/donations");
    })
  })(req, res, next)
})





module.exports = router;
