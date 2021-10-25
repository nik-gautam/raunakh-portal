const finalDate = new Date("October 21,2021 18:00:00").getTime();
 
 timer = () => {
    const now = new Date().getTime();
    const diff = finalDate - now;
    if(diff < 0){
        clearInterval(x);
        document.getElementById('timer-heading').innerHTML = 'Event Ended<br> <h5 class="white-color mb-4" style="opacity: 0.8;">Donations open till November 19, 2020 </h5>';
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
