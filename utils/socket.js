exports.socketHandler = ( io ) => {

  io.on('connection', socket => {
    console.log("Socket Connected")
  
    socket.on("payment-success", function(data) {
      console.log("data sent")
      io.emit("user_updated",data)
    })
  })
}