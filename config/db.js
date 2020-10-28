var mongoose = require('mongoose');

const URI = "mongodb+srv://prakriti-tech:ptcreations@raunakh-portal.blrdq.mongodb.net/donations?retryWrites=true&w=majority";

const connectDB = async ()=>{
    await mongoose.connect(URI, {useUnifiedTopology: true ,useNewUrlParser: true});
    console.log("db connected");
}

module.exports = connectDB;