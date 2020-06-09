var secInput = document.getElementById("second");
var minInput = document.getElementById("minute");
var hourInput = document.getElementById("hour");
var start = document.getElementById("start");
var pause = document.getElementById("pause");
var reset = document.getElementById("reset");
var initial = [];


var startingFlag = true;
var endClock = false;
var keepGoing = true;
var pomodoroCheck = false;

//Notification.requestPermission();


// ====================== EVENT LISTENERS
secInput.addEventListener("input", function () {
    pauseClock();
    secInput.value = getSeconds(secInput.value);
    startingFlag = true;
});
minInput.addEventListener("input", function () {
    pauseClock();
    minInput.value = getMinutes(minInput.value);
    startingFlag = true;
});
hourInput.addEventListener("input", function () {
    pauseClock();
    hourInput.value = getHours(hourInput.value);
    startingFlag = true;
});

start.addEventListener("click", function () {
    var hours = hourInput.value;
    var minutes = minInput.value;
    var seconds = secInput.value;

    resumeClock();

    if (!hours) {
        hours = 0;
    }
    if (!minutes) {
        minutes = 0;
    }
    if (!seconds) {
        seconds = 0;
    }

    firstValue(hours, minutes, seconds);
    getClock(hours, minutes, seconds);
});

pause.addEventListener("click", pauseClock);

reset.addEventListener("click", function () {
    hourInput.value = initial[0];
    minInput.value = initial[1];
    secInputvalue = initial[2];

    pauseClock();

    startingFlag = true;
});
// ===================================


// Não utilizada/finalizada
function spawnNotification() {
    if(!("Notification" in window)) {
        alert ("This browser does not support system notification");
    } else if (Notification.permission === "granted") {
        notificar();
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            if (permission === 'granted') {
                notificar();
            }
        });
    }

    function notificar() {
        var notification = new Notification('Titulo', {
            icon: "../img/noTime.gif",
            body: "Tempo acabou!",
        });

        notification.onclick = function () {
            window.open("http://www.google.com");
        };

        setTimeout(notification.close.bind(notification), 5000);
    }

}

function getClock(hours, minutes, seconds) {

    var showHour = checkTime(hours);
    var showMin = checkTime(minutes);
    var showSec = checkTime(seconds);

    if (keepGoing == false) {
        clearTimeout();
        return;
    }

    secInput.value = showSec;
    minInput.value = showMin;
    hourInput.value = showHour;

    if (endClock == true) {
        spawnNotification();
        pomodoro();
    } else {
        endClock = false;
        if(seconds == 0 ) {
            if(minutes == 0 ) {
                if(hours == 0 ) {
                    hours = getHours(0);
                    minutes = getMinutes(0);
                    seconds = getSeconds(0);
                    endClock = true;
                }else{ 
                    hours = getHours(hours - 1);
                    minutes = getMinutes(59);
                    seconds = getSeconds(59);
                }
            }else {
                minutes = getMinutes(minutes - 1);
                seconds = getSeconds(59);
            }
        }else {
            seconds = getSeconds(seconds -1);
        }
        setTimeout(function () { getClock(hours, minutes, seconds); }, 1000);
    }
}

function getSeconds(sec) {
    if (sec < 0) {
        sec = 59;
    }else if (sec > 59) {
        sec = 0;
    }
    sec = checkTime(sec);
    return sec;
}

function getMinutes(min) {
    if (min < 0) {
        min = 59;
    }else if (min > 59) {
        min = 0;
    }
    min = checkTime(min);
    return min;
}

function getHours(hour) {
    if (hour < 0) {
        hour = 23;
    }else if (hour > 23) {
        hour = 0;
    }
    hour = checkTime(hour);
    return hour;
}

function checkTime(num) {
    var string = num + "";
    if (num < 10 && string.length < 2) {
        string = "0" + string;
    }
    return string;
}

function pauseClock() {
    keepGoing = false;
}

function resumeClock() {
    keepGoing = true;
}

function firstValue(hour, min, sec) {
    if (startingFlag == true) {
        initial = [hour, min, sec];
        startingFlag = false;
    }
}

function pomodoro () {
    if ( pomodoroCheck == false) {
        secInput.value = checkTime(5);
        minInput.value = checkTime(0);
        hourInput.value = checkTime(0);
        pomodoroCheck = true;
        endClock = false;
    } else {
        secInput.value = checkTime(initial[2]);
        minInput.value = checkTime(initial[1]);
        hourInput.value = checkTime(initial[0]);
        pomodoroCheck = false;
        endClock = false;
    }
    getClock(hourInput.value, minInput.value, secInput.value);
    return;
}