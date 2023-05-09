var basebet = 10;	//Base bet (in satoshi and minimum is 3)
var delay = '5';	//Delay between two rolls (in seconds)

var kod = csrf_token;
var round = 0;
var wins = 0;
var loses = 0;
var bet = basebet;
var first_balance = parseInt($("#g_balance_game").text());
var bal = parseInt(first_balance);
function play(){
$.post("https://freebitcoin.win//dice/play",
  {
	amount: basebet,
	play_tokens: 'tokens',
	payout: 2,
	hilo: 'lo',
	jackpot: 0,
	csrf_fgscom: kod
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
  });
}
play();
