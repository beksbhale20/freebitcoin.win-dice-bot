// ==UserScript==
// @name         FreeBitcoin.Win Martingale Script
// @namespace    autobet@martingale
// @version      1.0
// @description  This script is made for FreeBitcoin.Win users. This code is betting on dice games using martingale system.
// @author       MineSlash
// @match        https://freebitcoin.win/game/dice/*
// @grant        none
// ==/UserScript==


//----------------------------------------------------------------------//
//--------------------------EDIT THESE 3 LINES--------------------------//
//----------------------------------------------------------------------//
var basebet = 3;	//Base bet (in satoshi and minimum is 3)
var delay = '5';	//Delay between two rolls (in seconds)
var hiorlow = 'low';	//High or Low
//----------------------------------------------------------------------//
$( document ).ready(function() {
var multi = 2;		//OPTIONAL: Multiplier (this can be 2, 3, 5, 10, 15 or 50)
var url = window.location.href;
var parts = url.split('/');
var lastSegment = parts.pop() || parts.pop();
var game = parts[4];
if((lastSegment == 'bitcoin' || lastSegment == 'digibyte' || lastSegment == 'dogecoin' || lastSegment == 'ethereum-classic' || lastSegment == 'litecoin' || lastSegment == 'neo' || lastSegment == 'tron' || lastSegment == 'dash' || lastSegment == 'ethereum' || lastSegment == 'bytecoin' || lastSegment == 'potcoin') && game =='dice'){
var round = 0;
var wins = 0;
var loses = 0;
var gtoken = document.getElementById('gametoken').value;
var kod = csrf_token;
var bet = basebet;
var first_balance = parseInt($("#balance").text());
var bal = parseInt(first_balance);
var stop = 1;

$('.input-group').remove();
$('#high_low').remove();
for(a=0; a<=5; a++) $('#rollit').remove();
document.getElementById('betinfo').innerHTML = '<center>BOT Status: <span id="status" style="color: red;">Not running</span><br>Balance: <span id="new_bal"></span><br>Total wins: <span id="wins" style="color: green;">0</span><br>Total loses: <span id="loses" style="color: red;">0</span><br>Profit: <span id="profit">0</span><br><span class=""><button type="button" class="btn btn-success" id="auto-start">Start</button><button type="button" class="btn btn-danger" id="auto-stop">Stop</button></span></center>';
document.getElementById('new_bal').innerHTML = bal;
document.getElementById('auto-stop').onclick = function() {
        stop = 1;
		document.getElementById('status').innerHTML = 'Not running';
		document.getElementById('status').style.color = 'red';
};

document.getElementById('auto-start').onclick = function() {
		stop = 0;
		document.getElementById('status').innerHTML = 'Running';
		document.getElementById('status').style.color = 'green';
		play();
};

function play(){
if(stop == 0){
if(bal >= bet){
if(basebet >= 3){
if((multi == 2) || (multi == 3) || (multi == 5) || (multi == 10) || (multi == 15) || (multi == 50)){
$.post("https://freebitcoin.win//game/api/"+lastSegment,
  {
	gametoken: gtoken,
	amount: bet,
	payout: multi,
	hilow: hiorlow,
	game: 'dice',
	csrf_lbio: kod
  },
  function(data, status){
	round++;
    var obj = JSON.parse(data);
	if(obj.class == "win"){
		bet = basebet;
		wins++;
		setTimeout(play, delay*1000);
	} else {
		bet = bet*2;
		loses++;
		setTimeout(play, delay*1000);
	}
    console.log('------------------');
    console.log('------STATUS------');
    console.log('------------------');
    console.log("Round #"+round+": "+obj.class);
    console.log('------------------');
    console.log("Total wins: "+wins);
    console.log("Total loses: "+loses);
	bal = bal+obj.profit;
    console.log("New balance: "+bal);
    console.log("Profit: "+(bal-first_balance));
	console.log('------------------');
	$('#new_bal').text(bal);
	$('#wins').text(wins);
	$('#loses').text(loses);
	$('#profit').text(bal-first_balance);
  });
} else {
	alert("Multiplier can be 2, 3, 5, 10, 15, 50.");
}
} else {
	alert("Minimum bet amount: 3 satoshis");
}
} else {
	alert("Out of money :/");
}
}
}
play();
} else {
	console.log("You are not in the right site!");
}
});
