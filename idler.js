var tickspeed = 200; //should be 200 in release ver
var materials = {
	wood: 0,
	woodraw: 0,
	woodcut: 0,
	stone: 0,
	science: 0,
	manpower: 0,
	copperore: 0,
	copperingot: 0,
	tinore: 0,
	tiningot: 0,
	zincore: 0,
	zincingot: 0,
	clay: 0,
	clayE: 0,
	sand: 0,
	sandE: 0,
	glass: 0
}
var naviData = 0;
var EnaviData = 0;

var ts_check = {
	1: false,
	2: false,
	3: false,
	4: false,
	5: false,
	6: false,
	7: false,
	8: false
}
//wood pickaxe
//check, costwood
var toolstation1 = {
	costWood: 30
};
//wood axe
//check, costwood, time, queue
var toolstation2 = {
	costWood: 10,
	timeMod: 3,
	queueMod: 1
};
//stone pickaxe
//check, costwood, coststone, time, queue
var toolstation3 = {
	costWood: 30,
	costStone: 15,
	timeMod: 3,
	queueMod: 3
};
//stone axe
//check, costwood, coststone, time, queue
var toolstation4 = {
	costWood: 15,
	costStone: 30,
	timeMod: 2,
	queueMod: 2
};
//copper axe
//check, costwood, costcopper, mult
var toolstation5 = {
	costWood: 25,
	costCopper: 5,
	mult: 1.2
};
//copper pickaxe
//check, costwood, costcopper, mult
var toolstation6 = {
	costWood: 25,
	costCopper: 5,
	mult: 1.2
};
//copper instruments
//check, costcopper, mult
var toolstation7 = {
	costCopper: 5,
	mult: 1.2
};
//copper optics
//check, costglass, costcopper, mult
var toolstation8 = {
	costGlass: 25,
	costCopper: 5,
	mult: 1.2
};
var woodTime = 0;
var woodQueue = 0;
var woodTimeMax = 15;
var woodQueueMax = 5;
var stoneTime = 0;
var stoneQueue = 0;
var stoneTimeMax = 15;
var stoneQueueMax = 5;
var scienceTime = 0;
var scienceQueue = 0;
var scienceTimeMax = 25;
var scienceQueueMax = 3;
var oresQueue = 0;
var manpowerTime = 0;
var manpowerTimeMax = 100;
var sandTime = 0;
var sandQueue = 0;
var sandTimeMax = 20;
var sandQueueMax = 4;
var sandClay = 0.6;
//research station
//count, woodcost, stonecost, prodbonus
var campsiteResearch1 = [0, 45, 35, 25];

var rs_check = {
	1: false,
	2: false,
	3: false,
	4: false,
	5: false,
	6: false
}
//fire
//check, costscience
var research1 = [0, 10];
//exploration
//check, costscience
var research2 = [0, 20];
//area, mult, coast
var exploration = [0, 1, 10];
var caravan1 = [10, 100, 50, 50];
//geology
//check, costscience
var research3 = [0, 40];
//coststone, mult, chancecopper, chancetin, chancezinc
var geology = [50, 50, 45, 15, 10]
//agriculture
//check, costscience
var research4 = [0, 70];
//mining
//check, costscience
var research5 = [0, 70];
//metallurgy
//check, costscience
var research6 = [0, 70];
document.getElementById("explorationzone").setAttribute("hidden", true);
document.getElementById("coastEzone").setAttribute("hidden", true);
document.getElementById("naviExploration").setAttribute("hidden", true);
if (localStorage.saveMaterials) {
	loadGame();
}
saveGame();

function harvestWood() {
	woodQueue++;
	woodTime++
}

function harvestStone() {
	stoneQueue++;
	stoneTime++;
}

function harvestScience() {
	scienceQueue++;
	scienceTime++;
}

function harvestSand() {
	sandQueue++;
	sandTime++;
}

function harvestOres() {
	oresQueue++;
}

function harvestManpower() {
	manpowerTime++;
}

function clickExplore() {
	exploration[0] += materials.manpower * exploration[1];
	materials.manpower = 0;
}

function caravanCoast() {
	if (materials.manpower >= caravan1[0]) {
		document.getElementById("caravanCoast").setAttribute("disabled", true);
		if (materials.sandE >= caravan1[2]) {
			materials.sandE -= caravan1[2];
			var tempsand = caravan1[2];
		} else {
			var tempsand = materials.sandE;
			materials.sandE = 0;
		}
		if (materials.clayE >= caravan1[3]) {
			materials.clayE -= caravan1[3];
			var tempclay = caravan1[3];
		} else {
			var tempclay = materials.clayE;
			materials.clayE = 0;
		}
		setTimeout(function() {
			materials.sand += tempsand;
			materials.clay += tempclay;
			document.getElementById("caravanCoast").removeAttribute("disabled");
		}, caravan1[1] * tickspeed)
	}
}

//Navi Campsite
function clickNaviCampsite() {
	naviData = 0;
	document.getElementsByClassName("active")[0].removeAttribute("class");
	document.getElementById("explorationzone").setAttribute("hidden", true);
	document.getElementById("campsitezone").removeAttribute("hidden");
}
//Navi Campsite

//Navi Exploration
function clickNaviExploration() {
	naviData = 1;
	document.getElementsByClassName("active")[0].removeAttribute("class");
	document.getElementById("campsitezone").setAttribute("hidden", true);
	document.getElementById("explorationzone").removeAttribute("hidden");
}
//Navi Exploration

//ENavi Coast
function clickEnaviCoast() {
	EnaviData = 0;
	document.getElementsByClassName("activeE")[0].removeAttribute("class");
	document.getElementById("coastEzone").removeAttribute("hidden");
}
//ENavi Coast

//Research Station
function clickCampsiteResearch1() {
	if (materials.wood >= campsiteResearch1[1] * Math.pow(1.15, campsiteResearch1[0])) {
		if (materials.stone >= campsiteResearch1[2] * Math.pow(1.15, campsiteResearch1[0])) {
			spendWood(campsiteResearch1[1] * Math.pow(1.15, campsiteResearch1[0]));
			materials.stone = materials.stone - campsiteResearch1[2] * Math.pow(1.15, campsiteResearch1[0]);
			campsiteResearch1[0]++;
			document.getElementById("harvestScience").removeAttribute("hidden");
			document.getElementById("scienceDisplay").removeAttribute("hidden");
		}
	}
}
//Research Station

//Smelt Copper
function clickSmeltCopper() {
	if (materials.copperore >= 10) {
		if (materials.clay >= 10) {
			materials.copperore -= 10;
			materials.clay -= 10;
			materials.copperingot++;
		}
	}
}
//Smelt Copper

//Wooden Pickaxe
function clickToolstation1() {
	if (materials.wood >= toolstation1.costWood) {
		spendWood(toolstation1.costWood);
		ts_check["1"] = true;
		document.getElementById("toolstation1").setAttribute("hidden", true);
		document.getElementById("harvestStone").removeAttribute("hidden");
		document.getElementById("stoneDisplay").removeAttribute("hidden");
	}
}
//Wooden Pickaxe

//Wooden Axe
function clickToolstation2() {
	if (materials.wood >= toolstation2.costWood) {
		spendWood(toolstation2.costWood);
		ts_check["2"] = true;
		document.getElementById("toolstation2").setAttribute("hidden", true);
	}
}
//Wooden Axe

//Stone Pickaxe
function clickToolstation3() {
	if (materials.wood >= toolstation3.costWood) {
		if (materials.stone >= toolstation3.costStone) {
			spendWood(toolstation3.costWood);
			materials.stone -= toolstation3.costStone;
			ts_check["3"] = true;
			document.getElementById("toolstation3").setAttribute("hidden", true);
		}
	}
}
//Stone Pickaxe

//Stone Axe
function clickToolstation4() {
	if (materials.wood >= toolstation4.costWood) {
		if (materials.stone >= toolstation4.costStone) {
			spendWood(toolstation4.costWood);
			materials.stone -= toolstation4.costStone;
			ts_check["4"] = true;
			document.getElementById("toolstation4").setAttribute("hidden", true);
		}
	}
}
//Stone Axe

//Copper Axe
function clickToolstation5() {
	if (materials.wood >= toolstation5.costWood) {
		if (materials.copperingot >= toolstation5.costCopper) {
			spendWood(toolstation5.costWood);
			materials.copperingot -= toolstation5.costCopper;
			ts_check["5"] = true;
			document.getElementById("toolstation5").setAttribute("hidden", true);
		}
	}
}
//Copper Axe

//Copper Pickaxe
function clickToolstation6() {
	if (materials.wood >= toolstation6.costWood) {
		if (materials.copperingot >= toolstation6.costCopper) {
			spendWood(toolstation6.costWood);
			materials.copperingot -= toolstation6.costCopper;
			ts_check["6"] = true;
			document.getElementById("toolstation6").setAttribute("hidden", true);
		}
	}
}
//Copper Pickxe

//Copper Instruments
function clickToolstation7() {
	if (materials.copperingot >= toolstation7.costCopper) {
		materials.copperingot -= toolstation7.costCopper;
		ts_check["7"] = true;
		document.getElementById("toolstation7").setAttribute("hidden", true);
	}
}
//Copper Instruments

//Copper Sights
function clickToolstation8() {
	if (materials.glass >= toolstation8.costGlass) {
		if (materials.copper >= toolstation8.costCopper) {
			materials.glass -= toolstation8.costGlass;
			materials.copper -= toolstation8.costCopper;
			ts_check["8"] = true;
			document.getElementById("toolstation8").setAttribute("hidden", true);
		}
	}
}
//Copper Sights

//Fire
function clickResearch1() {
	if (materials.science >= research1[1]) {
		materials.science = materials.science - research1[1];
		research1[0] = 1;
		document.getElementById("research1").setAttribute("hidden", true);
		document.getElementById("research2").removeAttribute("hidden");
		document.getElementById("research3").removeAttribute("hidden");
		document.getElementById("research4").removeAttribute("hidden");
	}
}
//Fire

//Exploration
function clickResearch2() {
	if (materials.science >= research2[1]) {
		materials.science = materials.science - research2[1];
		research2[0] = 1;
		document.getElementById("research2").setAttribute("hidden", true);
		document.getElementById("naviExploration").style.display = "block";
		document.getElementById("manpowerDisplay").removeAttribute("hidden");
		document.getElementById("harvestManpower").removeAttribute("hidden");
		document.getElementById("sandDisplay").removeAttribute("hidden");
		document.getElementById("clayDisplay").removeAttribute("hidden");
	}
}
//Exploration

//Geology
function clickResearch3() {
	if (materials.science >= research3[1]) {
		materials.science -= research3[1];
		research3[0] = 1;
		document.getElementById("research3").setAttribute("hidden", true);
		document.getElementById("copperDisplay").removeAttribute("hidden");
		document.getElementById("tinDisplay").removeAttribute("hidden");
		document.getElementById("zincDisplay").removeAttribute("hidden");
		document.getElementById("harvestOres").removeAttribute("hidden");
		document.getElementById("smeltCopper").removeAttribute("hidden");
	}
}
//Geology


setInterval(timer, tickspeed);

function saveGame() {
	localStorage.saveMaterials = JSON.stringify(materials);
	localStorage.saveMaterials = JSON.stringify(ts_check);
	console.log("Save Complete!");
	//console.log(localStorage[0]);
}

function loadGame() {
	if(localStorage.saveMaterials) {
		var _load_ = localStorage.saveMaterials;
		var materialsRestore = JSON.parse(_load_);
		Object.assign(materials, materialsRestore);
	}
	if(localStorage.saveTS_Check) {
		var _load_ = localStorage.saveTS_Check;
		var ts_checkRestore = JSON.parse(_load_);
		Object.assign(ts_check, ts_checkRestore);
	}
	console.log("Load Complete!");
	//console.log(localStorage[0]);

}



function timer() {
	saveGame();

	function tt_gen(data) {
		var output = "<span class='tooltiptext'> <span class='forceleft'> ";
		output += data[0];
		output += " </span> <span class='forceright'>";
		output += data[1];
		for (i = 2; i < data.length; i++) {
			if (i % 2 == 0) {
				output += "</span> <br> <span class='forceleft'>";
				output += data[i];
			} else {
				output += "</span> <span class='forceright'>";
				output += data[i];
			}
		}
		output += "</span> </span>";
		return output;
	}
	materials.wood = materials.woodraw + materials.woodcut;
	document.getElementById("woodDisplay").innerHTML = "Wood: " + materials.wood.toFixed(3) + tt_gen(["Timber", materials.woodraw.toFixed(3), "Lumber", materials.woodcut.toFixed(3)]);
	document.getElementById("stoneDisplay").innerHTML = "Stone: " + materials.stone.toFixed(3);
	document.getElementById("scienceDisplay").innerHTML = "Science: " + materials.science.toFixed(3);
	document.getElementById("copperDisplay").innerHTML = "Copper: " + materials.copperingot.toFixed(3) + tt_gen(["Copper Ingots", materials.copperingot.toFixed(3), "Copper Ore", materials.copperore.toFixed(3)]);
	document.getElementById("tinDisplay").innerHTML = "Tin: " + materials.tiningot.toFixed(3) + tt_gen(["Tin Ingots", materials.tiningot.toFixed(3), "Tin Ore", materials.tinore.toFixed(3)]);
	document.getElementById("zincDisplay").innerHTML = "Zinc: " + materials.zincingot.toFixed(3) + tt_gen(["Zinc Ingots", materials.zincingot.toFixed(3), "Zinc Ore", materials.zincore.toFixed(3)]);
	document.getElementById("manpowerDisplay").innerHTML = "Manpower: " + materials.manpower.toFixed(3);
	document.getElementById("sandDisplayE").innerHTML = "Sand: " + materials.sandE.toFixed(3);
	document.getElementById("clayDisplayE").innerHTML = "Clay: " + materials.clayE.toFixed(3);
	document.getElementById("sandDisplay").innerHTML = "Sand: " + materials.sand.toFixed(3);
	document.getElementById("clayDisplay").innerHTML = "Clay: " + materials.clay.toFixed(3);

	if (naviData == 0) {
		document.getElementById("naviCampsite").setAttribute("class", "active");
	}
	if (naviData == 1) {
		document.getElementById("naviExploration").setAttribute("class", "active");
	}
	if (EnaviData == 0) {
		document.getElementById("EnaviCoast").setAttribute("class", "activeE");
	}

	document.getElementById("tooltipSmeltCopper").innerHTML = "<span class='forceleft'> Copper Ore Cost: </span> <span class='forceright'>" + "10" + "</span> <br> <span class='forceleft' > Clay Cost: </span> <span class='forceright'>" + "10" + "</span>";

	document.getElementById("campsiteResearch1").innerHTML = "Research Station (" + campsiteResearch1[0] + ")";

	document.getElementById("tooltipCampsiteResearch1").innerHTML = "Allows you to conduct research. <hr> <span class='forceleft'>Wood</span> <span class='forceright'> " + (campsiteResearch1[1] * Math.pow(1.15, campsiteResearch1[0])).toFixed(3) + "</span> <br> <span class='forceleft'> Stone </span> <span class='forceright'> " + (campsiteResearch1[2] * Math.pow(1.15, campsiteResearch1[0])).toFixed(3) + "</span> <br><hr> <span class='attribute'> Science Bonus: " + campsiteResearch1[3] + "%</span>";

	document.getElementById("tooltipToolstation1").innerHTML = "Allows you to harvest stone. <hr> <span class='forceleft'>Wood</span> <span class='forceright'> " + toolstation1.costWood + "</span> ";

	document.getElementById("tooltipToolstation2").innerHTML = "Harvest wood faster. <hr> <span class='forceleft'>Wood</span> <span class='forceright'> " + toolstation2.costWood + "</span> <br> <hr> <span class='attribute'> Wood Time Max: -" + toolstation2.timeMod + "</span> <br> <span class='attribute'> Wood Queue Max: +" + toolstation2.queueMod + "</span>";

	document.getElementById("tooltipToolstation3").innerHTML = "Harvest stone faster. <hr> <span class='forceleft'>Wood</span> <span class='forceright'> " + toolstation3.costWood + "</span> <br> <span class='forceleft'> Stone </span> <span class='forceright'> " + toolstation3.costCopper + "</span> <br><hr> <span class='attribute'> Stone Time Max: -" + toolstation3.timeMod + "</span> <br> <span class='attribute'> Stone Queue Max: +" + toolstation3.queueMod + "</span>";

	document.getElementById("tooltipToolstation4").innerHTML = "Harvest wood faster. <hr> <span class='forceleft'>Wood</span> <span class='forceright'> " + toolstation4.costWood + "</span> <br> <span class='forceleft'> Stone </span> <span class='forceright'> " + toolstation4.costCopper + "</span> <br><hr> <span class='attribute'> Wood Time Max: -" + toolstation4.timeMod + "</span> <br> <span class='attribute'> Wood Queue Max: +" + toolstation4.queueMod + "</span>";

	document.getElementById("tooltipToolstation5").innerHTML = "Increase manual wood production. <hr> <span class='forceleft'>Wood</span> <span class='forceright'> " + toolstation5.costWood + "</span> <br> <span class='forceleft'> Copper </span> <span class='forceright'> " + toolstation5.costCopper + "</span> <br><hr> <span class='attribute'> Wood Production Multiplier: x" + toolstation5.mult + "</span>";

	document.getElementById("tooltipToolstation6").innerHTML = "Increase manual stone production. <hr> <span class='forceleft'>Wood</span> <span class='forceright'> " + toolstation6.costWood + "</span> <br> <span class='forceleft'> Copper </span> <span class='forceright'> " + toolstation6.costCopper + "</span> <br><hr> <span class='attribute'> Stone Production Multiplier: x" + toolstation6.mult + "</span>";

	document.getElementById("tooltipResearch1").innerHTML = "Discover fire. Required for all other research upgrades. <hr> <span class='forceleft'>Science</span> <span class='forceright'> " + research1[1] + "</span> ";

	document.getElementById("tooltipResearch2").innerHTML = "Look around you. Discover new things.<hr> <span class='forceleft'>Science</span> <span class='forceright'> " + research2[1] + "</span> <br> <hr> <span class='attribute'>Unlocks: Manpower/Exploration</span>";

	document.getElementById("tooltipResearch3").innerHTML = "Find ores in stone. <hr> <span class='forceleft'>Science</span> <span class='forceright'> " + research3[1] + "</span> <br> <hr> <span class='attribute'>Unlocks: Ores/Metals</span>";

	document.getElementById("tooltipResearch4").innerHTML = "Learn how to grow plants. TBA<hr> <span class='forceleft'>Science</span> <span class='forceright'> " + research4[1] + "</span> <br> <hr> <span class='attribute'>Unlocks: Growing Plants</span>"; {
		
		//Research Station
		if (materials.stone >= campsiteResearch1[2] * 0.3) {
			document.getElementById("campsiteResearch1").removeAttribute("hidden");
		}
		//Research Station

		//Wooden Pickaxe
		if (materials.wood >= toolstation1.costWood * 0.3) {
			if (ts_check["1"] != true) {
				document.getElementById("toolstation1").removeAttribute("hidden");
			}
		}
		//Wooden Pickaxe

		//Wooden Axe
		if (materials.wood >= toolstation2.costWood * 0.3) {
			if (ts_check["2"] != true) {
				document.getElementById("toolstation2").removeAttribute("hidden");
			}
		}

		if (ts_check["2"] == true) {
			woodTimeMax = woodTimeMax - toolstation2.timeMod;
			woodQueueMax = woodQueueMax + toolstation2.queueMod;
		}
		//Wooden Axe

		//Stone Pickaxe
		if (materials.stone >= toolstation3.costStone * 0.3) {
			if (ts_check["3"] != true) {
				document.getElementById("toolstation3").removeAttribute("hidden");
			}
		}

		if (ts_check["3"] == true) {
			stoneTimeMax = stoneTimeMax - toolstation3.timeMod;
			stoneQueueMax = stoneQueueMax + toolstation3.queueMod;
		}
		//Stone Pickaxe

		//Stone Axe
		if (materials.stone >= toolstation4.costStone * 0.3) {
			if (ts_check["4"] != true) {
				document.getElementById("toolstation4").removeAttribute("hidden");
			}
		}

		if (ts_check["4"] == true) {
			woodTimeMax = woodTimeMax - toolstation4.timeMod;
			woodQueueMax = woodQueueMax + toolstation4.queueMod;
		}
		//Stone Axe

		//Copper Axe
		if (materials.copperingot >= toolstation5.costCopper * 0.3) {
			if (ts_check["5"] != true) {
				document.getElementById("toolstation5").removeAttribute("hidden");
			}
		}

		if (ts_check["5"] == true) {
			woodTimeMax = woodTimeMax - toolstation5.timeMod;
			woodQueueMax = woodQueueMax + toolstation.queueMod;
		}
		//Copper Axe

		//Fire
		if (materials.science >= 1) {
			if (research1[0] != 1) {
				document.getElementById("research1").removeAttribute("hidden");
			}
		}
		//Fire

		if (research2[0] != 1) {
			document.getElementById("naviExploration").style.display = "none";
		}

		//Coast
		if (exploration[0] >= exploration[2]) {
			document.getElementById("EnaviCoast").style.display = "block";
		}
		//Coast

	} {
		document.getElementById("tooltipHarvestWood").innerHTML = "<span class='forceleft'> Wood in Queue: </span> <span class='forceright'>" + woodQueue + "</span> <br> <span class='forceleft' > Wood Time: </span> <span class='forceright'>" + woodTime + "</span> <br> <span class='forceleft'> Wood Queue Max: </span> <span class='forceright'>" + woodQueueMax + "</span> <br> <span class='forceleft'> Wood Time Max: </span> <span class='forceright'>" + woodTimeMax + "</span>";
		document.getElementById("tooltipHarvestStone").innerHTML = "<span class='forceleft'> Stone in Queue: </span> <span class='forceright'>" + stoneQueue + "</span> <br> <span class='forceleft' > Stone Time: </span> <span class='forceright'>" + stoneTime + "</span> <br> <span class='forceleft'> Stone Queue Max: </span> <span class='forceright'>" + stoneQueueMax + "</span> <br> <span class='forceleft'> Stone Time Max: </span> <span class='forceright'>" + stoneTimeMax + "</span>";
		document.getElementById("tooltipHarvestScience").innerHTML = "<span class='forceleft'> Science in Queue: </span> <span class='forceright'>" + scienceQueue + "</span> <br> <span class='forceleft' > Science Time: </span> <span class='forceright'>" + scienceTime + "</span> <br> <span class='forceleft'> Science Queue Max: </span> <span class='forceright'>" + scienceQueueMax + "</span> <br> <span class='forceleft'> Science Time Max: </span> <span class='forceright'>" + scienceTimeMax + "</span>";
		document.getElementById("tooltipHarvestOres").innerHTML = "<span class='forceleft'> Stone Cost: </span> <span class='forceright'>" + geology[0] + "</span> <br> <span class='forceleft' > Productivity: </span> <span class='forceright'>" + geology[1] + "</span> <br> <span class='forceleft'> Copper Chance: </span> <span class='forceright'>" + geology[2] + "</span> <br> <span class='forceleft'> Tin Chance: </span> <span class='forceright'>" + geology[3] + "</span> <br> <span class='forceleft'> Zinc Chance: </span> <span class='forceright'>" + geology[4] + "</span>";
		document.getElementById("tooltipExplore").innerHTML = "<span class='forceleft'> Explored Area: </span> <span class='forceright'>" + exploration[0] + "</span> <br> <span class='forceleft' > Productivity: </span> <span class='forceright'>" + exploration[1] + "</span>";
		document.getElementById("tooltipHarvestManpower").innerHTML = "<span class='forceleft'> Manpower Time: </span> <span class='forceright'>" + manpowerTime + "</span> <br> <span class='forceleft' > Manpower Time Max: </span> <span class='forceright'>" + manpowerTimeMax + "</span>";
		document.getElementById("tooltipHarvestSand").innerHTML = "<span class='forceleft'> Sand in Queue: </span> <span class='forceright'>" + sandQueue + "</span> <br> <span class='forceleft' > Sand Time: </span> <span class='forceright'>" + sandTime + "</span> <br> <span class='forceleft'> Sand Queue Max: </span> <span class='forceright'>" + sandQueueMax + "</span> <br> <span class='forceleft'> Sand Time Max: </span> <span class='forceright'>" + sandTimeMax + "</span> <br> <span class='forceleft'> Clay Chance: </span> <span class='forceright'>" + sandClay * 100 + "%</span>";
	}


	{
		if (woodQueue > 0) {
			if (woodQueue > woodQueueMax) {
				woodQueue = woodQueueMax;
			}
			woodTime++;
			if (woodTime >= woodTimeMax) {
				var woodmult = 1;
				if (toolstation5[0] == 1) {
					woodmult *= toolstation5[3];
				}
				woodTime = 0;
				materials.woodraw += woodmult;
				woodQueue--;
			}
		}
		woodTimeMax = 15;
		woodQueueMax = 5;

		if (stoneQueue > 0) {
			if (stoneQueue > stoneQueueMax) {
				stoneQueue = stoneQueueMax;
			}
			stoneTime++;
			if (stoneTime >= stoneTimeMax) {
				stoneTime = 0;
				materials.stone++;
				if (research3[0] == 1) {
					var natcopper = (Math.random());
					if (natcopper >= 0.9) {
						materials.copperore++;
					}
				}
				stoneQueue--;
			}
		}
		stoneTimeMax = 15;
		stoneQueueMax = 5;

		if (scienceQueue > 0) {
			if (scienceQueue > scienceQueueMax) {
				scienceQueue = scienceQueueMax;
			}
			scienceTime++;
			if (scienceTime >= scienceTimeMax) {
				scienceTime = 0;
				var scienceprodtemp = (Math.random() * (3 * (campsiteResearch1[0] * ((campsiteResearch1[3] / 100) + 1))));
				materials.science += scienceprodtemp;
				scienceQueue--;
			}
		}
		scienceTimeMax = 25;
		scienceQueueMax = 3;

		if (oresQueue > 0) {
			if (materials.stone >= geology[0]) {
				for (i = 0; i < geology[1]; i++) {
					var geocopper = Math.random();
					if (geocopper <= (geology[2] / 100)) {
						materials.copperore++;
					}
					var geotin = Math.random();
					if (geotin <= (geology[3] / 100)) {
						materials.tinore++;
					}
					var geozinc = Math.random();
					if (geozinc <= (geology[4] / 100)) {
						materials.zincore++;
					}
				}
				oresQueue--
				materials.stone -= geology[0];
			}
		}
		if (research2[0] == 1) {
			manpowerTime++
			if (manpowerTime >= manpowerTimeMax) {
				materials.manpower++;
				manpowerTime = 0;
			}
		}
		manpowerTimeMax = 100;

		if (sandQueue > 0) {
			if (sandQueue > sandQueueMax) {
				sandQueue = sandQueueMax;
			}
			sandTime++;
			if (sandTime >= sandTimeMax) {
				sandTime = 0;
				materials.sandE++;

				var claygen = (Math.random());
				if (claygen >= sandClay) {
					materials.clayE++;
				}
				sandQueue--;
			}
		}
		sandTimeMax = 20;
		sandQueueMax = 4;
	}
}

function spendWood(purchase) {
	if (materials.woodcut >= purchase) {
		materials.woodcut -= purchase;
	} else {
		purchase -= materials.woodcut;
		materials.woodcut = 0;
		materials.woodraw -= purchase;
	}
}
