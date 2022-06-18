let rest = 300; let studyTime = 1500; let isRest = 0; let timerId; let time = studyTime;

function cambiaTimer(timeToStudy, pause){
    clearInterval(timerId); // stoppo il countDown
    document.getElementById('timer').innerHTML = timeToStudy;
    let minuteSecond = timeToStudy.split(':');
    studyTime = parseInt(minuteSecond[0]) * 60;
    minuteSecond = pause.split(':');
    rest = parseInt(minuteSecond[0]) * 60;
    time = studyTime;
    document.getElementById('body').style.backgroundColor = '#ffffff';
    document.getElementById('startButton').disabled = false;
}

function stopPomodoro(){
    clearInterval(timerId);
    document.getElementById('startButton').disabled = false;
    document.getElementById('body').style.backgroundColor = '#ff3355';
}

function approssimazione(tmp, minuteRemaining){
    let secondToDisplay = (tmp - minuteRemaining)*60;
    let parteIntera = parseInt(secondToDisplay);
    if((secondToDisplay - parteIntera) > 0.50){
        return Math.ceil(secondToDisplay);
    }else{
        return Math.floor(secondToDisplay);
    }
}

function startPomodoro(){
    document.getElementById('body').style.backgroundColor = 'lightgreen';
    document.getElementById('startButton').disabled = true;
    let tmp;
    timerId = setInterval(function(){
        time--;
        tmp = time/60;
        minuteRemaining = parseInt(tmp);
        secondToDisplay = approssimazione(tmp, minuteRemaining);
        if(secondToDisplay < 10){
            document.querySelector('#timer').textContent = minuteRemaining +':0'+ secondToDisplay;
        }else{
            document.querySelector('#timer').textContent = minuteRemaining +':'+ secondToDisplay;
        }
        if(time == 0){
            clearInterval(timerId);
            if(isRest == 0){
                time = rest;
                startPomodoro();
                isRest = 1;

            }else{
                time = studyTime;
                startPomodoro();
                isRest = 0;
            }
        }
    }, 1000);
}