$(document).ready(()=>{
    console.log("js working");
    var total_donation = document.getElementById('total-donation').innerHTML; //add this id to tag containing total amount of donation received

    $(function(){
        var socket = io();
        socket.on("donation-successful", (data)=>{
            //if payment successful
            data.items.forEach((item)=>{
            total_donation += item.amount;   
            document.getElementById('total-donation').innerHTML = total_donation;
            
          });
        });
    });

});
<<<<<<< HEAD
$('.carousel').carousel();
=======

>>>>>>> 52e3f89e94adba83a2a7058b0efc543d4c66032d
