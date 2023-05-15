energy = 0;
document.getElementById("energydisplay").innerHTML = "Energy: " + energy;
function updateEnergy(gainedEnergy) {
	gainedEnergy += Math.floor(Math.random() * 5) - 2;
	energy += gainedEnergy;
	document.getElementById("energydisplay").innerHTML = "Energy: " + energy;
}
class Abnormality {
	constructor(name, codename, risk, workRates, workMoods) {
		this.name = name;
		this.codename = codename;
		this.risk = risk;
		this.workRates = workRates;
		this.workMoods = workMoods;
		this.doneWorks = [];
		switch(risk) {
			case "ZAYIN":
				this.workCap = 10;
				break;
			case "TETH":
				this.workCap = 16;
				break;
			case "HE":
				this.workCap = 24;
				break;
			case "WAW":
				this.workCap = 32;
				break;
			case "ALEPH":
				this.workCap = 40;
				break;
				
		}
	}
	doWork(workType) {
		this.doneWorks.push(workType);
	}
}

class OneBadManyGood extends Abnormality {
	constructor() {
		super("One Sin and Hundreds of Good Deeds", "O-03-03", "ZAYIN", [0.35, 0.6, 0.7, 0.35], [0.35, 0.6, 0.7, 0.35]);
	}
}

function updateScreen() {
	
}

function gameTick() {
	
}

function removeDarkening(obj) {
	obj.style.filter = "brightness(100%)";
}

function addDarkening(obj) {
	obj.style.filter = "brightness(50%)";
}

function createMenu() {
	document.createElement();
}