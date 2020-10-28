let order_id = document.getElementById("order_id").value;
let amount = document.getElementById("amount").value;

console.log(order_id + " " + amount);

var options = {
  key: "rzp_test_nPAgDRmRtPGa4i",
  amount: amount,
  currency: "INR",
  order_id: order_id,
  callback_url: "http://localhost:3000/thanks",
  //callback_url: "https://raunakh-portal.herokuapp.com/thanks"
};

let rzr = new Razorpay(options);

rzr.on("payment.failed", function (response) {
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata);
});
document.getElementById("razorpay-btn").onclick = function (e) {
  rzr.open();
  e.preventDefault();
};
