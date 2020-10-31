const socket = io();

socket.on("user_updated", (data2) => {
    let data=data2.data
    $("#marquee_head").after(`<span style="margin-left: 4em;">${data.email}</span>`)
  });