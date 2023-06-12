function showErrorModal(message) {
    let errorModalBody = document.getElementById("errorModalBody");
    errorModalBody.innerHTML = message;
    let errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
    errorModal.show();
}

let countdownInterval;

function startCountdown() {
    let eventName = document.getElementById("event-name").value;
    let targetYear = parseInt(document.getElementById("target-year").value);
    let targetMonth = parseInt(document.getElementById("target-month").value) - 1; // Month is zero-based
    let targetDay = parseInt(document.getElementById("target-day").value);
    let targetHour = parseInt(document.getElementById("target-hour").value);
    let targetMinute = parseInt(document.getElementById("target-minute").value);
    let targetSecond = parseInt(document.getElementById("target-second").value);

    // Validate input
    if (!eventName) {
        showErrorModal("Please enter the event name.");
        return;
    }

    let targetDate;
    if (!isNaN(targetYear) && !isNaN(targetMonth) && !isNaN(targetDay) && !isNaN(targetHour) && !isNaN(targetMinute) && !isNaN(targetSecond)) {
        targetDate = new Date(targetYear, targetMonth, targetDay, targetHour, targetMinute, targetSecond);
    } else {
        showErrorModal("Please enter a valid target year, date, and time.");
        return;
    }

    let countdownElement = document.getElementById("countdown");

    // Update the countdown every 1 second
    countdownInterval = setInterval(function () {
        let now = new Date();
        let distance = targetDate - now;

        // Calculating years, months, days, hours, minutes, and seconds
        let years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));
        let months = Math.floor((distance % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        let days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the countdown   
        document.getElementById("jumbo-timer").style.display = "block";
        document.getElementById("form-container").style.display = "none";

        countdownElement.innerHTML = eventName + " starts in: " + "<br>" +
            years + "y " +
            months + "mo " +
            days + "d " +
            hours + "h " +
            minutes + "m " +
            seconds + "s ";

        // If the countdown is finished, clear the interval
        if (distance <= 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = eventName + " has started!";
        }
    }, 1000);
}

function stopCountdown() {
    clearInterval(countdownInterval);
    document.getElementById("jumbo-timer").style.display = "none";
    document.getElementById("form-container").style.display = "block";
    document.getElementById("countdown").innerHTML = "";

    let inputList = document.querySelectorAll("input");
    for (let i = 0; i < inputList.length; i++) {
        inputList[i].value = "";
    }


    document.querySelectorAll("input").value = "";
}

let init = function () {
    document.getElementById("startCountdown").addEventListener("click", function () {
        startCountdown();
    });

    document.getElementById("stopCountdown").addEventListener("click", function () {
        stopCountdown();
    });
}

window.onload = init();