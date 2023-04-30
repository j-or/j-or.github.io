var currentPic = -1;
var specialPics = [];
var numOfPics = 17;
var changeTime = 1000;
var changeTime2 = 500;
var changeTime3 = 300;
var totalTimeStart = 100; 
var totalTime = totalTimeStart;
var tickTime = 75;

var picTimer;
var allTimer;

var stopped = false;
var tickStopped = false;

var currentDiff = 1;

var allGamePics = [];

$(document).ready(function() {
    setAllPics();
    preload(allGamePics);
    setTimers();
    setKeys();
    setSpecialPics();
    //preloadPics();
    //startRoulette();
    //testy();
});

function testy(){
    alert("js is working!");
}

function setAllPics(){
    for(var i = 1; i < numOfPics; i++){
	allGamePics[i] = "images/game/" + i + ".jpg";
    }
}

function setKeys(){
    $(document).keydown(function() {
	if(!stopped && !tickStopped){
	    window.clearInterval(allTimer);
	    window.clearInterval(picTimer);
	    stopped = true;
	    checkForSpecial(currentPic);
	}
	else if(stopped){
	    allTimer = window.setInterval(tick, tickTime);
	    totalTime = totalTimeStart;
	    if(currentDiff == 1) picTimer = window.setInterval(changePic, changeTime);
	    else if(currentDiff == 2) picTimer = window.setInterval(changePic, changeTime2);
	    else if(currentDiff == 3) picTimer = window.setInterval(changePic, changeTime3);
	    stopped = false;
	    changePic();
	    $("#msgContainer").css("background", "url(images/bar.jpg) left no-repeat");
	}
    });
    
    $(".main").click(function() {
	if(!stopped && !tickStopped){
	    window.clearInterval(allTimer);
	    window.clearInterval(picTimer);
	    stopped = true;
	    checkForSpecial(currentPic);
	}
	else if(stopped){
	    allTimer = window.setInterval(tick, tickTime);
	    totalTime = totalTimeStart; 
	    if(currentDiff == 1) picTimer = window.setInterval(changePic, changeTime);
	    else if(currentDiff == 2) picTimer = window.setInterval(changePic, changeTime2);
	    else if(currentDiff == 3) picTimer = window.setInterval(changePic, changeTime3);
	    stopped = false;
	    changePic();
	    $("#msgContainer").css("background", "url(images/bar.jpg) left no-repeat");
	}
    });
    
    //difficulty
    $("#s2").css("opacity", "0.3");
    $("#s3").css("opacity", "0.3");
    
    $("#s1").click(function(){
	if(currentDiff == 2){
	    currentDiff = 1;
	    $("#s2").css("opacity", "0.3"); 	    
	}
	else if(currentDiff == 3){
	    currentDiff = 1;
	    $("#s2").css("opacity", "0.3");
	    $("#s3").css("opacity", "0.3");
	}
    });
    
    $("#s2").click(function(){
	if(currentDiff == 1){
	    currentDiff = 2;
	    $("#s2").css("opacity", "1.0"); 	    
	}
	else if(currentDiff == 3){
	    currentDiff = 2;
	    $("#s3").css("opacity", "0.3"); 	    
	}
    });
    
     $("#s3").click(function(){
	if(currentDiff == 1){
	    currentDiff = 3;
	    $("#s2").css("opacity", "1.0");
	    $("#s3").css("opacity", "1.0");	    
	}
	else if(currentDiff == 2){
	    currentDiff = 3;
	    $("#s3").css("opacity", "1.0");	    
	}
    });
}

function setTimers(){
    picTimer = window.setInterval(changePic, changeTime);
    allTimer = window.setInterval(tick, tickTime);
}

function tick(){
    totalTime--;
    if(totalTime == 20) $("#msgContainer").css("background", "url(images/bar_red.jpg) left no-repeat");
    $("#msgContainer").css("background-size", totalTime + "%" + " 100%");
    showMessage("TIME LEFT: " + totalTime);
    tickStopped = false;
    if(totalTime == 0){
	tickStopped = true;
	window.clearInterval(allTimer);
	window.clearInterval(picTimer);
	showMessage("TIME IS UP! DRINK!");
	stopped = true;
    }
}

function setSpecialPics(){
    specialPics = [
	            '1', // woman vodka - everyone drinks
	            '6', // beaver - choose two to drink
		    '14'  // camel - choose one to drink
	            ];
}

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
    $('<img/>')[0].src = "images/bar.jpg";
    $('<img/>')[0].src = "images/bar_red.jpg";
}

function changePic(){
    var ran = Math.ceil(Math.random() * numOfPics);
    //showMessage(ran);
    showPic(ran);
}

function showPic(num){
    $("#pic").attr("src", "images/game/" + num + ".jpg");
    currentPic = num;
}

function checkForSpecial(cPic){
    var msgString = "YOU LOSE! DRINK!";
    if(cPic == specialPics[2]){
      msgString = "CHOOSE SOMEONE TO DRINK!";
    } else if(cPic == specialPics[0]){
        msgString = "EVERYBODY DRINKS!";
    } else if(cPic == specialPics[1]){
        msgString = "CHOOSE TWO PEOPLE TO DRINK!";
    }
    showMessage(msgString);
}

function showMessage(msg){
    $("#msgContainer").html(msg);
}