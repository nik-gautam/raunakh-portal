const finalDate = new Date("November 13,2020 18:00:00").getTime();
 
 timer = () => {
    const now = new Date().getTime();
    const diff = finalDate - now;
    if(diff < 0){
        clearInterval(x);
        document.getElementById('timer-heading').innerHTML = "Event has been started <br> <p>Click below to join now</p>";
        $('.slider-02-text').addClass("margin-custom-class");
        document.getElementById('timer-container').style.display = "none";
        // document.getElementById('if-expired').style.display = "block";
        document.getElementById('live-stream').style.display = "block";
        
    }
    let days = Math.floor(diff/(1000*60*60*24));
    let hours = Math.floor((diff% (1000*60*60*24))/(1000*60*60));
    let minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
    let seconds = Math.floor(diff % (1000*60)/1000);

    days <= 9 ? days= `0${days}`:
    days <= 99 ? days= `${days}`:days;

    hours <= 9 ? hours = `0${hours}` : hours;
    minutes <=9 ? minutes = `0${minutes}` : minutes;
    seconds <=9 ? seconds = `0${seconds}` : seconds;

    document.querySelector("#days .box").textContent = days;
    document.querySelector("#hours  .box").textContent = hours;
    document.querySelector("#minutes  .box").textContent = minutes;
    document.querySelector("#seconds .box").textContent = seconds;

}
const x = setInterval(timer, 1000);
