//Prepare Players for fetching
var kris = {
	id: 1,
	name: "Kris",
	health: 12,
	atk: 6,
	def: 6,
	matk: 2,
	mdef: 6,
	acc: 4,
	evd: 2
};

//Default Values
var defaultequip = {
	health: [1, 1, 1, 1, 1],
	atk: [1, 1, 1, 1, 1],
	def: [1, 1, 1, 1, 1],
	matk: [1, 1, 1, 1, 1],
	mdef: [1, 1, 1, 1, 1],
	acc: [1, 1, 1, 1, 1],
	evd: [1, 1, 1, 1, 1],
	fireRes: [1, 1, 1, 1, 1],
	thunderRes: [1, 1, 1, 1, 1],
	iceRes: [1, 1, 1, 1, 1],
	earthRes: [1, 1, 1, 1, 1],
	bioRes: [1, 1, 1, 1, 1],
	bombRes: [1, 1, 1, 1, 1],
	waterRes: [1, 1, 1, 1, 1],
	windRes: [1, 1, 1, 1, 1],
	holyRes: [1, 1, 1, 1, 1],
	darkRes: [1, 1, 1, 1, 1]
}

//Equips
var woodBlade = {
	health: [1, 1, 1, 1, 1],
	atk: [1.1, 1.2, 1.2, 1.3, 1.4],
	def: [1, 1, 1.05, 1.05, 1.1],
	matk: [1, 1, 1, 1, 1],
	mdef: [1, 1, 1, 1, 1],
	acc: [1.05, 1.1, 1.15, 1.2, 1.25],
	evd: [1, 1, 1, 1, 1]
}

//Enemies
var none = {
	id: 0,
	name: "iolis",
	img: "<img src='https://vignette.wikia.nocookie.net/danball/images/5/5d/Nope.png/revision/latest?cb=20111126172440'>",
	health: 0,
	atk: 0,
	def: 0,
	matk: 0,
	mdef: 0,
	acc: 0,
	evd: 1
};

var rabbick = {
	id: 1,
	name: "Rabbick",
	img: "<img src='https://vignette.wikia.nocookie.net/deltarune/images/7/7c/Rabbick_battle.png/revision/latest?cb=20181102085001' alt='rabbick'>",
	health: 20,
	atk: 3,
	def: 3,
	matk: 3,
	mdef: 3,
	acc: 3,
	evd: 3,
	
	fire: 1.8,
	thunder: 0.5,
	ice: 0.5,
	earth: 0.5,
	bio: 1,
	bomb: 1.5,
	water: 1.5,
	wind: 1.8,
	holy: 1,
	dark: 0.5,
	none: 1
};

//Start Variables
//used to determine button layout
var navigation = "all";
//to be depreciated
var turn = 0;
//used to prepare selection
var select = 0;
//used to determine attack
var prereq = "";
//should really be depreciated and merged with wave data
var levelHostile = [3, 3, 0, 3, 0];
//for ally levels
var levelPassive = [3, 3, 3];
//frembly level scaling
var scalemult = 1.6;
//unfemby level scaling
var foescalemult = 1.8;
//players, should be changed to accomodate new system
var players = ["kris"];
//used to determine attacker, should be depreciated
var activePlayer = 0;
//used to determine what wave it is
var wavecounter = 0;
//used to determine total waves
var wavecount = 1;
//used to store data for waves
var wave1 = [rabbick, rabbick, none, rabbick, none];
var wave2 = [];
var wave3 = [];
//you go figure this out
var iolis;
//stores current hp values of enemies
var activeDataHP = [];
//stores status conditions of enemies
var foeStatus = [];
//stores buffs of enemies
var foeBuffs = [];
//depreciated
var activeAllyID = [];
//stores player hp
var activeAllyHP = [];
//stores player status
var ally1Status = [];
//stores ally buffs: atk, def, matk, mdef, acc, evd
var allyBuffs = [[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]];

/*var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var imgKrisIdle = new Image();   // Create new img element
imgKrisIdle.src = "https://vignette.wikia.nocookie.net/deltarune/images/0/04/Kris_battle_fight.gif/revision/latest?cb=20181102012100"; */

//for determining levelscaled stats
function levelscalefoe(hp, level) {
	return Math.ceil(Math.pow(foescalemult, level) * hp);
}
//initialization function
function begin() {
	activePlayer = 1;
	//this checks each slot in wave 1, fetching the enemy data
	//this is the "fetcher"
	for(i = 0; i < wave1.length; i++) {
		switch(i) {
				//determines appropriate place to draw enemies, and fetched the enemy's picture
				case 0: document.getElementById("enemy1").innerHTML = wave1[i].img;
				break;
				case 1: document.getElementById("enemy2").innerHTML = wave1[i].img;
				break;
				case 2: document.getElementById("enemy3").innerHTML = wave1[i].img;
				break;
				case 3: document.getElementById("enemy4").innerHTML = wave1[i].img;
				break;
				case 4: document.getElementById("enemy5").innerHTML = wave1[i].img;
				break;
				}
		//adds enemy hp to array
		activeDataHP.push(levelscalefoe(wave1[i].health, levelHostile[i]));
	}
	//end enemy fetcher
	
	//player fetcher, less useful
	for(i = 0; i < players.length; i++) {
	switch(players[i]) {
		case "kris":
			activeAllyID.push(1);
			activeAllyHP.push(Math.ceil(Math.pow(scalemult, levelPassive[i]) * kris.health));
			/*switch(i) {
				case 0: ctx.drawImage(imgKrisIdle, 10, 10);
			}*/
			//fuck canvases
	}
	}
}

//honestly all these buttons should be rewritten i'll do that soonish
function buttonAttack() {
	if(navigation == "all") {
		navigation = "cancel";
		select = 1;
	prereq = "attack";
		navUpdate();
	}
	if(navigation == "tactics") {
	if(activePlayer == 1) {
		statusSelf(ally1Status, "defend", 1, "yote");
		navUpdate();
	}
	}
}
function buttonTactics() {
	if(navigation == "all") {
		navigation = "tactics";
		navUpdate();
	}
}
function buttonCancel() {
	if(navigation == "cancel") {
		navigation = "all";
		select = 0;
		navUpdate();
	}
}
//selection code for attacks and stuff, i should change it
function selecc(target) {
	if(select == 1) {
		if(activePlayer == 1) {
			if(prereq == "attack") {
				slash(kris.atk, kris.acc, 0, target, 40);
				select = 0;
				navigation = "all";
				navUpdate();
			}
		}
	}
}

//updates all the buttons
function navUpdate() {
	if(navigation == "cancel") {
		document.getElementById("attack").innerHTML = "-";
		document.getElementById("tactics").innerHTML = "-";
		document.getElementById("magic").innerHTML = "-";
		document.getElementById("cancel").innerHTML = "Cancel";
	}
	if(navigation == "all") {
		document.getElementById("attack").innerHTML = "Attack";
		document.getElementById("tactics").innerHTML = "Tactics";
		document.getElementById("magic").innerHTML = "Magic";
		document.getElementById("cancel").innerHTML = "-";
	}
	document.getElementById("target1").innerHTML = activeDataHP[0];
	document.getElementById("target2").innerHTML = activeDataHP[1];
	document.getElementById("target3").innerHTML = activeDataHP[2];
	document.getElementById("target4").innerHTML = activeDataHP[3];
	document.getElementById("target5").innerHTML = activeDataHP[4];
}

//attacks
function slash(attack, accuracy, user, target, basepower) {
	activeDataHP[target] -= damagefremb(attack, accuracy, user, target, basepower, "none", 0, "none", 0, "none", 0, 0, "physical", 1);
}
function statusSelf(player, status, length, animation) {
	for(i = 0; i < length; i++) {
	player.push(status);
	}
}

//hurty hurt calculator
function damagefremb(attack, accuracy, user, target, basepower, element, percent, status, chance, count, debuff, amp, type, acc) {
	//Order of operations: find base damage, calculate elemental interaction and stab damage, apply buffs/status for attack, calculate defence, apply buffs/status for defence, reduce damage, calculate evade, apply evade/accuracy buffs, calculate to hit, inflict debuffs, inflict damage
	//generates initial damage value
	var hurt = Math.ceil(attack * Math.pow(scalemult, levelPassive[user]) * basepower);
	//determines target, used for checking numerical stats by converting the numerical position of the enemy in the wave into the name of the target
	var tgt = wave1[target];
	//determining evade
	var evade = levelscalefoe(tgt.evd, levelHostile[target]);
	//checking for dodge
	var dodge = (accuracy * acc * (1 + allyBuffs[user][4])) / (evade * (1 + foeBuffs[tgt][5]));
	var dodgecheck = Math.random();
	if(dodgecheck > dodge) {
		return 0;
	}
	//determines elemental resistances
	//hurt * tgt.
	
	//determining physical or magical, and true defensive value
	if(type == "physical") {
		//determine attack buff and applies it
		hurt = hurt * (1 + allyBuffs[user][0]);
		//makes defensive value defence
		var def = tgt.def;
		//determine defence buff and applies it
		def = def * (1 + foeBuffs[tgt][1]);
		}
	if(type == "magical") {
		//determine magic attack buff and applies it
		hurt = hurt * (1 + allyBuffs[user][2]);
		//makes defensive value defence
		var def = tgt.mdef;
		//determine defence buff and applies it
		def = def * (1 + foeBuffs[tgt][3]);
	}
	//this stays until everything is said and done and i actually finish the damage system
	return 4;
}
