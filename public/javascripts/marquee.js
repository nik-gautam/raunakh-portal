const socket = io();

socket.on("user_updated", (data2) => {
    let data=data2.data
    $("#marquee_head").after(`<span style="margin-left: 4em;">${data.email}</span>`)
    console.log(data2,"check");
    document.getElementById('don_count1').textContent=data2.count
    document.getElementById('don_amt1').textContent=data2.amount
    document.getElementById('don_count2').textContent=data2.count
    document.getElementById('don_amt2').textContent=data2.amount
  }); 