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
$('.carousel').carousel();
