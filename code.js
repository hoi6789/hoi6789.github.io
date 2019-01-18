var navigation = "all";
var turn = 0;
var select = 0;
var prereq = "";
var levelHostile = [0, 3, 0, 3, 0];
var levelPassive = [3, 3, 3];
var scalemult = 1.6;
var wavecounter = 0;
var wavecount = 1;
var wave1 = ["null", "rabbick", "null", "rabbick", "null"];
var wave2 = [];
var wave3 = [];

var activeDataID = [];
var activeDataHP = [];

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
	turn = 1;
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
}
function buttonAttack() {
	if(navigation == "all") {
		navigation = "cancel";
		select = 1;
	prereq = "attack";
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
		if(turn == 1) {
			if(prereq == "attack") {
				slash(kris.atk, 0, 0, 0.4);
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
				slash(kris.atk, 0, 1, 0.4);
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
				slash(kris.atk, 0, 2, 0.4);
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
				slash(kris.atk, 0, 3, 0.4);
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
				slash(kris.atk, 0, 4, 0.4);
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

function slash(attack, level, target, basepower) {
	activeDataHP[target] -= Math.ceil(attack * Math.pow(scalemult, levelPassive[level]) * basepower);
}
