//Prepare Spells for fetching
	var basicSlash = {
		stat: "atk",
		basepower: 30,
		element: "weapon",
		percent: 1,
		status: "none",
		chance: 0,
		count: 0,
		debuff: 0,
		amp: 0,
		type: "physical",
		acc: 1,
		
		execute: function(user, target, origin) {
			if(origin == "ally") {
				var username = players[user];
				activeDataHP[target] -= damagefremb(username[this.stat], username.acc, user, target, this.basepower, [this.element], [this.percent], [this.status], [this.chance], [this.count], [this.debuff], [this.amp], [this.type], [this.acc]);
			}
			else {
				var username = wave1[user];
				activeAllyHP[target] -= damagefoe(username[this.stat], username.acc, user, target, this.basepower, [this.element], [this.percent], [this.status], [this.chance], [this.count], [this.debuff], [this.amp], [this.type], [this.acc]);
				console.log(activeAllyHP);
			}
			
		}
	}
//Create spellbooks for each player
	var spellbook = [[basicSlash], [], []];
//Prepare Players for fetching
var kris = {
	id: 1,
	name: "Kris",
	health: 15,
	atk: 6,
	def: 6,
	matk: 4,
	mdef: 6,
	acc: 4,
	evd: 4,
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
	element: "none",
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
	img: "<p>yo</p>",
	health: 0,
	atk: 0,
	def: 0,
	matk: 0,
	mdef: 0,
	acc: 0,
	evd: 1,
	
	ai: function() {
		console.log("internal");
	}
};

var rabbick = {
	id: 1,
	name: "Rabbick",
	img: "<img src='https://vignette.wikia.nocookie.net/deltarune/images/7/7c/Rabbick_battle.png/revision/latest?cb=20181102085001' alt='rabbick'>",
	health: 54,
	atk: 4,
	def: 3.8,
	matk: 4,
	mdef: 4.2,
	acc: 4,
	evd: 4,
	
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
	none: 1,
	
	ai: function() {
		var target = Math.floor(Math.random() * players.length);
		basicSlash.execute(i, target, "foe");
	}
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
var players = [kris];
//player equips
var equips = [[woodBlade], [], []];
//used to determine what wave it is
var wavecounter = 0;
//used to determine total waves
var wavecount = 1;
//used to store data for waves
var wave1 = [rabbick, rabbick, none, rabbick, none];
var wave2 = [];
var wave3 = [];
//stores current hp values of enemies
var activeDataHP = [];
//stores status conditions of enemies
var foeStatus = [];
//stores buffs of enemies
var foeBuffs = [[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]];
//keeps track of current active player
var turn = 0;
//tracks whether a turn has been taken
var turntaken = [0, 0, 0];
//stores player hp
var activeAllyHP = [1000];
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

function levelscaleally(hp, level) {
	return Math.ceil(Math.pow(scalemult, level) * hp);
}
//initialization function
function begin() {
	//this checks each slot in wave 1, fetching the enemy data
	//this is the "fetcher"
	for(i = 0; i < wave1.length; i++) {
		switch(i) {
				//determines appropriate place to draw enemies, and fetches the enemy's picture
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
			//canvases suck
	}
	}
}

//honestly all these buttons should be rewritten i'll do that soonish
function button1() {
	switch(navigation) {
		case "all":
		navigation = "cancel";
		select = 1;
		prereq = "attack";
		navUpdate();
		break;
		case "tactics":
		statusSelf(ally1Status[turn], "defend", 1, "yote");
		navUpdate();
		break;
	}
}
function button2() {
	if(navigation == "all") {
		navigation = "tactics";
		navUpdate();
	}
}
function button4() {
	if(navigation == "cancel") {
		navigation = "all";
		select = 0;
		navUpdate();
	}
}
//selection code for attacks and stuff, i should change it
function selecc(target) {
	if(select == 1) {
		if(prereq == "attack") {
			spellbook[turn][0].execute(turn, target, "ally");
			select = 0;
			navigation = "all";
			navUpdate();
			turntaken[turn] = 1;
			turnCheck();
		}
	}
}

function turnCheck() {
	var temp = 0;
	for(i = 0; i < turntaken.length; i++) {
		if(turntaken[i] == 1) {
			temp++;
		}
	}
	if(temp >= players.length) {
		enemyTurn();
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

//attacks, changed to different system
function statusSelf(player, status, length, animation) {
	for(i = 0; i < length; i++) {
	player.push(status);
	}
}

function enemyTurn() {
	for(i = 0; i < wave1.length; i++) {
		wave1[i].ai();
		console.log(i);
		//break;
	}
	turntaken = [0, 0, 0];
}
//damage calculation for allies
function damagefremb(attack, accuracy, user, target, basepower, element, percent, status, chance, count, debuff, amp, type, acc) {
	//Order of operations: find base damage, calculate elemental interaction and stab damage, apply buffs/status for attack, calculate defence, apply buffs/status for defence, reduce damage, calculate evade, apply evade/accuracy buffs, calculate to hit, inflict debuffs, inflict damage
	//generates initial damage value
	var hurt = Math.ceil(attack * Math.pow(scalemult, levelPassive[user]) * basepower);
	//determines target, used for checking numerical stats by converting the numerical position of the enemy in the wave into the name of the target
	var tgt = wave1[target];
	//determining evade and accuracy
	var accur = levelscaleally(accuracy, levelPassive[user]);
	var evade = levelscalefoe(tgt.evd, levelHostile[target]);
	//checking for dodge
	var dodge = (accur * acc * (allyBuffs[user][4])) / (evade * (foeBuffs[target][5]));
	var dodgecheck = Math.random();
	if(dodgecheck > dodge) {
		return 0;
	}
	//determines elemental resistances
	for(i = 0; i < element.length; i++) {
	if(element[i] = "weapon") {
		element[i] = equips[user][0]["element"];
	}
	hurt = hurt * (tgt[element[i]] * percent[i]);
	}
	//determining physical or magical, and true defensive value
	if(type == "physical") {
		//determine attack buff and applies it
		hurt = hurt * (allyBuffs[user][0]);
		//makes defensive value defence
		var def = tgt.def;
		//determine defence buff and applies it
		def = def * (foeBuffs[target][1]);
		}
	if(type == "magical") {
		//determine magic attack buff and applies it
		hurt = hurt * (allyBuffs[user][2]);
		//makes defensive value defence
		var def = tgt.mdef;
		//determine defence buff and applies it
		def = def * (foeBuffs[target][3]);
	}
	hurt = hurt / def;
	return Math.floor(hurt);
}

//damage calculation for enemies
function damagefoe(attack, accuracy, user, target, basepower, element, percent, status, chance, count, debuff, amp, type, acc) {
	//Order of operations: find base damage, calculate elemental interaction and stab damage, apply buffs/status for attack, calculate defence, apply buffs/status for defence, reduce damage, calculate evade, apply evade/accuracy buffs, calculate to hit, inflict debuffs, inflict damage
	//generates initial damage value
	var hurt = Math.ceil(attack * Math.pow(scalemult, levelHostile[user]) * basepower);
	console.log(hurt);
	//determines target, used for checking numerical stats by converting the numerical position of the enemy in the wave into the name of the target
	var tgt = wave1[target];
	//determining evade and accuracy
	var accur = levelscalefoe(accuracy, levelHostile[user]);
	var evade = levelscaleally(tgt.evd, levelPassive[target]);
	//checking for dodge
	var dodge = (accur * acc * (foeBuffs[user][4])) / (evade * (allyBuffs[target][5]));
	var dodgecheck = Math.random();
	if(dodgecheck > dodge) {
		return 0;
	}
	//determines elemental resistances
	//for(i = 0; i < element.length; i++) {
	//hurt = hurt * (tgt[element[i]] * percent[i]);
	//}
	//determining physical or magical, and true defensive value
	if(type == "physical") {
		//determine attack buff and applies it
		hurt = hurt * (foeBuffs[user][0]);
		//makes defensive value defence
		var def = levelscaleally(tgt.def, levelPassive[target]);
		//determine defence buff and applies it
		def = def * (allyBuffs[target][1]);
		}
	if(type == "magical") {
		//determine magic attack buff and applies it
		hurt = hurt * (foeBuffs[user][2]);
		//makes defensive value defence
		var def = levelscaleally(tgt.mdef, levelPassive[target]);
		//determine defence buff and applies it
		def = def * (allyBuffs[target][3]);
	}
	hurt = hurt / def;
	return Math.floor(hurt);
}
