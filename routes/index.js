require("dotenv").config()
var express = require('express');
var router = express.Router();
var server = require('http').createServer(express());
var io = require('socket.io')(server); 
var Razorpay = require("razorpay");
var Donator = require('../models/donations');
const nodemailer = require("nodemailer");
var ejs = require('ejs');
const path = require('path');

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
    user: "octave.raunakh@gmail.com",
    pass: "Octave#Raunakh2020"
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  Donator.find({}, (err, donators)=>{
    if(err){
      console.log(err);
    }else{
      Donator.find({}).then((allfetched)=>{
        let amount=Math.round(allfetched.reduce((acc,val)=>acc+ parseFloat( (val.amount)),0))
      let count=allfetched.length;
      res.render('index', {donators: donators , amount , count});
      }).catch((err)=>res.render("error", {
        error: err,
        message: "error aagaya bhai mongodb m!!",
      }))
      
    }
  }).sort({_id:-1}).limit(10);
  
});

router.post("/", (req, res)=>{
  var contactContent = {
    name: req.body.contactname,
    email: req.body.contactemail,
    subject: req.body.contactsubject,
    message: req.body.contactmessage
};

var contactOptions = {
  from: 'octave.raunakh@gmail.com',
  to: 'octave.raunakh@gmail.com',
  subject: "[Raunakh] " + contactContent.subject,
  text: contactContent.name + " sent you a message : \n" + JSON.stringify(contactContent.message) + "\n email id: " + contactContent.email
};

transporter.sendMail(contactOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    res.redirect("/");
  }
});  

transporter.close();

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
      res.render("error", { error: err, message: "Something went wrong." });
    }
  });
});

router.post("/thanks", async (req, res, next) => {
  //console.log(req.body);


  rzr.payments.fetch(req.body.razorpay_payment_id, (err, payment) => {
    if (err) {
      return res.render("error", {
        error: err,
        message: "sSomething went wrong.",
      });
    }
    console.log(payment)

    //console.log(payment);

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

      Donator.find({'order_id': order_id}, (err, donator)=>{
        if(err){
          console.log(err);
        }
        else{
          if(!donator.length){
            Donator.create(newDonator, (err, newDonatorCreated)=>{
              if(err){
                return res.render("error", {
                  error: err,
                  message: "error aagaya bhai!!",
                });
              }else{
                console.log("added to db successfully");
                ejs.renderFile(path.join(__dirname, '..', 'email', 'email.ejs'), function(err, str){
                  // str => Rendered HTML string
                  if(err) {
                    console.log(err);
                    return;
                  }
        
                var mailContent = {
                  name: "Raunakh",
                  email: newDonatorCreated.email,
                  subject: "Thank you for donating!",
                  
                }
          
                
                var mailOptions = {
                  from: "octave.raunakh@gmail.com",
                  to: mailContent.email,
                  subject: mailContent.subject,
                  html: str
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
                   
              });
        
                res.render("thanks", {
                  donate: JSON.stringify(newDonatorCreated.toJSON()),
                  currency,
                  amount
                });
              }
            });
          }
          else{
            res.redirect("/");
          }
        }
      });

        
  });
});

// router.get("/paymentfailed", (req,res,next)=>{
//   var error = {
//     status: req.query.code
//   }
//   var message = req.query.description;
//   // var reason = req.query.reason;
//   res.render("error", {error: error, message: message});
// })

router.get("/privacypolicy", (req, res) => {

  res.render("privacyPolicy");
})

router.get("/refundpolicy", (req, res) => {
  res.render("refund");
})

router.get("/tnc", (req, res) => {
  res.render("tnc");
})


module.exports = router;
