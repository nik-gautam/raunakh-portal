const socket = io();

const donate = JSON.parse(document.getElementById("donate").value);

console.log(donate);

socket.emit("payment-success", { data: donate });
