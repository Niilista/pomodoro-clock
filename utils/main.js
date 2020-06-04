var secInput = document.getElementById("second");
var minInput = document.getElementById("minute");
var hourInput = document.getElementById("hour");
var start = document.getElementById("start");
var pause = document.getElementById("pause");
var stopClock = document.getElementById("stop");
var flag = false;
var keepGoing = true;

//Notification.requestPermission();

secInput.addEventListener("input", function () {
    secInput.value = checkTime(secInput.value);
});
minInput.addEventListener("input", function () {
    minInput.value = checkTime(minInput.value);
});
hourInput.addEventListener("input", function () {
    hourInput.value = checkTime(hourInput.value);
});

start.addEventListener("click", function () {
    var hours = document.getElementById("hour").value;
    var minutes = document.getElementById("minute").value;
    var seconds = document.getElementById("second").value;
    keepGoing = true;
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

pause.addEventListener("click", function () {
    keepGoing = false;
});

stopClock.addEventListener("click", function () {
    console.log("stop");
});


function spawnNotification(corpo, icone, titulo) {
    var opcoes = {
        body: corpo,
        icon: icone
    }
    var n = new Notification(titulo, opcoes);
}

function getClock(hours, minutes, seconds) {

    var showHour = checkTime(hours);
    var showMin = checkTime(minutes);
    var showSec = checkTime(seconds);

    if( keepGoing == false ){
        clearTimeout();
        return;
    }

    secInput.value = showSec;
    minInput.value = showMin;
    hourInput.value = showHour;

    flag = false;

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
        new Notification("Relógio Finalizado!");
        return;
    }else {
        setTimeout(function () { getClock(hours, minutes, seconds); }, 1000);
    }
}

function checkTime(num) {
    var string = num + "";
    if (num < 10 && string.length < 2) {
        string = "0" + string;
    }
    return string;
}