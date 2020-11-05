var mongoose = require('mongoose');

var donatorSchema = new mongoose.Schema({
    email: String,
    contact: Number,
    method: String,
    amount: String,
    currency: String,
    order_id: String,
    payment_id: String,
    date_created: Date
});

module.exports = mongoose.model("Donator", donatorSchema);