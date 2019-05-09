var tickspeed = 200; //should be 200 in release ver
var materials = {
	wood: 0,
	woodraw: 0,
	woodcut: 0,
	stone: 0,
	science: 0,
	manpower: 0,
	exploredarea: 0,
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
var woodmult = 1;
var stoneTime = 0;
var stoneQueue = 0;
var stoneTimeMax = 15;
var stoneQueueMax = 5;
var stonemult = 1;
var scienceTime = 0;
var scienceQueue = 0;
var scienceTimeMax = 25;
var scienceQueueMax = 3;
var sciencemult = 1;
var oresQueue = 0;
var manpowerTime = 0;
var manpowerTimeMax = 100;
var explorationQueue = 0;
var explorationmult = 1;
var sandTime = 0;
var sandQueue = 0;
var sandTimeMax = 20;
var sandQueueMax = 4;
var sandClay = 0.6;

var buildings = {
	research1: 0
}

//research station
//count, woodcost, stonecost, prodbonus
var campsiteResearch1 = {
	costWood: 45,
	costStone: 35,
	bonus: 25
};

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
var research1 = {
	costScience: 10
};

//exploration
//check, costscience
var research2 = {
	costScience: 20,
};
//area, mult, coast
var exploration = {
	coast: 10
}
//cost, time, sand, clay
var caravan1 = {
	costManpower: 10,
	time: 100,
	limitSand: 50,
	limitClay: 50
};

//geology
//check, costscience
var research3 = {
	costScience: 40
};
//coststone, mult, chancecopper, chancetin, chancezinc
var geology = {
	costStone: 50,
	rolls: 50,
	chanceCopper: 45,
	chanceTin: 15,
	chanceZinc: 10
};

//agriculture
//check, costscience
var research4 = {
	costScience: 70
};

//mining
//check, costscience
var research5 = {
	costScience: 70
};

//metallurgy
//check, costscience
var research6 = {
	costScience: 70
};

document.getElementById("explorationzone").setAttribute("hidden", true);
document.getElementById("coastEzone").setAttribute("hidden", true);
document.getElementById("naviExploration").setAttribute("hidden", true);

loadGame();
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

function caravanCoast() {
	if (materials.manpower >= caravan1["costManpower"]) {
		materials.manpower -= caravan1.costManpower;
		document.getElementById("caravanCoast").setAttribute("disabled", true);
		if (materials.sandE >= caravan1["limitSand"]) {
			materials.sandE -= caravan1["limitSand"];
			var tempsand = caravan1["limitSand"];
		} else {
			var tempsand = materials.sandE;
			materials.sandE = 0;
		}
		if (materials.clayE >= caravan1["limitClay"]) {
			materials.clayE -= caravan1["limitClay"];
			var tempclay = caravan1["limitClay"];
		} else {
			var tempclay = materials.clayE;
			materials.clayE = 0;
		}
		setTimeout(function() {
			materials.sand += tempsand;
			materials.clay += tempclay;
			document.getElementById("caravanCoast").removeAttribute("disabled");
		}, caravan1.time * tickspeed)
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
	if (materials.wood >= campsiteResearch1.costWood * Math.pow(1.15, buildings["research1"])) {
		if (materials.stone >= campsiteResearch1.costStone * Math.pow(1.15, buildings["research1"])) {
			spendWood(campsiteResearch1.costWood * Math.pow(1.15, buildings["research1"]));
			materials.stone -= campsiteResearch1.costStone * Math.pow(1.15, buildings["research1"]);
			buildings["research1"]++;
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
		if (materials.copperingot >= toolstation8.costCopper) {
			materials.glass -= toolstation8.costGlass;
			materials.copperingot -= toolstation8.costCopper;
			ts_check["8"] = true;
			document.getElementById("toolstation8").setAttribute("hidden", true);
		}
	}
}
//Copper Sights

//Fire
function clickResearch1() {
	if (materials.science >= research1["costScience"]) {
		materials.science -= research1["costScience"];
		rs_check["1"] = true;
		document.getElementById("research1").setAttribute("hidden", true);
		document.getElementById("research2").removeAttribute("hidden");
		document.getElementById("research3").removeAttribute("hidden");
		document.getElementById("research4").removeAttribute("hidden");
	}
}
//Fire

//Exploration
function clickResearch2() {
	if (materials.science >= research2["costScience"]) {
		materials.science -= research2["costScience"];
		rs_check["2"] = true;
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
	if (materials.science >= research3["costScience"]) {
		materials.science -= research3["costScience"];
		rs_check["3"] = true;
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
	localStorage.saveTS_Check = JSON.stringify(ts_check);
	localStorage.saveRS_Check = JSON.stringify(rs_check);
	localStorage.saveBuildings = JSON.stringify(buildings);
	console.log("Save Complete!");
	//console.log(localStorage[0]);
}

function loadGame() {
	if(localStorage.saveMaterials) {
		var _load_ = localStorage.saveMaterials;
		var materialsRestore = JSON.parse(_load_);
		Object.assign(materials, materialsRestore);
		console.log("Materials Loaded!");
	}
	if(localStorage.saveTS_Check) {
		var _load_ = localStorage.saveTS_Check;
		var ts_checkRestore = JSON.parse(_load_);
		Object.assign(ts_check, ts_checkRestore);
		console.log("Toolstation Loaded!");
	}
	if(localStorage.saveBuildings) {
		var _load_ = localStorage.saveBuildings;
		var buildingsRestore = JSON.parse(_load_);
		Object.assign(buildings, buildingsRestore);
		console.log("Buildings Loaded!");
	}
	if(localStorage.saveRS_Check) {
		var _load_ = localStorage.saveRS_Check;
		var rs_checkRestore = JSON.parse(_load_);
		Object.assign(rs_check, rs_checkRestore);
		console.log("Research Loaded!");
	}
	console.log("Load Complete!");
	//console.log(localStorage[0]);

}

function clickExplore() {
	explorationQueue++;
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
	function tt_gen_alt(data) {
		var output = "<span class='forceleft'> ";
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
		output += "</span>";
		return output;
	}
	function tt_gen_shiny(data, attr) {
		var output = "";
		output += data[0];
		output += "<hr> <span class='forceleft'>";
		output += data[1];
		for (i = 2; i < data.length; i++) {
			if (i % 2 == 0) {
				output += "</span> <span class='forceright'>";
				output += data[i];
			} else {
				output += "</span> <br> <span class='forceleft'>";
				output += data[i];
			}
		}
		output += "</span> <br><hr> <span class='attribute'>";
		for(i = 0; i < attr.length; i++) {
			output += attr[i];
			output += "</span> <br> <span class='attribute'>"
		}
		output += "</span>"
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
	document.getElementById("tooltipcaravanCoast").innerHTML = tt_gen(["Manpower", caravan1.costManpower, "Time", caravan1.time, "Sand Capacity", caravan1.limitSand, "Clay Capacity", caravan1.limitClay]);

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

	document.getElementById("campsiteResearch1").innerHTML = "Research Station (" + buildings.research1 + ")";

	document.getElementById("tooltipCampsiteResearch1").innerHTML = tt_gen_shiny(["Allows you to conduct research.", "Wood", (campsiteResearch1.costWood * Math.pow(1.15, buildings.research1)).toFixed(3), "Stone", (campsiteResearch1.costStone * Math.pow(1.15, buildings.research1)).toFixed(3)], ["Science Bonus: " + campsiteResearch1.bonus + "%"]);
	/*"Allows you to conduct research. 
	<hr> <span class='forceleft'>Wood</span> <span class='forceright'> " + 
	(campsiteResearch1.costWood * Math.pow(1.15, buildings.research1)).toFixed(3) + 
	"</span> <br> <span class='forceleft'> Stone </span> <span class='forceright'> " 
	+ (campsiteResearch1.costStone * Math.pow(1.15, buildings.research1)).toFixed(3) + 
	"</span> <br><hr> <span class='attribute'> Science Bonus: " + campsiteResearch1.bonus + "%</span>";*/

	document.getElementById("tooltipToolstation1").innerHTML = tt_gen_shiny(["Allows you to harvest stone.", "Wood", toolstation1.costWood], []);

	document.getElementById("tooltipToolstation2").innerHTML = tt_gen_shiny(["Harvest wood faster.", "Wood", toolstation2.costWood], ["Wood Time Max: -" + toolstation2.timeMod, "Wood Queue Max: +" + toolstation2.queueMod]);

	document.getElementById("tooltipToolstation3").innerHTML = tt_gen_shiny(["Harvest stone faster.", "Wood", toolstation3.costWood, "Stone", toolstation3.costStone], ["Stone Time Max: -" + toolstation3.timeMod, "Stone Queue Max: +" + toolstation3.queueMod]);

	document.getElementById("tooltipToolstation4").innerHTML = tt_gen_shiny(["Harvest wood faster.", "Wood", toolstation4.costWood, "Stone", toolstation4.costStone], ["Wood Time Max: -" + toolstation4.timeMod, "Wood Queue Max: +" + toolstation4.queueMod]);

	document.getElementById("tooltipToolstation5").innerHTML = tt_gen_shiny(["Increase manual wood production.", "Wood", toolstation5.costWood, "Copper", toolstation5.costCopper], ["Wood Production Multiplier: x" + toolstation5.mult]);

	document.getElementById("tooltipToolstation6").innerHTML = tt_gen_shiny(["Increase manual stone production.", "Wood", toolstation6.costWood, "Copper", toolstation6.costCopper], ["Stone Production Multiplier: x" + toolstation6.mult]);
	
	document.getElementById("tooltipToolstation7").innerHTML = tt_gen_shiny(["Increase manual science production.", "Copper", toolstation7.costCopper], ["Science Production Multiplier: x" + toolstation7.mult]);
	
	document.getElementById("tooltipToolstation8").innerHTML = tt_gen_shiny(["Increase the exploration multiplier.", "Glass", toolstation8.costGlass, "Copper", toolstation8.costCopper], ["Exploration Multiplier: x" + toolstation8.mult]);

	document.getElementById("tooltipResearch1").innerHTML = tt_gen_shiny(["Discover fire. Required for all other research upgrades.", "Science", research1.costScience], []);

	document.getElementById("tooltipResearch2").innerHTML = tt_gen_shiny(["Look around you. Discover new things.", "Science", research2.costScience], ["Unlocks: Manpower/Exploration"]);

	document.getElementById("tooltipResearch3").innerHTML = tt_gen_shiny(["Find ores in stone.", "Science", research3.costScience], ["Unlocks: Ores/Metals"]);

	document.getElementById("tooltipResearch4").innerHTML = tt_gen_shiny(["Learn how to grow plants. TBA", "Science", research4.costScience], ["Unlocks: Growing Plants"]);
	
	{
		
		//Research Station
		if (materials.stone >= campsiteResearch1.costStone * 0.3 || buildings.research1 > 0) {
			document.getElementById("campsiteResearch1").removeAttribute("hidden");
		}
		//Research Station

		//Wooden Pickaxe
		if (materials.wood >= toolstation1.costWood * 0.3) {
			if (ts_check["1"] != true) {
				document.getElementById("toolstation1").removeAttribute("hidden");
			}
		}
		
		if (ts_check["1"] == true) {
			document.getElementById("harvestStone").removeAttribute("hidden");
			document.getElementById("stoneDisplay").removeAttribute("hidden");
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
			woodmult *= toolstation5.mult;
		}
		//Copper Axe
		
		//Copper Pickaxe
		if (materials.copperingot >= toolstation6.costCopper * 0.3) {
			if (ts_check["6"] != true) {
				document.getElementById("toolstation6").removeAttribute("hidden");
			}
		}

		if (ts_check["6"] == true) {
			stonemult *= toolstation6.mult;
		}
		//Copper Pickaxe
		
		//Copper Instruments
		if (materials.copperingot >= toolstation7.costCopper * 0.3) {
			if (ts_check["7"] != true) {
				document.getElementById("toolstation7").removeAttribute("hidden");
			}
		}

		if (ts_check["7"] == true) {
			sciencemult *= toolstation7.mult;
		}
		//Copper Instruments
		
		//Copper Sights
		if (materials.copperingot >= toolstation8.costCopper * 0.3) {
			if (ts_check["8"] != true) {
				document.getElementById("toolstation8").removeAttribute("hidden");
			}
		}

		if (ts_check["8"] == true) {
			explorationmult *= toolstation8.mult;
		}
		//Copper Sights
		
		if(buildings["research1"] > 0) {
			document.getElementById("harvestScience").removeAttribute("hidden");
			document.getElementById("scienceDisplay").removeAttribute("hidden");
		}

		//Fire
		if (materials.science >= 1) {
			if (rs_check["1"] != true) {
				document.getElementById("research1").removeAttribute("hidden");
			}
		}
		
		if (rs_check["1"] == true) {
			document.getElementById("research1").setAttribute("hidden", true);
			document.getElementById("research2").removeAttribute("hidden");
			document.getElementById("research3").removeAttribute("hidden");
			document.getElementById("research4").removeAttribute("hidden");
		}
		//Fire

		if (rs_check["2"] != true) {
			document.getElementById("naviExploration").style.display = "none";
		}
		
		if (rs_check["2"] == true) {
			document.getElementById("research2").setAttribute("hidden", true);
			document.getElementById("naviExploration").style.display = "block";
			document.getElementById("manpowerDisplay").removeAttribute("hidden");
			document.getElementById("harvestManpower").removeAttribute("hidden");
			document.getElementById("sandDisplay").removeAttribute("hidden");
			document.getElementById("clayDisplay").removeAttribute("hidden");
		}
		
		

		//Coast
		if (materials.exploredarea >= exploration.coast) {
			document.getElementById("EnaviCoast").style.display = "block";
		}
		//Coast
		
		if (rs_check["3"] == true) {
			document.getElementById("research3").setAttribute("hidden", true);
			document.getElementById("copperDisplay").removeAttribute("hidden");
			document.getElementById("tinDisplay").removeAttribute("hidden");
			document.getElementById("zincDisplay").removeAttribute("hidden");
			document.getElementById("harvestOres").removeAttribute("hidden");
			document.getElementById("smeltCopper").removeAttribute("hidden");
		}
		

	} {
		document.getElementById("tooltipHarvestWood").innerHTML = tt_gen_alt(["Wood in Queue", woodQueue, "Wood Time", woodTime, "Wood Queue Max", woodQueueMax, "Wood Time Max", woodTimeMax]);
		document.getElementById("tooltipHarvestStone").innerHTML = tt_gen_alt(["Stone in Queue", stoneQueue, "Stone Time", stoneTime, "Stone Queue Max", stoneQueueMax, "Stone Time Max", stoneTimeMax]);
		document.getElementById("tooltipHarvestScience").innerHTML = tt_gen_alt(["Science in Queue", scienceQueue, "Science Time", scienceTime, "Science Queue Max", scienceQueueMax, "Science Time Max", scienceTimeMax]);
		document.getElementById("tooltipHarvestOres").innerHTML = tt_gen_alt(["Stone Cost", geology.costStone, "Productivity", geology.rolls, "Copper Chance", geology.chanceCopper, "Tin Chance", geology.chanceTin, "Zinc Chance", geology.chanceZinc]);
		document.getElementById("tooltipExplore").innerHTML = tt_gen_alt(["Explored Area", materials.exploredarea.toFixed(3), "Productivity", explorationmult]);
		document.getElementById("tooltipHarvestManpower").innerHTML = tt_gen_alt(["Manpower Time", manpowerTime, "Manpower Time Max", manpowerTimeMax]);
		document.getElementById("tooltipHarvestSand").innerHTML = tt_gen_alt(["Sand in Queue", sandQueue, "Sand Time", sandTime, "Sand Queue Max", sandQueueMax, "Sand Time Max", sandTimeMax, "Clay Chance", sandClay * 100]);
	}


	{
		if (woodQueue > 0) {
			if (woodQueue > woodQueueMax) {
				woodQueue = woodQueueMax;
			}
			woodTime++;
			if (woodTime >= woodTimeMax) {

				woodTime = 0;
				materials.woodraw += woodmult;
				woodQueue--;
			}
		}
		woodTimeMax = 15;
		woodQueueMax = 5;
		woodmult = 1;

		if (stoneQueue > 0) {
			if (stoneQueue > stoneQueueMax) {
				stoneQueue = stoneQueueMax;
			}
			stoneTime++;
			if (stoneTime >= stoneTimeMax) {
				stoneTime = 0;
				materials.stone += stonemult;
				if (rs_check["3"] == 1) {
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
		stonemult = 1;

		if (scienceQueue > 0) {
			if (scienceQueue > scienceQueueMax) {
				scienceQueue = scienceQueueMax;
			}
			scienceTime++;
			if (scienceTime >= scienceTimeMax) {
				scienceTime = 0;
				var scienceprodtemp = (Math.random() * (3 * (buildings["research1"] * ((campsiteResearch1.bonus / 100) + 1))));
				scienceprodtemp *= sciencemult;
				materials.science += scienceprodtemp;
				scienceQueue--;
			}
		}
		scienceTimeMax = 25;
		scienceQueueMax = 3;
		sciencemult = 1;

		if (materials.stone >= geology.costStone) {
			if (oresQueue > 0) {
				for (i = 0; i < geology.rolls; i++) {
					var geocopper = Math.random();
					if (geocopper <= (geology.chanceCopper / 100)) {
						materials.copperore++;
					}
					var geotin = Math.random();
					if (geotin <= (geology.chanceTin / 100)) {
						materials.tinore++;
					}
					var geozinc = Math.random();
					if (geozinc <= (geology.chanceZinc / 100)) {
						materials.zincore++;
					}
				}
				oresQueue--
				materials.stone -= geology.costStone;
			}
		}
		
		if (rs_check["2"] == true) {
			manpowerTime++;
			if (manpowerTime >= manpowerTimeMax) {
				materials.manpower++;
				manpowerTime = 0;
			}
		}
		
		if(explorationQueue > 0) {
			materials.exploredarea += (materials.manpower * explorationmult);
			materials.manpower = 0;
			explorationQueue--
		}
		
		manpowerTimeMax = 100;
		explorationmult = 1;

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
