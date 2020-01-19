var tickspeed = 5; //should be 5 in release ver

var woodTime = 0;
var woodQueue = 0;
var woodTimeMax = 15;
var woodQueueMax = 10;
var woodmult = 1;
var stoneTime = 0;
var stoneQueue = 0;
var stoneTimeMax = 15;
var stoneQueueMax = 10;
var stonemult = 1;
var scienceTime = 0;
var scienceQueue = 0;
var scienceTimeMax = 25;
var scienceQueueMax = 5;
var sciencemult = 0;
var oresQueue = 0;
var manpowerTime = 0;
var manpowerTimeMax = 100;
var explorationQueue = 0;
var explorationmult = 1;
var sandTime = 0;
var sandQueue = 0;
var sandTimeMax = 10;
var sandQueueMax = 2;
var sandClay = 0.65;

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
	clay: 0,
	clayE: 0,
	sand: 0,
	sandE: 0,
	glass: 0,
	bronze: 0,
	brass: 0,
	ironore: 0,
	ironingot: 0,
	coal: 0
}
var storage = {
	woodraw: 50,
	woodcut: 0,
	stone: 50,
	science: 0,
	manpower: -1,
	exploredarea: -1,
	copperore: 50,
	copperingot: 10,
	tinore: 50,
	tiningot: 10,
	zincore: 50,
	clay: 99,
	clayE: 99,
	sand: 99,
	sandE: 99,
	glass: 99,
	bronze: 0,
	brass: 0,
	ironore: 0,
	ironingot: 0,
	coal: -1
}

var EnaviData = 0;
var naviSmelter = 0;

var configSmelter = {
	apply: true,
	active: 0,
	fuelmode: "wood",
	copper: 0,
	tin: 0,
	zinc: 0,
	sand: 0,
	bronze: 0,
	brass: 0
}

var ts_check = {
	1: false,
	2: false,
	3: false,
	4: false,
	5: false,
	6: false,
	7: false,
	8: false,
	9: false,
	10: false
}

//wood pickaxe
var toolstation1 = {
	cost: [30],
	material: ["wood"],
	attributes: [],
	id: "1"
};

//wood axe
var toolstation2 = {
	cost: [10],
	material: ["wood"],
	attributes: [3, 5], //time mod, queue mod
	id: "2"
};

//stone pickaxe
var toolstation3 = {
	cost: [15, 30],
	material: ["stone", "wood"],
	attributes: [4, 8], //time mod, queue mod
	id: "3",
};

//stone axe
var toolstation4 = {
	cost: [30, 15],
	material: ["stone", "wood"],
	attributes: [2, 5], //time mod, queue mod
	id: "4",
};

//copper axe
var toolstation5 = {
	cost: [5, 25],
	material: ["copperingot", "wood"],
	attributes: [1.25], //multiplier
	id: "5",
};

//copper pickaxe
var toolstation6 = {
	cost: [5, 25],
	material: ["copperingot", "wood"],
	attributes: [1.25], //multiplier
	id: "6",
};

//copper instruments
var toolstation7 = {
	cost: [5],
	material: ["copperingot"],
	attributes: [1.25], //multiplier
	id: "7",
};

//copper optics
var toolstation8 = {
	cost: [5, 25],
	material: ["copperingot", "glass"],
	attributes: [1.2], //multiplier
	id: "8",
};

//bronze pickaxe
var toolstation9 = {
	cost: [5, 75],
	material: ["bronze", "wood"],
	attributes: [5], //modifier
	id: "9",
};

//coal smelters
var toolstation10 = {
	cost: [30, 90, 10],
	material: ["coal", "wood", "ironore"],
	attributes: [], //modifier
	id: "10",
};



var buildings = {
	storage1: 0,
	storage2: 0,
	research1: 0,
	smelter: 0,
	farm: 0,
	mine: 0
}

//crate
var campsiteStorage1 = {
	cost: [35, 35],
	material: ["wood", "stone"],
	call: "storage1",
	ratio: [1.25],
	attributes: [50, 50, 20, 20, 20], //storage caps
	attributes2: ["woodraw", "stone", "copperore", "tinore", "zincore"],
	classifications: ["storage", "storage", "storage", "storage", "storage"]
};

var campsiteStorage2 = {
	cost: [80, 80],
	material: ["wood", "stone"],
	call: "storage2",
	ratio: [1.25],
	attributes: [75, 75, 30, 30, 30, 10, 10], //storage caps
	attributes2: ["woodraw", "stone", "copperore", "tinore", "zincore", "copperingot", "tiningot"],
	classifications: ["storage", "storage", "storage", "storage", "storage", "storage", "storage"]
};

//research station
var campsiteResearch1 = {
	cost: [45, 35],
	material: ["wood", "stone"],
	call: "research1",
	attributes: [10, 30], //bonus, science storage
	ratio: [1.15],
	classifications: []
};

//smelter
var campsiteSmelter = {
	cost: [30, 5],
	material: ["stone", "copperingot"],
	call: "smelter",
	ratio: [1.15],
	attributes: [],
	classifications: []
};

var campsiteFarm = {
	cost: [50, 15, 5],
	material: ["wood", "glass", "tiningot"],
	call: "farm",
	ratio: [1.15],
	attributes: [0.06], //production
	classifications: ["production"]
};

var campsiteMine = {
	cost: [30, 15, 5],
	material: ["stone", "wood", "tiningot"],
	call: "mine",
	ratio: [1.15],
	attributes: [0.06], //production
	classifications: ["production"]
};

var rs_check = {
	1: false,
	2: false,
	3: false,
	4: false,
	5: false,
	6: false,
	7: false,
	8: false
}

//fire
var research1 = {
	cost: [10],
	material: ["science"],
	attributes: [],
	id: "1"
};

//exploration
var research2 = {
	cost: [20],
	material: ["science"],
	attributes: [""],
	id: "2"
};

var exploration = {
	coast: 10
}

var caravan1 = {
	costManpower: 10,
	time: 100,
	limitSand: 50,
	limitClay: 50
};

//geology
var research3 = {
	cost: [40],
	material: ["science"],
	attributes: [""],
	id: "3"
};

var geology = {
	costStone: 50,
	rolls: 50,
	chanceCopper: 45,
	chanceTin: 25,
	chanceZinc: 20,
	chanceCoal: 35,
	chanceIron: 20
};

//agriculture
var research4 = {
	cost: [150],
	material: ["science"],
	attributes: [""],
	id: "4"
};

//mining
var research5 = {
	cost: [150],
	material: ["science"],
	attributes: [""],
	id: "5"
};

//metallurgy
var research6 = {
	cost: [100],
	material: ["science"],
	attributes: [""],
	id: "6"
};
var metallurgy = {
	copper: {
		cost: [0.015, 0.02],
		material: ["copperore", "fuel"],
		outputs: ["copperingot"],
		outputamount: [0.003]
	},
	tin: {
		cost: [0.01, 0.03],
		material: ["tinore", "fuel"],
		outputs: ["tiningot"],
		outputamount: [0.0015]
	},
	sand: {
		cost: [0.05, 0.025],
		material: ["sand", "fuel"],
		outputs: ["glass"],
		outputamount: [0.025]
	},
	bronze: {
		cost: [0.01875, 0.00625, 0.04],
		material: ["copperingot", "tiningot", "fuel"],
		outputs: ["bronze"],
		outputamount: [0.025]
	},
	brass: {
		cost: [0.015, 0.001, 0.04],
		material: ["copperingot", "zincore", "fuel"],
		outputs: ["bronze"],
		outputamount: [0.025]
	},
	globalnames: ["copper", "tin", "sand", "bronze", "brass"]
}
var smelterFuelTypes = {
	wood: {
		bonus: 1,
		speed: 1
	},
	coal: {
		bonus: 4,
		speed: 1
	}
}

//organization
var research7 = {
	cost: [100],
	material: ["science"],
	attributes: [""],
	id: "7"
};

//alloys
var research8 = {
	cost: [200, 15, 10, 20],
	material: ["science", "copperingot", "tiningot", "zincore"],
	attributes: [""],
	id: "8"
};

document.getElementById("explorationzone").setAttribute("hidden", true);
document.getElementById("coastEzone").setAttribute("hidden", true);
document.getElementById("naviExploration").setAttribute("hidden", true);

if(localStorage.resetState != "yes") {
	loadGame();
}
localStorage.resetState = "no";
saveGame();

function resetGame() {
	var rst = confirm("Are you sure you want to reset?");
	if(rst == true) {
		localStorage.resetState = "yes";
		location.reload();
	}
}

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
function clickNaviMain(zone, id) {
	var temp1 = document.getElementsByClassName("navbarMain");
	for(asd = 0; asd < temp1.length; asd++) {
		temp1[asd].setAttribute("style", "background-color:lightgrey");
	}
	id.setAttribute("style", "background-color:silver");
	temp1 = document.getElementsByClassName("zone");
	for(asd = 0; asd < temp1.length; asd++) {
		temp1[asd].setAttribute("hidden", true);
	}
	document.getElementById(zone).removeAttribute("hidden");
}
//Navi Campsite

//Navi Smelter
function clickNaviSmelter() {
	if(naviSmelter == 0) {
		naviSmelter = 1;
	} else if(naviSmelter == 1){
		naviSmelter = 0;
	}
}
//Navi Smelter

//ENavi Coast
function clickEnaviCoast() {
	EnaviData = 0;
	document.getElementsByClassName("activeE")[0].removeAttribute("class");
	document.getElementById("coastEzone").removeAttribute("hidden");
}
//ENavi Coast

//Building Generic
function clickCounter(name) {
	var materialCheck = 0;
	for(i = 0; i < name.cost.length; i++) {
		if(materials[name.material[i]] < name.cost[i] * Math.pow(name.ratio, buildings[name.call])) {
			materialCheck++;
		}
	}
	if(materialCheck == 0) {
		spendResources2(name);
		buildings[name.call]++;
	}
}

//Check Generic
function clickCheck(name, type) {
	var materialCheck = 0;
	for(i = 0; i < name.cost.length; i++) {
		if(materials[name.material[i]] < name.cost[i]) {
			materialCheck++;
		}
	}
	if(materialCheck == 0) {
		spendResources(name);
		type[name.id] = true;
	}
}

function spendResources(name) {
	for(p = 0; p < name.material.length; p++) {
		if(name.material[p] == "wood") {
			spendWood(name.cost[p]);
		} else {
			materials[name.material[p]] -= name.cost[p];
		}
	}
}

function spendResources2(name) {
	for(p = 0; p < name.material.length; p++) {
		if(name.material[p] == "wood") {
			spendWood(name.cost[p] * Math.pow(name.ratio, buildings[name.call]));
		} else {
			materials[name.material[p]] -= name.cost[p] * Math.pow(name.ratio, buildings[name.call]);
		}
	}
}

function spendResources3(name) {
	for(p = 0; p < name.material.length; p++) {
		if(name.material[p] == "fuel") {
			switch(configSmelter.fuelmode) {
				case "wood":
					spendWood(name.cost[p] * configSmelter[metallurgy.globalnames[s]] * smelterFuelTypes[configSmelter.fuelmode].speed);
					break;
				case "coal":
					materials.coal -= name.cost[p] * configSmelter[metallurgy.globalnames[s]] / smelterFuelTypes.coal.bonus * smelterFuelTypes[configSmelter.fuelmode].speed;
					break;
				default: 
					spendWood(name.cost[p] * configSmelter[metallurgy.globalnames[s]] * smelterFuelTypes[configSmelter.fuelmode].speed);
					break;
			}
			
		} else if(name.material[p] == "wood") {
			spendWood(name.cost[p] * configSmelter[metallurgy.globalnames[s]] * smelterFuelTypes[configSmelter.fuelmode].speed);
		} else {
			materials[name.material[p]] -= name.cost[p] * configSmelter[metallurgy.globalnames[s]] * smelterFuelTypes[configSmelter.fuelmode].speed;
		}
	}
	for(p = 0; p < name.outputs.length; p++) {
		materials[name.outputs[p]] += name.outputamount[p] * configSmelter[metallurgy.globalnames[s]];
	}
}



function clickSmelterMode() {
	if(configSmelter.apply == true) {
		configSmelter.apply = false;
	} else {
		configSmelter.apply = true;
	}
}

function clickSmelter(id) {
	if(configSmelter.apply == true && configSmelter.active > 0) {
		configSmelter[id]++;
		configSmelter.active--;
	} 
	if(configSmelter.apply == false && configSmelter[id] > 0) {
		configSmelter[id]--;
		configSmelter.active++;
	}
}

function smelterFuelMode(type, id) {
	configSmelter.fuelmode = type;
	var temp1 = document.getElementsByClassName("navbarFuel");
	for(asd = 0; asd < temp1.length; asd++) {
		temp1[asd].setAttribute("style", "background-color:lightgrey");
	}
	id.setAttribute("style", "background-color:silver");
}

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


setInterval(timer, 1000/tickspeed);

function saveGame() {
	localStorage.saveMaterials = JSON.stringify(materials);
	localStorage.saveTS_Check = JSON.stringify(ts_check);
	localStorage.saveRS_Check = JSON.stringify(rs_check);
	localStorage.saveBuildings = JSON.stringify(buildings);
	console.log("Save Complete!");
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


}

function clickExplore() {
	explorationQueue++;
}


function timer() {
	saveGame();
	
	configSmelter.active = buildings.smelter;
	for(s = 0; s < metallurgy.globalnames.length; s++) {
		configSmelter.active -= configSmelter[metallurgy.globalnames[s]];
	}

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
	
	function tt_gen_smelter(data) {
		var output = "<span class='forceright'> ";
		output += "<b><u>Input</u></b>";
		for(i = 0; i < Math.floor(data.material.length); i++) {
			output += "</span> <br> <span class='forceleft'>";
			output += materialNames[data.material[i]];
			output += "</span> <span class='forceright'>";
			if(data.material[i] == "fuel") {
				output += data.cost[i] * tickspeed / smelterFuelTypes[configSmelter.fuelmode].bonus * smelterFuelTypes[configSmelter.fuelmode].speed;
			} else {
				output += data.cost[i] * tickspeed * smelterFuelTypes[configSmelter.fuelmode].speed;
			}
			output += "/sec";
		}
		output += "</span>";
		output += "<br><hr><span class='forceright'><b><u>Output</u></b>";
		for(i = 0; i < Math.floor(data.outputs.length); i++) {
			output += "</span> <br> <span class='forceleft'>";
			output += materialNames[data.outputs[i]];
			output += "</span> <span class='forceright'>";
			output += data.outputamount[i] * tickspeed * smelterFuelTypes[configSmelter.fuelmode].speed;
			output += "/sec";
		}
		return output;
	}
	
	function tt_gen_shiny2(data, call) {
		var output = "";
		output += universalStrings[call].blurb;
		output += "<hr> <span class='forceleft'>"
		output += materialNames[data.material[0]]
		for(i = 1; i < Math.floor(data.material.length * 2); i++) {
			if (i % 2 == 0) {
				output += "</span> <br> <span class='forceleft'>";
				output += materialNames[data.material[Math.floor(i / 2)]];
			} else {
				output += "</span> <span class='forceright'>";
				output += data.cost[Math.floor(i / 2)];
			}
		}
		output += "</span> <br><hr> <span class='attribute'>";
		for(i = 0; i < data.attributes.length; i++) {
			output += universalStrings[call].attributes[i];
			output += data.attributes[i];
			output += universalStrings[call].attributes2[i];
			output += "</span> <br> <span class='attribute'>"
		}
		output += "</span>"
		return output;
	}
	
	function tt_gen_shiny3(data, callSign) {
		var output = "";
		output += universalStrings[callSign].blurb;
		output += "<hr> <span class='forceleft'>"
		output += materialNames[data.material[0]]
		for(i = 1; i < Math.floor(data.material.length * 2); i++) {
			if (i % 2 == 0) {
				output += "</span> <br> <span class='forceleft'>";
				output += materialNames[data.material[Math.floor(i / 2)]];
			} else {
				output += "</span> <span class='forceright'>";
				output += Number((data.cost[Math.floor(i / 2)] * Math.pow(data.ratio, buildings[data.call])).toFixed(3));
			}
		}
		output += "</span> <br><hr> <span class='attribute'>";
		for(i = 0; i < data.attributes.length; i++) {
			if(data.classifications[i] == "storage") {
				output += materialNames[data.attributes2[i]];
				output += " Storage: +"
				output += data.attributes[i];
				output += "</span> <br> <span class='attribute'>";
			} else {
				output += universalStrings[callSign].attributes[i];
				if(data.classifications[i] == "production") {
					output += data.attributes[i] * tickspeed;
				} else {
					output += data.attributes[i];
				}
				output += universalStrings[callSign].attributes2[i];
				output += "</span> <br> <span class='attribute'>";
			}
		}
		output += "</span>"
		return output;
	}
	
	//"tooltipToolstation2")= tt_gen_shiny(["Harvest wood faster.", "Wood", toolstation2.costWood], ["Wood Time Max: -" + toolstation2.timeMod, "Wood Queue Max: +" + toolstation2.queueMod]);
	
	materials.wood = materials.woodraw + materials.woodcut;
	document.getElementById("woodDisplay").innerHTML = "Wood: " + Number(materials.wood.toFixed(3)) + tt_gen(["Timber", Number(materials.woodraw.toFixed(3)) + "/" + storage.woodraw, "Lumber", Number(materials.woodcut.toFixed(3))]);
	document.getElementById("stoneDisplay").innerHTML = "Stone: " + Number(materials.stone.toFixed(3)) + "/" + storage.stone;
	document.getElementById("scienceDisplay").innerHTML = "Science: " + Number(materials.science.toFixed(3)) + "/" + storage.science;
	document.getElementById("copperDisplay").innerHTML = "Copper: " + Number(materials.copperingot.toFixed(3)) + tt_gen(["Copper Ingots", Number(materials.copperingot.toFixed(3)) + "/" + storage.copperingot, "Copper Ore", Number(materials.copperore.toFixed(3)) + "/" + storage.copperore]);
	document.getElementById("tinDisplay").innerHTML = "Tin: " + Number(materials.tiningot.toFixed(3)) + tt_gen(["Tin Ingots", Number(materials.tiningot.toFixed(3)) + "/" + storage.tiningot, "Tin Ore", Number(materials.tinore.toFixed(3)) + "/" + storage.tinore]);
	document.getElementById("zincDisplay").innerHTML = "Zinc: " + Number(materials.zincore.toFixed(3));
	document.getElementById("manpowerDisplay").innerHTML = "Manpower: " + Number(materials.manpower.toFixed(3));
	document.getElementById("sandDisplayE").innerHTML = "Sand: " + Number(materials.sandE.toFixed(3));
	document.getElementById("clayDisplayE").innerHTML = "Clay: " + Number(materials.clayE.toFixed(3));
	document.getElementById("sandDisplay").innerHTML = "Sand: " + Number(materials.sand.toFixed(3)) + tt_gen(["Glass", Number(materials.glass.toFixed(3))]);
	document.getElementById("clayDisplay").innerHTML = "Clay: " + Number(materials.clay.toFixed(3));
	document.getElementById("ironDisplay").innerHTML = "Iron: " + Number(materials.ironingot.toFixed(3)) + tt_gen(["Iron Ingots", Number(materials.ironingot.toFixed(3)), "Iron Ore", Number(materials.ironore.toFixed(3))]);
	document.getElementById("coalDisplay").innerHTML = "Coal: " + Number(materials.coal.toFixed(3));
	document.getElementById("bronzeDisplay").innerHTML = "Bronze: " + Number(materials.bronze.toFixed(3));
	document.getElementById("brassDisplay").innerHTML = "Brass: " + Number(materials.brass.toFixed(3));
	var score = ((materials.ironore / 2) + (materials.coal / 4)) * ((materials.bronze + materials.brass) / 3) * (materials.exploredarea / 4);
	document.getElementById("diagnostic").innerHTML = "Score: " + Number(score.toFixed(3));
	document.getElementById("tooltipCaravanCoast").innerHTML = tt_gen_alt(["Manpower", caravan1.costManpower, "Time", caravan1.time, "Sand Capacity", caravan1.limitSand, "Clay Capacity", caravan1.limitClay]);

	
	if (naviSmelter == 1) {
		document.getElementById("naviSmelter").setAttribute("class", "active");
		document.getElementById("smelterzone").removeAttribute("hidden");
	}
	if (naviSmelter == 0) {
		document.getElementById("naviSmelter").removeAttribute("class");
		document.getElementById("smelterzone").setAttribute("hidden", true);
	
	}
	if (EnaviData == 0) {
		document.getElementById("EnaviCoast").setAttribute("class", "activeE");
	}

	document.getElementById("tooltipSmeltCopper").innerHTML = "<span class='forceleft'> Copper Ore Cost: </span> <span class='forceright'>" + "10" + "</span> <br> <span class='forceleft' > Clay Cost: </span> <span class='forceright'>" + "10" + "</span>";

	document.getElementById("campsiteStorage1").innerHTML = "Storage Crate (" + buildings.storage1 + ")";
	document.getElementById("campsiteStorage2").innerHTML = "Storehouse (" + buildings.storage2 + ")";
	document.getElementById("tooltipCampsiteStorage1").innerHTML = tt_gen_shiny3(campsiteStorage1, "campsiteStorage1");
	document.getElementById("tooltipCampsiteStorage2").innerHTML = tt_gen_shiny3(campsiteStorage2, "campsiteStorage2");
	
	document.getElementById("campsiteFarm").innerHTML = "Agri Plot (" + buildings.farm + ")";
	document.getElementById("tooltipCampsiteFarm").innerHTML = tt_gen_shiny3(campsiteFarm, "campsiteFarm");
	
	document.getElementById("campsiteMine").innerHTML = "Mine (" + buildings.mine + ")";
	document.getElementById("tooltipCampsiteMine").innerHTML = tt_gen_shiny3(campsiteMine, "campsiteMine");
	
	document.getElementById("campsiteResearch1").innerHTML = "Research Station (" + buildings.research1 + ")";

	document.getElementById("tooltipCampsiteResearch1").innerHTML = tt_gen_shiny3(campsiteResearch1, "campsiteResearch1");
	
	document.getElementById("campsiteSmelter").innerHTML = "Smelter (" + buildings.smelter + ")";
	
	if(configSmelter.apply == false) {
		document.getElementById("smelterMode").innerHTML = "Mode: Remove";
	} else {
		document.getElementById("smelterMode").innerHTML = "Mode: Apply";
	}
	
	document.getElementById("smelterCopper").innerHTML = "Copper (" + configSmelter.copper + ")";
	document.getElementById("tooltipsmelterCopper").innerHTML = tt_gen_smelter(metallurgy.copper);
	
	document.getElementById("smelterTin").innerHTML = "Tin (" + configSmelter.tin + ")";
	document.getElementById("tooltipsmelterTin").innerHTML = tt_gen_smelter(metallurgy.tin);
	
	document.getElementById("smelterSand").innerHTML = "Glass (" + configSmelter.sand + ")";
	document.getElementById("tooltipsmelterSand").innerHTML = tt_gen_smelter(metallurgy.sand);
	
	document.getElementById("smelterBronze").innerHTML = "Bronze (" + configSmelter.bronze + ")";
	document.getElementById("tooltipsmelterBronze").innerHTML = tt_gen_smelter(metallurgy.bronze);
	
	document.getElementById("smelterBrass").innerHTML = "Brass (" + configSmelter.brass + ")";
	document.getElementById("tooltipsmelterBrass").innerHTML = tt_gen_smelter(metallurgy.brass);
	
	for(s = 0; s < metallurgy.globalnames.length; s++) {
		var materialCheck = 0;
		for(t = 0; t < metallurgy[metallurgy.globalnames[s]].cost.length; t++) {
			if(materials[metallurgy[metallurgy.globalnames[s]].material[t]] < metallurgy[metallurgy.globalnames[s]].cost[t] * configSmelter[metallurgy.globalnames[s]]) {
				materialCheck++;
			}
		}
		if(materialCheck == 0) {
			spendResources3(metallurgy[metallurgy.globalnames[s]]);
		}
	}
	
	document.getElementById("tooltipCampsiteSmelter").innerHTML = tt_gen_shiny3(campsiteSmelter, "campsiteSmelter");

	document.getElementById("tooltipToolstation1").innerHTML = tt_gen_shiny2(toolstation1, "toolstation1");

	document.getElementById("tooltipToolstation2").innerHTML = tt_gen_shiny2(toolstation2, "toolstation2");

	document.getElementById("tooltipToolstation3").innerHTML = tt_gen_shiny2(toolstation3, "toolstation3");

	document.getElementById("tooltipToolstation4").innerHTML = tt_gen_shiny2(toolstation4, "toolstation4");

	document.getElementById("tooltipToolstation5").innerHTML = tt_gen_shiny2(toolstation5, "toolstation5");

	document.getElementById("tooltipToolstation6").innerHTML = tt_gen_shiny2(toolstation6, "toolstation6");
	
	document.getElementById("tooltipToolstation7").innerHTML = tt_gen_shiny2(toolstation7, "toolstation7");
	
	document.getElementById("tooltipToolstation8").innerHTML = tt_gen_shiny2(toolstation8, "toolstation8");
	
	document.getElementById("tooltipToolstation9").innerHTML = tt_gen_shiny2(toolstation9, "toolstation9");
	
	document.getElementById("tooltipToolstation10").innerHTML = tt_gen_shiny2(toolstation10, "toolstation10");

	document.getElementById("tooltipResearch1").innerHTML = tt_gen_shiny2(research1, "research1");

	document.getElementById("tooltipResearch2").innerHTML = tt_gen_shiny2(research2, "research2");

	document.getElementById("tooltipResearch3").innerHTML = tt_gen_shiny2(research3, "research3");

	document.getElementById("tooltipResearch4").innerHTML = tt_gen_shiny2(research4, "research4");
	
	document.getElementById("tooltipResearch5").innerHTML = tt_gen_shiny2(research5, "research5");
	
	document.getElementById("tooltipResearch6").innerHTML = tt_gen_shiny2(research6, "research6");
	
	document.getElementById("tooltipResearch7").innerHTML = tt_gen_shiny2(research7, "research7");
	
	document.getElementById("tooltipResearch8").innerHTML = tt_gen_shiny2(research8, "research8");
	
	storage = {
	woodraw: 50,
	woodcut: 0,
	stone: 50,
	science: 0,
	manpower: -1,
	exploredarea: -1,
	copperore: 50,
	copperingot: 10,
	tinore: 50,
	tiningot: 10,
	zincore: 50,
	clay: 99,
	clayE: 99,
	sand: 99,
	sandE: 99,
	glass: 99,
	bronze: 0,
	brass: 0,
	ironore: 0,
	ironingot: 0,
	coal: -1
}
	
	{
		//Crate
		if (materials[campsiteStorage1.material[0]] >= campsiteStorage1.cost[0] * 0.3 || buildings.storage1 > 0) {
			document.getElementById("campsiteStorage1").removeAttribute("hidden");
		}
		
		for(b = 0; b < campsiteStorage1.attributes2.length; b++) {
			storage[campsiteStorage1.attributes2[b]] += campsiteStorage1.attributes[b] * buildings.storage1;
		}
		
		//Crate
		
		//Storehouse
		if (materials[campsiteStorage2.material[0]] >= campsiteStorage2.cost[0] * 0.3 || buildings.storage2 > 0) {
			document.getElementById("campsiteStorage2").removeAttribute("hidden");
		}
		
		for(b = 0; b < campsiteStorage2.attributes2.length; b++) {
			storage[campsiteStorage2.attributes2[b]] += campsiteStorage2.attributes[b] * buildings.storage2;
		}
		
		//Storehouse
		
		//Research Station
		if (materials[campsiteResearch1.material[0]] >= campsiteResearch1.cost[0] * 0.3 || buildings.research1 > 0) {
			document.getElementById("campsiteResearch1").removeAttribute("hidden");
		} //note: directly modifies science queue mechanic
		storage.science += buildings.research1 * campsiteResearch1.attributes[1];
		//Research Station
		
		//Farm
		materials.woodraw += buildings.farm * campsiteFarm.attributes[0];
	
		//Farm
		
		//Mine
		materials.stone += buildings.mine * campsiteMine.attributes[0];
		//Mine

		//Wooden Pickaxe
		if (materials[toolstation1.material[0]] >= toolstation1.cost[0] * 0.3) {
			if (ts_check["1"] != true) {
				document.getElementById("toolstation1").removeAttribute("hidden");
			}
		}
		
		if (ts_check["1"] == true) {
			document.getElementById("harvestStone").removeAttribute("hidden");
			document.getElementById("stoneDisplay").removeAttribute("hidden");
			document.getElementById("toolstation1").parentElement.setAttribute("hidden", true);
			document.getElementById("toolstation1").setAttribute("hidden", true);
		}
		//Wooden Pickaxe

		//Wooden Axe
		if (materials[toolstation2.material[0]] >= toolstation2.cost[0] * 0.3) {
			if (ts_check["2"] != true) {
				document.getElementById("toolstation2").removeAttribute("hidden");
			}
		}

		if (ts_check["2"] == true) {
			woodTimeMax = woodTimeMax - toolstation2.attributes[0];
			woodQueueMax = woodQueueMax + toolstation2.attributes[1];
			document.getElementById("toolstation2").parentElement.setAttribute("hidden", true);
			document.getElementById("toolstation2").setAttribute("hidden", true);
			
		}
		//Wooden Axe

		//Stone Pickaxe
		if (materials[toolstation3.material[0]] >= toolstation3.cost[0] * 0.3) {
			if (ts_check["3"] != true) {
				document.getElementById("toolstation3").removeAttribute("hidden");
			}
		}

		if (ts_check["3"] == true) {
			stoneTimeMax = stoneTimeMax - toolstation3.attributes[0];
			stoneQueueMax = stoneQueueMax + toolstation3.attributes[1];
			document.getElementById("toolstation3").parentElement.setAttribute("hidden", true);
			document.getElementById("toolstation3").setAttribute("hidden", true);
		}
		//Stone Pickaxe

		//Stone Axe
		if (materials[toolstation4.material[0]] >= toolstation4.cost[0] * 0.3) {
			if (ts_check["4"] != true) {
				document.getElementById("toolstation4").removeAttribute("hidden");
			}
		}

		if (ts_check["4"] == true) {
			woodTimeMax = woodTimeMax - toolstation4.attributes[0];
			woodQueueMax = woodQueueMax + toolstation4.attributes[1];
			document.getElementById("toolstation4").parentElement.setAttribute("hidden", true);
			document.getElementById("toolstation4").setAttribute("hidden", true);
		}
		//Stone Axe

		//Copper Axe
		if (materials[toolstation5.material[0]] >= toolstation5.cost[0] * 0.3) {
			if (ts_check["5"] != true) {
				document.getElementById("toolstation5").removeAttribute("hidden");
			}
		}

		if (ts_check["5"] == true) {
			woodmult *= toolstation5.attributes[0];
			document.getElementById("toolstation5").parentElement.setAttribute("hidden", true);
			document.getElementById("toolstation5").setAttribute("hidden", true);
		}
		//Copper Axe
		
		//Copper Pickaxe
		if (materials[toolstation6.material[0]] >= toolstation6.cost[0] * 0.3) {
			if (ts_check["6"] != true) {
				document.getElementById("toolstation6").removeAttribute("hidden");
			}
		}

		if (ts_check["6"] == true) {
			stonemult *= toolstation6.attributes[0];
			document.getElementById("toolstation6").parentElement.setAttribute("hidden", true);
			document.getElementById("toolstation6").setAttribute("hidden", true);
		}
		//Copper Pickaxe
		
		//Copper Instruments
		if (materials[toolstation7.material[0]] >= toolstation7.cost[0] * 0.3) {
			if (ts_check["7"] != true) {
				document.getElementById("toolstation7").removeAttribute("hidden");
			}
		}

		if (ts_check["7"] == true) {
			sciencemult *= toolstation7.attributes[0];
			document.getElementById("toolstation7").parentElement.setAttribute("hidden", true);
			document.getElementById("toolstation7").setAttribute("hidden", true);
		}
		//Copper Instruments
		
		//Copper Sights
		if (materials[toolstation8.material[0]] >= toolstation8.cost[0] * 0.3) {
			if (ts_check["8"] != true) {
				document.getElementById("toolstation8").removeAttribute("hidden");
			}
		}

		if (ts_check["8"] == true) {
			explorationmult *= toolstation8.attributes[0];
			document.getElementById("toolstation8").parentElement.setAttribute("hidden", true);
			document.getElementById("toolstation8").setAttribute("hidden", true);
		}
		//Copper Sights
		
		//Bronze Pickaxe
		if (materials[toolstation9.material[0]] >= toolstation9.cost[0] * 0.3) {
			if (ts_check["9"] != true) {
				document.getElementById("toolstation9").removeAttribute("hidden");
			}
		}
		
		if (ts_check["9"] == true) {
			document.getElementById("coalDisplay").removeAttribute("hidden");
			document.getElementById("ironDisplay").removeAttribute("hidden");
			document.getElementById("toolstation9").parentElement.setAttribute("hidden", true);
			document.getElementById("toolstation9").setAttribute("hidden", true);
			geology.chanceCopper += toolstation9.attributes[0];
		} //note: directly modifies oreHarvest tooltip
		//Bronze Pickaxe
		
		//Coal Smelters
		if (materials[toolstation10.material[0]] >= toolstation10.cost[0] * 0.3) {
			if (ts_check["10"] != true) {
				document.getElementById("toolstation10").removeAttribute("hidden");
			}
		}
		
		if (ts_check["10"] == true) {
			document.getElementById("smelterFuelMode").removeAttribute("hidden");
			document.getElementById("toolstation10").parentElement.setAttribute("hidden", true);
			document.getElementById("toolstation10").setAttribute("hidden", true);
		}
		//Coal Smelters
		
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
		
		//Geology
		if (rs_check["3"] == true) {
			document.getElementById("research3").setAttribute("hidden", true);
			document.getElementById("copperDisplay").removeAttribute("hidden");
			document.getElementById("tinDisplay").removeAttribute("hidden");
			document.getElementById("zincDisplay").removeAttribute("hidden");
			document.getElementById("harvestOres").removeAttribute("hidden");
			document.getElementById("smeltCopper").removeAttribute("hidden");
			document.getElementById("research7").removeAttribute("hidden");
			document.getElementById("research6").removeAttribute("hidden");
		}
		//Geology
		
		
		
		//Metallurgy
		if (rs_check["6"] != true) {
			document.getElementById("naviSmelter").style.display = "none";
		}
		
		if (rs_check["6"] == true) {
			document.getElementById("campsiteSmelter").removeAttribute("hidden");
			document.getElementById("naviSmelter").removeAttribute("hidden");
			document.getElementById("naviSmelter").style.display = "block";
			document.getElementById("research6").setAttribute("hidden", true);
			document.getElementById("research4").removeAttribute("hidden");
			document.getElementById("research5").removeAttribute("hidden");
			document.getElementById("research8").removeAttribute("hidden");
		}
		//Metallurgy
		
		//Organization
		if (rs_check["7"] != true) {
			document.getElementById("campsiteStorage2").setAttribute("hidden", true);
		}
		
		if (rs_check["7"] == true) {
			document.getElementById("research7").parentElement.setAttribute("hidden", true);
			document.getElementById("research7").setAttribute("hidden", true);
			document.getElementById("campsiteStorage2").removeAttribute("hidden");
		}
		//Organization
		
		//Agriculture
		if (rs_check["4"] != true) {
			document.getElementById("campsiteFarm").setAttribute("hidden", true);
		}
		
		if (rs_check["4"] == true) {
			//document.getElementById("research4").parentElement.setAttribute("hidden", true);
			document.getElementById("research4").setAttribute("hidden", true);
			document.getElementById("campsiteFarm").removeAttribute("hidden");
		}
		//Agriculture
		
		//Mining
		if (rs_check["5"] != true) {
			document.getElementById("campsiteMine").setAttribute("hidden", true);
		}
		
		if (rs_check["5"] == true) {
			//document.getElementById("research5").parentElement.setAttribute("hidden", true);
			document.getElementById("research5").setAttribute("hidden", true);
			document.getElementById("campsiteMine").removeAttribute("hidden");
		}
		//Mining
		
		//Alloys
		if (rs_check["8"] != true) {
			document.getElementById("smelterBronze").setAttribute("hidden", true);
			document.getElementById("smelterBrass").setAttribute("hidden", true);
			document.getElementById("bronzeDisplay").setAttribute("hidden", true);
			document.getElementById("brassDisplay").setAttribute("hidden", true);
		}
		
		if (rs_check["8"] == true) {
			//document.getElementById("research5").parentElement.setAttribute("hidden", true);
			document.getElementById("research8").setAttribute("hidden", true);
			document.getElementById("smelterBronze").removeAttribute("hidden");
			document.getElementById("smelterBrass").removeAttribute("hidden");
			document.getElementById("bronzeDisplay").removeAttribute("hidden");
			document.getElementById("brassDisplay").removeAttribute("hidden");
		}
		//Alloys
		
		Object.keys(storage).forEach(function(key) {
			if(materials[key] >= storage[key] && storage[key] >= 0) {
				materials[key] = storage[key];
			}
		})


	} 
	{
		document.getElementById("tooltipHarvestWood").innerHTML = tt_gen_alt(["Wood in Queue", woodQueue, "Wood Time", woodTime, "Wood Queue Max", woodQueueMax, "Wood Time Max", woodTimeMax]);
		document.getElementById("tooltipHarvestStone").innerHTML = tt_gen_alt(["Stone in Queue", stoneQueue, "Stone Time", stoneTime, "Stone Queue Max", stoneQueueMax, "Stone Time Max", stoneTimeMax]);
		document.getElementById("tooltipHarvestScience").innerHTML = tt_gen_alt(["Science in Queue", scienceQueue, "Science Time", scienceTime, "Science Queue Max", scienceQueueMax, "Science Time Max", scienceTimeMax]);
		document.getElementById("tooltipHarvestOres").innerHTML = tt_gen_alt(["Stone Cost", geology.costStone, "Productivity", geology.rolls, "Copper Chance", geology.chanceCopper, "Tin Chance", geology.chanceTin, "Zinc Chance", geology.chanceZinc]);
		if (ts_check["9"] == true) {
			document.getElementById("tooltipHarvestOres").innerHTML = tt_gen_alt(["Stone Cost", geology.costStone, "Productivity", geology.rolls, "Copper Chance", geology.chanceCopper, "Tin Chance", geology.chanceTin, "Zinc Chance", geology.chanceZinc, "Iron Chance", geology.chanceIron, "Coal Chance", geology.chanceCoal]);
		}
		document.getElementById("tooltipExplore").innerHTML = tt_gen_alt(["Explored Area", Number(materials.exploredarea.toFixed(3)), "Productivity", explorationmult]);
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

		if (stoneQueue > 0) {
			if (stoneQueue > stoneQueueMax) {
				stoneQueue = stoneQueueMax;
			}
			stoneTime++;
			if (stoneTime >= stoneTimeMax) {
				stoneTime = 0;
				materials.stone += stonemult;
				if (rs_check["3"] == true) {
					var natcopper = (Math.random());
					if (natcopper >= 0.95 && materials.copperingot < 5) {
						materials.copperingot++;
					}
				}
				stoneQueue--;
			}
		}

		if (scienceQueue > 0) {
			if (scienceQueue > scienceQueueMax) {
				scienceQueue = scienceQueueMax;
			}
			scienceTime++;
			if (scienceTime >= scienceTimeMax) {
				scienceTime = 0;
				var scienceprodtemp = (Math.random() * (4 * (buildings["research1"] * ((campsiteResearch1.attributes[1] / 100) + 1))));
				scienceprodtemp *= sciencemult;
				materials.science += scienceprodtemp;
				scienceQueue--;
			}
		}

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
					if (ts_check["9"] == true) {
						var geoiron = Math.random();
						if (geoiron <= (geology.chanceIron / 100)) {
							materials.ironore++;
						}
						var geocoal = Math.random();
						if (geocoal <= (geology.chanceCoal / 100)) {
							materials.coal++;
						}
					}
					}
				oresQueue--;
				materials.stone -= geology.costStone;
				}
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
			explorationQueue--;
		}

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
	
	{
		woodTimeMax = 15;
		woodQueueMax = 10;
		woodmult = 1;
		stoneTimeMax = 15;
		stoneQueueMax = 10;
		stonemult = 1;
		scienceTimeMax = 25;
		scienceQueueMax = 5;
		sciencemult = 1;
		manpowerTimeMax = 100;
		explorationmult = 1;
		sandTimeMax = 10;
		sandQueueMax = 2;
		sandClay = 0.65;
		

		
		geology = {
			costStone: 50,
			rolls: 50,
			chanceCopper: 45,
			chanceTin: 25,
			chanceZinc: 20,
			chanceCoal: 35,
			chanceIron: 20
		};
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
