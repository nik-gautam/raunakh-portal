const mongoose = require("mongoose");
const Donator = require("../models/donations");
exports.socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket Connected");

    socket.on("payment-success", function (data) {
      Donator.find({}).then((fetched) => {
        data.amount = Math.round(
          fetched.reduce((acc, val) => acc + parseFloat(val.amount), 0)
        );
        data.count = fetched.length;

        io.emit("user_updated", data);
      });
    });
  });
};
