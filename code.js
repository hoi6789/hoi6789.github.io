var navigation = "all";
var turn = 0;
var select = 0;
var prereq = "";
var levelHostile = [0, 3, 0, 3, 0];
var levelPassive = [3, 3, 3];
var scalemult = 1.6;
var players = ["kris"];
var activePlayer = 0;
var wavecounter = 0;
var wavecount = 1;
var wave1 = ["null", "rabbick", "null", "rabbick", "null"];
var wave2 = [];
var wave3 = [];

var iolis = 0;

var activeDataID = [];
var activeDataHP = [];
var foe1Status = [];
var foe2Status = [];
var foe3Status = [];
var foe4Status = [];
var foe5Status = [];
var activeAllyID = [];
var activeAllyHP = [];
var ally1Status = [];

/*var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var imgKrisIdle = new Image();   // Create new img element
imgKrisIdle.src = "https://vignette.wikia.nocookie.net/deltarune/images/0/04/Kris_battle_fight.gif/revision/latest?cb=20181102012100"; */

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

var rabbick = {
	id: 1,
	name: "Rabbick",
	health: 8,
	atk: 3,
	def: 3,
	matk: 3,
	mdef: 3,
	acc: 3,
	evd: 3
};
function begin() {
	activePlayer = 1;
	for(i = 0; i < wave1.length; i++) {
		switch(wave1[i]) {
			case "null":
				activeDataID.push(0);
				activeDataHP.push(0);
				break;
			case "rabbick":
				activeDataID.push(1);
				activeDataHP.push(Math.ceil(Math.pow(scalemult, levelHostile[i]) * rabbick.health));
				switch(i) {
				case 0: document.getElementById("enemy1").innerHTML = "<img src='https://vignette.wikia.nocookie.net/deltarune/images/7/7c/Rabbick_battle.png/revision/latest?cb=20181102085001' alt='rabbick'>";
				break;
				case 1: document.getElementById("enemy2").innerHTML = "<img src='https://vignette.wikia.nocookie.net/deltarune/images/7/7c/Rabbick_battle.png/revision/latest?cb=20181102085001' alt='rabbick'>";
				break;
				case 2: document.getElementById("enemy3").innerHTML = "<img src='https://vignette.wikia.nocookie.net/deltarune/images/7/7c/Rabbick_battle.png/revision/latest?cb=20181102085001' alt='rabbick'>";
				break;
				case 3: document.getElementById("enemy4").innerHTML = "<img src='https://vignette.wikia.nocookie.net/deltarune/images/7/7c/Rabbick_battle.png/revision/latest?cb=20181102085001' alt='rabbick'>";
				break;
				case 4: document.getElementById("enemy5").innerHTML = "<img src='https://vignette.wikia.nocookie.net/deltarune/images/7/7c/Rabbick_battle.png/revision/latest?cb=20181102085001' alt='rabbick'>";
				break;
				}
		}
	}
	for(i = 0; i < players.length; i++) {
	switch(players[i]) {
		case "kris":
			activeAllyID.push(1);
			activeAllyHP.push(Math.ceil(Math.pow(scalemult, levelPassive[i]) * kris.health));
			switch(i) {
				case 0: ctx.drawImage(imgKrisIdle, 10, 10);
			}
	}
	}
}
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

function select1() {
	if(select == 1) {
		if(activePlayer == 1) {
			if(prereq == "attack") {
				slash(kris.atk, kris.acc, 0, 0, 0.4);
				select = 0;
				navigation = "all";
				navUpdate();
			}
		}
	}
}
function select2() {
	if(select == 1) {
		if(turn == 1) {
			if(prereq == "attack") {
				slash(kris.atk, kris.acc, 0, 1, 0.4);
				select = 0;
				navigation = "all";
				navUpdate();
			}
		}
	}
}
function select3() {
	if(select == 1) {
		if(turn == 1) {
			if(prereq == "attack") {
				slash(kris.atk, kris.acc, 0, 2, 0.4);
				select = 0;
				navigation = "all";
				navUpdate();
			}
		}
	}
}
function select4() {
	if(select == 1) {
		if(turn == 1) {
			if(prereq == "attack") {
				slash(kris.atk, kris.acc, 0, 3, 0.4);
				select = 0;
				navigation = "all";
				navUpdate();
			}
		}
	}
}
function select5() {
	if(select == 1) {
		if(turn == 1) {
			if(prereq == "attack") {
				slash(0, kris.atk, kris.acc, 0, 4, 0.4);
				select = 0;
				navigation = "all";
				navUpdate();
			}
		}
	}
}

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

function slash(id, attack, accuracy, level, target, basepower) {
	activeDataHP[target] -= function damage(id, attack, accuracy, level, target, basepower, "none", "none", 0, "none", 0, 0, "physical", 1)
}
function statusSelf(player, status, length, animation) {
	for(i = 0; i < length; i++) {
	player.push(status);
	}
}
function damage(id, attack, accuracy, level, target, basepower, element, status, chance, count, debuff, amp, type, acc) {
	var hurt = Math.ceil(attack * Math.pow(scalemult, levelPassive[level]) * basepower * 2.5) 
	switch(activeDataID[target]) {
		case 0: def = 0;
		break;
		case 1: if(type == "physical") {
			var def = rabbick.def * Math.pow(scalemult, levelHostile[target]);
		}
		if(type == "magical") {
			var def = rabbick.mdef * Math.pow(scalemult, levelHostile[target]);
		}
		var evade = rabbick.evade;
		break;
	}
	var dodge = (accuracy * acc) / evade;
	var dodgecheck = Math.random();
	if(dodgecheck > dodge) {
		hurt = 0;
	}
}
