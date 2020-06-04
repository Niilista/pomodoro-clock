var clock = document.getElementById("clock");
var secInput = document.getElementById("second");
var minInput = document.getElementById("minute");
var hourInput = document.getElementById("hour");
var start = document.getElementById("start");

Notification.requestPermission();

function spawnNotification(corpo, icone, titulo) {
    var opcoes = {
        body: corpo,
        icon: icone
    }
    var n = new Notification(titulo, opcoes);
}


start.addEventListener("click", function () {
    var hours = document.getElementById("hour").value;
    var minutes = document.getElementById("minute").value;
    var seconds = document.getElementById("second").value;
    if (!hours) {
        hours = 0;
    }
    if (!minutes) {
        minutes = 0;
    }
    if (!seconds) {
        seconds = 0;
    }
    getClock(hours, minutes, seconds);
});

function getClock(hours, minutes, seconds) {

    console.log(hours + ':' + minutes + ':' + seconds);
    secInput.value = seconds;
    minInput.value = minutes;
    hourInput.value = hours;

    var flag = false;

    if (seconds == 0) {
        if (minutes == 0) {
            if (hours == 0) {
                flag = true;
            } else {
                hours--;
                minutes = 59;
                seconds = 59;
            }
        } else {
            minutes--;
            seconds = 59;
        }
    } else {
        seconds--;
    }


    if (flag == true) {
        console.log("notificação");
        new Notification("Relógio Finalizado!");
        return;
    } else {
        setTimeout(function () { getClock(hours, minutes, seconds); }, 1000);
    }
}