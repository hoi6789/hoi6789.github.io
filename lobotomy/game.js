energy = 0;
document.getElementById("energydisplay").innerHTML = "Energy: " + energy;
function updateEnergy(gainedEnergy) {
	gainedEnergy += Math.floor(Math.random() * 5) - 2;
	energy += gainedEnergy;
	document.getElementById("energydisplay").innerHTML = "Energy: " + energy;
}