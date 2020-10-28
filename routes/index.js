var express = require('express');
var router = express.Router();
var server = require('http').createServer(express());
var io = require('socket.io')(server); 
var Razorpay = require("razorpay");
var Donator = require('../models/donations');

let rzr = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { });
});

router.get("/donations", (req, res) => {
  if(req.isAuthenticated()) {
    Donator.find({}, (err, donators)=>{
      if(err){
        console.log(err);
      }else{
        res.render("donations", {donators: donators});
      }
    });   
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

  var options = {
    amount: parseInt(req.body.amount) * 100,
    currency: "INR",
  };

  rzr.orders.create(options, function (err, order) {
    if (!err) {
      console.log(order);
      res.render("payment", { order_id: order.id, amount: order.amount });
    } else {
      res.render("error", { error: err, message: "error aagaya bhai!!" });
    }
  });
});

router.post("/thanks", async (req, res, next) => {
  console.log(req.body);

  // req.body will look like
  // [Object: null prototype] {
  //   razorpay_payment_id: 'pay_FuEZsb9wnYJSAL',
  //   razorpay_order_id: 'order_FuEZT10FoiN40H',
  //   razorpay_signature: '5b408cc7f17d666648cdf90955c7bcf2493f26324acc9e44b479361ed3937d7b'
  // }

  rzr.payments.fetch(req.body.razorpay_payment_id, (err, payment) => {
    if (err) {
      return res.render("error", {
        error: err,
        message: "error aagaya bhai!!",
      });
    }

    var email = payment.email;
    var contact = payment.contact;
    var method = payment.method;
    var amount = payment.amount/100;
    var currency = payment.currency;
    var order_id = payment.order_id;
    var date_created = payment.created_at;

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
        console.log(err);
      }else{
        console.log("added to db successfully");
      }
    })
    // payment will look like this
    // {
    //   "id": "pay_FuEeZ4AxdXB83e",
    //   "entity": "payment",
    //*   "amount": 1000,
    //   "currency": "INR",
    //   "status": "captured",
    //*   "order_id": "order_FuEe7dCSniLItk",
    //   "invoice_id": null,
    //   "international": false,
    //*   "method": "upi",
    //   "amount_refunded": 0,
    //   "refund_status": null,
    //   "captured": true,
    //   "description": null,
    //   "card_id": null,
    //   "bank": null,
    //   "wallet": null,
    //   "vpa": "success@razorpay",
    //*   "email": "nik@g.com",
    //*   "contact": "+911236547890",
    //   "notes": [],
    //   "fee": 24,
    //   "tax": 4,
    //   "error_code": null,
    //   "error_description": null,
    //   "error_source": null,
    //   "error_step": null,
    //   "error_reason": null,
    //   "acquirer_data": {
    //   "rrn": "260510363608",
    //   "upi_transaction_id": "1D496EC42BBBAB45AF546E2458A4C229"
    //   },
    //*   "created_at": 1603869351
    //   }

    res.render("thanks", {
      email: payment.email,
      amount: payment.amount,
      paymentId: payment.id,
    });
  });
});


// io.sockets.on("connection", (socket)=>{
//   socket.on("donation", (data)=>{
//     socket.broadcast.emit("donation-successfull", data);
//   });
// });

module.exports = router;
