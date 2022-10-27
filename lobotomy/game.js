energy = 0;
document.getElementById("energydisplay").innerHTML = "Energy: " + energy;
function updateEnergy(gainedEnergy) {
	gainedEnergy += Math.floor(Math.random() * 5) - 2;
	energy += gainedEnergy;
	document.getElementById("energydisplay").innerHTML = "Energy: " + energy;
}
class Abnormality {
constructor(name, codename, risk, workRates, workMoods) {
this.
}
}

class OneBadManyGood extends Abnormality {
constructor() {
super("One Sin and Hundreds of Good Deeds", "O-03-03", "ZAYIN", [], []);
}
}
