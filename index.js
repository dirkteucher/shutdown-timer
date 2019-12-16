// The interface code is extended from https://codepen.io/EleftheriaBatsou/pen/ygvvwW/
// Thanks Eleftheria Batsou 

// This is what is used to run commands like shutdown
const exec = require('child_process').exec;

function execute(command, callback) {
    exec(command, (error, stdout, stderr) => { 
        callback(stdout); 
    });
};


window.onload = function(){
    let countdown;
    const timerDisplay = document.querySelector('.display__time-left');
    const endTime = document.querySelector('.display__end-time');
    const buttons = document.querySelectorAll('[data-time]');

    function timer(seconds) {
    // clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop it!
        if(secondsLeft < 0) {
        clearInterval(countdown);
        console.log("Time to shutdown computer");
        execute('shutdown "/p"', function(output){
            console.log("Shutting down")
        });
        return;
        }
        // display it
        displayTimeLeft(secondsLeft);
    }, 1000);
    }

    function displayTimeLeft(seconds){
        const minutes = Math.floor(seconds/60);
        const remainderSeconds = seconds % 60; 
        const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;``
        document.title = display;
        timerDisplay.textContent = display;
        // Show the cancel button
        document.getElementById("cancel").style.display ="block"
    }

    function displayEndTime(timestamp){
        const end = new Date(timestamp);
        const hour = end.getHours();
        const minutes = end.getMinutes();
        endTime.textContent = `Shutting down at ${hour}:${minutes}`;
    }

    function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
    }

    buttons.forEach(button => button.addEventListener('click', startTimer));
    document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
    });


    // cancel shutdown
    let cancel = document.getElementById("cancel");
    cancel.addEventListener("click", function(){
        clearInterval(countdown);
        execute('shutdown "/a"', function(output){
            console.log("Cancelling shutdown")
        });
    })

}