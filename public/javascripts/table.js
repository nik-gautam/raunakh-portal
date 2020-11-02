
function download_csv(csv, filename) {
  var csvFile;
  var downloadLink;

  csvFile = new Blob([csv], {
    type: "text/csv"
  });

  downloadLink = document.createElement("a");

  downloadLink.download = filename;

  downloadLink.href = window.URL.createObjectURL(csvFile);

  downloadLink.style.display = "none";

  document.body.appendChild(downloadLink);
  downloadLink.click();
}

function export_table_to_csv(html, filename) {
  var csv = [];
  var rows = document.querySelectorAll("table tr");

  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td, th");

    for (var j = 0; j < cols.length; j++) row.push(cols[j].innerText);

    csv.push(row.join(","));
  }

  download_csv(csv.join("\n"), filename);
}

document.getElementById("download-csv").addEventListener("click", function () {
  var html = document.getElementById("donation-table").outerHTML;
  export_table_to_csv(html, "donations.csv");
});

// document.getElementById("download-csv").onclick((e) => {});

//=================SOCKET UPDATING TABLE================

const socket = io();

socket.on("user_updated", (data2) => {
  let data=data2.data
  document.querySelectorAll('.sno').forEach((ele,index)=>
  {
    ele.textContent=index+2;
  })
  $("#donation-table tbody").prepend(`<tr><th scope="row" class="sno">${1}</th><td>${data.email}</td><td>${data.contact}</td><td>${data.method}</td><td>${data.amount}</td><td>${data.currency}</td><td>${data.order_id}</td><td>${new Intl.DateTimeFormat('en-GB', { year: 'numeric', month:
  'long', day: '2-digit'}).format(new
  Date(data.date_created).getTime())}</td><td>
  ${new Intl.DateTimeFormat('en-GB',{hour: 'numeric', minute: 'numeric', second: 'numeric', 
  timeZone: 'Asia/Kolkata'}).format(new
  Date(donator.date_created))}</td></tr>`)
});