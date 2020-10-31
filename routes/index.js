require("dotenv").config()
var express = require('express');
var router = express.Router();
var server = require('http').createServer(express());
var io = require('socket.io')(server); 
var Razorpay = require("razorpay");
var Donator = require('../models/donations');
const nodemailer = require("nodemailer");

let rzr = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "403bugs@gmail.com",
    pass: "herokuneeded"
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  Donator.find({}, (err, donators)=>{
    if(err){
      console.log(err);
    }else{
      // console.log(donators);
      res.render('index', {donators: donators });
    }
  }).sort({_id:-1}).limit(10);
  
});

router.get("/donations", (req, res) => {
  if(req.isAuthenticated()) {
    Donator.find({}, (err, donators)=>{
      if(err){
        console.log(err);
      }else{
        res.render("donations", {donators: donators});
      }
    }).sort({_id:-1});   
  } else {
    res.status(403).send("Access denied")
  }
});


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/")
})

router.post("/payment", async (req, res, next) => {
  console.log(req.body.amount);

  let callbackUri = "http://localhost:3000/thanks";

  if(process.env.NODE_ENV == "production") {
    callbackUri = req.protocol + '://' + req.get('host') + "/thanks";
  }
 
  console.log(callbackUri)

  var options = {
    amount: parseFloat(req.body.amount) * 100,
    currency: "INR",
  };

  rzr.orders.create(options, function (err, order) {
    if (!err) {
      console.log(order);
      res.render("payment", { order_id: order.id, amount: order.amount, callbackUri });
    } else {
      res.render("error", { error: err, message: "error aagaya bhai!!" });
    }
  });
});

router.post("/thanks", async (req, res, next) => {
  console.log(req.body);


  rzr.payments.fetch(req.body.razorpay_payment_id, (err, payment) => {
    if (err) {
      return res.render("error", {
        error: err,
        message: "error aagaya bhai!!",
      });
    }

    console.log(payment);

    var email = payment.email;
    var contact = payment.contact;
    var method = payment.method;
    var amount = payment.amount/100;
    var currency = payment.currency;
    var order_id = payment.order_id;
    var date_created = new Date(); 


    var newDonator = {
      email: email,
      contact: contact,
      method: method,
      amount: amount,
      currency: currency,
      order_id: order_id,
      date_created: date_created
    };

    Donator.create(newDonator, (err, newDonatorCreated)=>{
      if(err){
        return res.render("error", {
          error: err,
          message: "error aagaya bhai!!",
        });
      }else{
        console.log("added to db successfully");

        var mailContent = {
          name: "Haala",
          email: newDonatorCreated.email,
          subject: "hella",
          message: "fhahflksa"
        }
  
        
        var mailOptions = {
          from: "403bugs@gmail.com",
          to: mailContent.email,
          subject: mailContent.subject,
          text: mailContent.name + " sent you a message : \n" + JSON.stringify(mailContent.message) + "\n email id: " + mailContent.email
        };
  
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            return res.render("error", {
              error: error,
              message: "error aagaya bhai!!",
            });
          } else {
            console.log('Email sent: ' + info.response);
            res.redirect("/");
          }
        });  
  
        transporter.close();

        res.render("thanks", {
          donate: JSON.stringify(newDonatorCreated.toJSON()),
          currency,
          amount
        });
      }
    })  
  });
});




module.exports = router;
