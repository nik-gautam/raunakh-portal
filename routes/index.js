var express = require('express');
var router = express.Router();
var server = require('http').createServer(express());
var io = require('socket.io')(server); 


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { });
});

io.sockets.on("connection", (socket)=>{
  socket.on("donation", (data)=>{
    socket.broadcast.emit("donation-successfull", data);
  });
});

module.exports = router;
