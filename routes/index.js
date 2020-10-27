var express = require('express');
var router = express.Router();
var server = require('http').createServer(express());
var io = require('socket.io')(server); 


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { });
});

router.get("/donations", (req, res) => {
  if(req.isAuthenticated()) {
    res.render("donations");
  } else {
    res.status(403).send("Access denied")
  }
});


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/")
})

io.sockets.on("connection", (socket)=>{
  socket.on("donation", (data)=>{
    socket.broadcast.emit("donation-successfull", data);
  });
});

module.exports = router;
