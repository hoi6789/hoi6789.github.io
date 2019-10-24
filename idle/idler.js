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
	glass: 0,
	bronze: 0,
	brass: 0,
	ironore: 0,
	ironingot: 0,
	coal: 0
}

var naviData = 0;
var EnaviData = 0;
var naviSmelter = 0;

var configSmelter = {
	apply: true,
	active: 0,
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
	9: false
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
	queueMod: 5
};

//stone pickaxe
//check, costwood, coststone, time, queue
var toolstation3 = {
	costWood: 30,
	costStone: 15,
	timeMod: 4,
	queueMod: 8
};

//stone axe
//check, costwood, coststone, time, queue
var toolstation4 = {
	costWood: 15,
	costStone: 30,
	timeMod: 2,
	queueMod: 5
};

//copper axe
//check, costwood, costcopper, mult
var toolstation5 = {
	costWood: 25,
	costCopper: 5,
	mult: 1.25
};

//copper pickaxe
//check, costwood, costcopper, mult
var toolstation6 = {
	costWood: 25,
	costCopper: 5,
	mult: 1.25
};

//copper instruments
//check, costcopper, mult
var toolstation7 = {
	costCopper: 5,
	mult: 1.25
};

//copper optics
//check, costglass, costcopper, mult
var toolstation8 = {
	costGlass: 25,
	costCopper: 5,
	mult: 1.25
};

//bronze pickaxe
//check, costglass, costcopper, mult
var toolstation9 = {
	costWood: 75,
	costBronze: 15,
	add: 5
};

var woodTime = 0;
var woodQueue = 0;
var woodTimeMax = 15;
var woodQueueMax = 10;
var woodmult = 1;
var woodStorage = 50;
var stoneTime = 0;
var stoneQueue = 0;
var stoneTimeMax = 15;
var stoneQueueMax = 10;
var stonemult = 1;
var stoneStorage = 50;
var scienceTime = 0;
var scienceQueue = 0;
var scienceTimeMax = 25;
var scienceQueueMax = 5;
var sciencemult = 0;
var scienceStorage = 0;
var oresQueue = 0;
var manpowerTime = 0;
var manpowerTimeMax = 100;
var explorationQueue = 0;
var explorationmult = 1;
var sandTime = 0;
var sandQueue = 0;
var sandTimeMax = 20;
var sandQueueMax = 4;
var sandClay = 0.65;
var copperOreStorage = 50;
var tinOreStorage = 50;
var zincOreStorage = 50;
var copperIngotStorage = 10;
var tinIngotStorage = 10;
var zincIngotStorage = 10;

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
	costWood: 35,
	costStone: 35,
	storageWood: 50,
	storageStone: 50,
	storageCopperOre: 20,
	storageTinOre: 20,
	storageZincOre: 20
};

var campsiteStorage2 = {
	costWood: 80,
	costStone: 80,
	storageWood: 75,
	storageStone: 75,
	storageCopperOre: 30,
	storageTinOre: 30,
	storageZincOre: 30,
	storageCopperIngot: 10,
	storageTinIngot: 10,
	storageZincIngot: 5
};

//research station
var campsiteResearch1 = {
	costWood: 45,
	costStone: 35,
	storageScience: 30,
	bonus: 10
};

//smelter
var campsiteSmelter = {
	costStone: 30,
	costCopper: 5
};

var campsiteFarm = {
	costWood: 50,
	costTin: 5,
	costGlass: 15,
	production: 0.06
};

var campsiteMine = {
	costStone: 30,
	costTin: 5,
	costWood: 15,
	production: 0.06
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
	costScience: 10
};

//exploration
var research2 = {
	costScience: 20,
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
	costScience: 40
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
	costScience: 150
};

//mining
var research5 = {
	costScience: 150
};

//metallurgy
var research6 = {
	costScience: 100
};
var metallurgy = {
	copper: {
		costOre: 0.015,
		costWood: 0.02,
		output: 0.003
	},
	tin: {
		costOre: 0.01,
		costWood: 0.03,
		output: 0.0015
	},
	zinc: {
		costOre: 0.01,
		costWood: 0.03,
		output: 0.0015
	},
	sand: {
		costOre: 0.05,
		costWood: 0.025,
		output: 0.025
	},
	bronze: {
		costCopper: 0.01825,
		costTin: 0.00625,
		costWood: 0.04,
		output: 0.025
	},
	brass: {
		costCopper: 0.0175,
		costZinc: 0.0075,
		costWood: 0.04,
		output: 0.025
	}
}

//organization
var research7 = {
	costScience: 100
};

//alloys
var research8 = {
	costScience: 200,
	costCopper: 15,
	costTin: 10,
	costZinc: 10
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

//Crate
function clickCampsiteStorage1() {
	if (materials.wood >= campsiteStorage1.costWood * Math.pow(1.25, buildings["storage1"])) {
		if (materials.stone >= campsiteStorage1.costStone * Math.pow(1.25, buildings["storage1"])) {
			spendWood(campsiteStorage1.costWood * Math.pow(1.25, buildings["storage1"]));
			materials.stone -= campsiteStorage1.costStone * Math.pow(1.25, buildings["storage1"]);
			buildings["storage1"]++;
		}
	}
}

//Storehouse
function clickCampsiteStorage2() {
	if (materials.wood >= campsiteStorage2.costWood * Math.pow(1.25, buildings["storage2"])) {
		if (materials.stone >= campsiteStorage2.costStone * Math.pow(1.25, buildings["storage2"])) {
			spendWood(campsiteStorage2.costWood * Math.pow(1.25, buildings["storage2"]));
			materials.stone -= campsiteStorage2.costStone * Math.pow(1.25, buildings["storage2"]);
			buildings["storage2"]++;
		}
	}
}

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

//Smelter
function clickCampsiteSmelter() {
	if (materials.copperingot >= campsiteSmelter.costCopper * Math.pow(1.15, buildings["smelter"])) {
		if (materials.stone >= campsiteSmelter.costStone * Math.pow(1.15, buildings["smelter"])) {
			materials.copperingot -= campsiteSmelter.costCopper * Math.pow(1.15, buildings["smelter"]);
			materials.stone -= campsiteSmelter.costStone * Math.pow(1.15, buildings["smelter"]);
			buildings["smelter"]++;

		}
	}
}

//Agri Lab
function clickCampsiteFarm() {
	if (materials.tiningot >= campsiteFarm.costTin * Math.pow(1.15, buildings["farm"])) {
		if (materials.wood >= campsiteFarm.costWood * Math.pow(1.15, buildings["farm"]) && materials.glass >= campsiteFarm.costGlass * Math.pow(1.15, buildings["farm"])) {
			materials.tiningot -= campsiteFarm.costTin * Math.pow(1.15, buildings["farm"]);
			materials.glass -= campsiteFarm.costGlass * Math.pow(1.15, buildings["farm"]);
			spendWood(campsiteFarm.costWood * Math.pow(1.15, buildings["farm"]));
			buildings["farm"]++;

		}
	}
}

//Mine
function clickCampsiteMine() {
	if (materials.tiningot >= campsiteMine.costTin * Math.pow(1.15, buildings["mine"])) {
		if (materials.wood >= campsiteMine.costWood * Math.pow(1.15, buildings["mine"]) && materials.stone >= campsiteMine.costStone * Math.pow(1.15, buildings["mine"])) {
			materials.tiningot -= campsiteMine.costTin * Math.pow(1.15, buildings["mine"]);
			materials.stone -= campsiteMine.costStone * Math.pow(1.15, buildings["mine"]);
			spendWood(campsiteMine.costWood * Math.pow(1.15, buildings["mine"]));
			buildings["mine"]++;
		}
	}
}

function clickSmelterMode() {
	if(configSmelter.apply == true) {
		configSmelter.apply = false;
	} else {
		configSmelter.apply = true;
	}
}

function clickSmelterCopper() {
	if(configSmelter.apply == true && configSmelter.active > 0) {
		configSmelter.copper++;
		configSmelter.active--;
	} 
	if(configSmelter.apply == false && configSmelter.copper > 0) {
		configSmelter.copper--;
		configSmelter.active++;
	}
}

function clickSmelterTin() {
	if(configSmelter.apply == true && configSmelter.active > 0) {
		configSmelter.tin++;
		configSmelter.active--;
	} 
	if(configSmelter.apply == false && configSmelter.tin > 0) {
		configSmelter.tin--;
		configSmelter.active++;
	}
}

function clickSmelterZinc() {
	if(configSmelter.apply == true && configSmelter.active > 0) {
		configSmelter.zinc++;
		configSmelter.active--;
	} 
	if(configSmelter.apply == false && configSmelter.zinc > 0) {
		configSmelter.zinc--;
		configSmelter.active++;
	}
}

function clickSmelterSand() {
	if(configSmelter.apply == true && configSmelter.active > 0) {
		configSmelter.sand++;
		configSmelter.active--;
	} 
	if(configSmelter.apply == false && configSmelter.sand > 0) {
		configSmelter.sand--;
		configSmelter.active++;
	}
}


function clickSmelterBronze() {
	if(configSmelter.apply == true && configSmelter.active > 0) {
		configSmelter.bronze++;
		configSmelter.active--;
	} 
	if(configSmelter.apply == false && configSmelter.bronze > 0) {
		configSmelter.bronze--;
		configSmelter.active++;
	}
}


function clickSmelterBrass() {
	if(configSmelter.apply == true && configSmelter.active > 0) {
		configSmelter.brass++;
		configSmelter.active--;
	} 
	if(configSmelter.apply == false && configSmelter.brass > 0) {
		configSmelter.brass--;
		configSmelter.active++;
	}
}
//Smelter

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

//Bronze Pickaxe
function clickToolstation9() {
	if (materials.wood >= toolstation9.costWood) {
		if (materials.bronze >= toolstation9.costBronze) {
			spendWood(toolstation9.costWood);
			materials.bronze -= toolstation9.costBronze;
			ts_check["9"] = true;
			document.getElementById("toolstation9").setAttribute("hidden", true);
		}
	}
}
//Bronze Pickxe

//Fire
function clickResearch1() {
	if (materials.science >= research1["costScience"]) {
		materials.science -= research1["costScience"];
		rs_check["1"] = true;
	}
}
//Fire

//Exploration
function clickResearch2() {
	if (materials.science >= research2["costScience"]) {
		materials.science -= research2["costScience"];
		rs_check["2"] = true;
		
	}
}
//Exploration

//Geology
function clickResearch3() {
	if (materials.science >= research3["costScience"]) {
		materials.science -= research3["costScience"];
		rs_check["3"] = true;
		
	}
}
//Geology

//Agriculture
function clickResearch4() {
	if (materials.science >= research4["costScience"]) {
		materials.science -= research4["costScience"];
		rs_check["4"] = true;
		
	}
}
//Agriculture

//Mining
function clickResearch5() {
	if (materials.science >= research5["costScience"]) {
		materials.science -= research5["costScience"];
		rs_check["5"] = true;
		
	}
}
//Mining

//Metallurgy
function clickResearch6() {
	if (materials.science >= research6["costScience"]) {
		materials.science -= research6["costScience"];
		rs_check["6"] = true;
	}
}
//Metallurgy

//Organization
function clickResearch7() {
	if (materials.science >= research7["costScience"]) {
		materials.science -= research7["costScience"];
		rs_check["7"] = true;
		document.getElementById("research7").setAttribute("hidden", true);
	}
}
//Organization

//Alloys
function clickResearch8() {
	if (materials.science >= research8["costScience"]) {
		materials.science -= research8["costScience"];
		rs_check["8"] = true;
		document.getElementById("research8").setAttribute("hidden", true);
	}
}
//Alloys

setInterval(timer, tickspeed);

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
	
	
	configSmelter.active = buildings.smelter - configSmelter.copper - configSmelter.tin - configSmelter.zinc;
	
	woodStorage += buildings.storage1 * campsiteStorage1.storageWood;
	stoneStorage += buildings.storage1 * campsiteStorage1.storageStone;
	woodStorage += buildings.storage2 * campsiteStorage2.storageWood;
	stoneStorage += buildings.storage2 * campsiteStorage2.storageStone;
	scienceStorage += buildings.research1 * campsiteResearch1.storageScience;
	copperOreStorage += buildings.storage1 * campsiteStorage1.storageCopperOre;
	tinOreStorage += buildings.storage1 * campsiteStorage1.storageTinOre;
	zincOreStorage += buildings.storage1 * campsiteStorage1.storageZincOre;
	copperOreStorage += buildings.storage2 * campsiteStorage2.storageCopperOre;
	tinOreStorage += buildings.storage2 * campsiteStorage2.storageTinOre;
	zincOreStorage += buildings.storage2 * campsiteStorage2.storageZincOre;
	copperIngotStorage += buildings.storage2 * campsiteStorage2.storageCopperIngot;
	tinIngotStorage += buildings.storage2 * campsiteStorage2.storageTinIngot;
	zincIngotStorage += buildings.storage2 * campsiteStorage2.storageZincIngot;
	
	
	if(materials.woodraw >= woodStorage) {
		materials.woodraw = woodStorage;
	}
	if(materials.stone >= stoneStorage) {
		materials.stone = stoneStorage;
	}
	if(materials.science >= scienceStorage) {
		materials.science = scienceStorage;
	}
	
	if(materials.copperore >= copperOreStorage) {
		materials.copperore = copperOreStorage;
	}
	
	if(materials.copperingot >= copperIngotStorage) {
		materials.copperingot = copperIngotStorage;
	}
	
	if(materials.tinore >= tinOreStorage) {
		materials.tinore = tinOreStorage;
	}
	
	if(materials.tiningot >= tinIngotStorage) {
		materials.tiningot = tinIngotStorage;
	}
	
	if(materials.zincore >= zincOreStorage) {
		materials.zincore = zincOreStorage;
	}
	
	if(materials.zincingot >= zincIngotStorage) {
		materials.zincingot = zincIngotStorage;
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
	document.getElementById("woodDisplay").innerHTML = "Wood: " + materials.wood.toFixed(3) + tt_gen(["Timber", materials.woodraw.toFixed(3) + "/" + woodStorage, "Lumber", materials.woodcut.toFixed(3)]);
	document.getElementById("stoneDisplay").innerHTML = "Stone: " + materials.stone.toFixed(3) + "/" + stoneStorage;
	document.getElementById("scienceDisplay").innerHTML = "Science: " + materials.science.toFixed(3) + "/" + scienceStorage;
	document.getElementById("copperDisplay").innerHTML = "Copper: " + materials.copperingot.toFixed(3) + tt_gen(["Copper Ingots", materials.copperingot.toFixed(3) + "/" + copperIngotStorage, "Copper Ore", materials.copperore.toFixed(3) + "/" + copperOreStorage]);
	document.getElementById("tinDisplay").innerHTML = "Tin: " + materials.tiningot.toFixed(3) + tt_gen(["Tin Ingots", materials.tiningot.toFixed(3) + "/" + tinIngotStorage, "Tin Ore", materials.tinore.toFixed(3) + "/" + tinOreStorage]);
	document.getElementById("zincDisplay").innerHTML = "Zinc: " + materials.zincingot.toFixed(3) + tt_gen(["Zinc Ingots", materials.zincingot.toFixed(3) + "/" + zincIngotStorage, "Zinc Ore", materials.zincore.toFixed(3) + "/" + zincOreStorage]);
	document.getElementById("manpowerDisplay").innerHTML = "Manpower: " + materials.manpower.toFixed(3);
	document.getElementById("sandDisplayE").innerHTML = "Sand: " + materials.sandE.toFixed(3);
	document.getElementById("clayDisplayE").innerHTML = "Clay: " + materials.clayE.toFixed(3);
	document.getElementById("sandDisplay").innerHTML = "Sand: " + materials.sand.toFixed(3) + tt_gen(["Glass", materials.glass.toFixed(3)]);
	document.getElementById("clayDisplay").innerHTML = "Clay: " + materials.clay.toFixed(3);
	document.getElementById("ironDisplay").innerHTML = "Iron: " + materials.ironingot.toFixed(3) + tt_gen(["Iron Ingots", materials.ironingot.toFixed(3), "Iron Ore", materials.ironore.toFixed(3)]);
	document.getElementById("coalDisplay").innerHTML = "Coal: " + materials.coal.toFixed(3);
	document.getElementById("bronzeDisplay").innerHTML = "Bronze: " + materials.bronze.toFixed(3);
	document.getElementById("brassDisplay").innerHTML = "Brass: " + materials.brass.toFixed(3);
	var score = ((materials.ironore / 2) + (materials.coal / 4)) * ((materials.bronze + materials.brass) / 3) * (materials.exploredarea / 4);
	document.getElementById("diagnostic").innerHTML = "Score: " + score.toFixed(3);
	document.getElementById("tooltipCaravanCoast").innerHTML = tt_gen_alt(["Manpower", caravan1.costManpower, "Time", caravan1.time, "Sand Capacity", caravan1.limitSand, "Clay Capacity", caravan1.limitClay]);

	if (naviData == 0) {
		document.getElementById("naviCampsite").setAttribute("class", "active");
	}
	if (naviData == 1) {
		document.getElementById("naviExploration").setAttribute("class", "active");
	}
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
	document.getElementById("tooltipCampsiteStorage1").innerHTML = tt_gen_shiny(["Stores your resources.", "Wood", (campsiteStorage1.costWood * Math.pow(1.25, buildings.storage1)).toFixed(3), "Stone", (campsiteStorage1.costStone * Math.pow(1.25, buildings.storage1)).toFixed(3)], ["Wood Storage: " + campsiteStorage1.storageWood, "Stone Storage: " + campsiteStorage1.storageStone]);
	document.getElementById("tooltipCampsiteStorage2").innerHTML = tt_gen_shiny(["Stores your resources.", "Wood", (campsiteStorage2.costWood * Math.pow(1.25, buildings.storage2)).toFixed(3), "Stone", (campsiteStorage2.costStone * Math.pow(1.25, buildings.storage2)).toFixed(3)], ["Wood Storage: " + campsiteStorage2.storageWood, "Stone Storage: " + campsiteStorage2.storageStone]);
	
	document.getElementById("campsiteFarm").innerHTML = "Agri Plot (" + buildings.farm + ")";
	document.getElementById("tooltipCampsiteFarm").innerHTML = tt_gen_shiny(["Automatically grow wood.", "Wood", (campsiteFarm.costWood * Math.pow(1.15, buildings.farm)).toFixed(3), "Tin", (campsiteFarm.costTin * Math.pow(1.15, buildings.farm)).toFixed(3), "Glass", (campsiteFarm.costGlass * Math.pow(1.15, buildings.farm)).toFixed(3)], ["Wood Production: " + campsiteFarm.production]);
	
	document.getElementById("campsiteMine").innerHTML = "Mine (" + buildings.mine + ")";
	document.getElementById("tooltipCampsiteMine").innerHTML = tt_gen_shiny(["Automatically mine stone.", "Wood", (campsiteMine.costWood * Math.pow(1.15, buildings.mine)).toFixed(3), "Tin", (campsiteMine.costTin * Math.pow(1.15, buildings.mine)).toFixed(3), "Stone", (campsiteMine.costStone * Math.pow(1.15, buildings.mine)).toFixed(3)], ["Stone Production: " + campsiteMine.production]);
	
	document.getElementById("campsiteResearch1").innerHTML = "Research Station (" + buildings.research1 + ")";

	document.getElementById("tooltipCampsiteResearch1").innerHTML = tt_gen_shiny(["Allows you to conduct research.", "Wood", (campsiteResearch1.costWood * Math.pow(1.15, buildings.research1)).toFixed(3), "Stone", (campsiteResearch1.costStone * Math.pow(1.15, buildings.research1)).toFixed(3)], ["Science Bonus: " + campsiteResearch1.bonus + "%", "Science Storage: " + campsiteResearch1.storageScience]);
	
	document.getElementById("campsiteSmelter").innerHTML = "Smelter (" + buildings.smelter + ")";
	
	if(configSmelter.apply == false) {
		document.getElementById("smelterMode").innerHTML = "Mode: Remove";
	} else {
		document.getElementById("smelterMode").innerHTML = "Mode: Apply";
	}
	
	document.getElementById("smelterCopper").innerHTML = "Copper (" + configSmelter.copper + ")";
	document.getElementById("tooltipsmelterCopper").innerHTML = tt_gen_alt(["Copper Ore Cost", metallurgy.copper.costOre, "Wood Cost", metallurgy.copper.costWood, "Copper Production", metallurgy.copper.output]);
	
	document.getElementById("smelterTin").innerHTML = "Tin (" + configSmelter.tin + ")";
	document.getElementById("tooltipsmelterTin").innerHTML = tt_gen_alt(["Tin Ore Cost", metallurgy.tin.costOre, "Wood Cost", metallurgy.tin.costWood, "Tin Production", metallurgy.tin.output]);
	
	document.getElementById("smelterZinc").innerHTML = "Zinc (" + configSmelter.zinc + ")";
	document.getElementById("tooltipsmelterZinc").innerHTML = tt_gen_alt(["Zinc Ore Cost", metallurgy.zinc.costOre, "Wood Cost", metallurgy.zinc.costWood, "Zinc Production", metallurgy.zinc.output]);
	
	document.getElementById("smelterSand").innerHTML = "Glass (" + configSmelter.sand + ")";
	document.getElementById("tooltipsmelterSand").innerHTML = tt_gen_alt(["Sand Cost", metallurgy.sand.costOre, "Wood Cost", metallurgy.sand.costWood, "Glass Production", metallurgy.sand.output]);
	
	document.getElementById("smelterBronze").innerHTML = "Bronze (" + configSmelter.bronze + ")";
	document.getElementById("tooltipsmelterBronze").innerHTML = tt_gen_alt(["Copper Cost", metallurgy.bronze.costCopper, "Tin Cost", metallurgy.bronze.costTin, "Wood Cost", metallurgy.bronze.costWood, "Bronze Production", metallurgy.bronze.output]);
	
	document.getElementById("smelterBrass").innerHTML = "Brass (" + configSmelter.brass + ")";
	document.getElementById("tooltipsmelterBrass").innerHTML = tt_gen_alt(["Copper Cost", metallurgy.brass.costCopper, "Zinc Cost", metallurgy.brass.costZinc, "Wood Cost", metallurgy.brass.costWood, "Brass Production", metallurgy.brass.output]);
	
	if(materials.copperore > configSmelter.copper * metallurgy.copper.costOre && materials.wood > configSmelter.copper * metallurgy.copper.costWood) {
		materials.copperore -= configSmelter.copper * metallurgy.copper.costOre;
		spendWood(configSmelter.copper * metallurgy.copper.costWood);
		materials.copperingot += configSmelter.copper * metallurgy.copper.output;
	}
	
	if(materials.tinore > configSmelter.tin * metallurgy.tin.costOre && materials.wood > configSmelter.tin * metallurgy.tin.costWood) {
		materials.tinore -= configSmelter.tin * metallurgy.tin.costOre;
		spendWood(configSmelter.tin * metallurgy.tin.costWood);
		materials.tiningot += configSmelter.tin * metallurgy.tin.output;
	}
	
	if(materials.zincore > configSmelter.zinc * metallurgy.zinc.costOre && materials.wood > configSmelter.zinc * metallurgy.zinc.costWood) {
		materials.zincore -= configSmelter.zinc * metallurgy.zinc.costOre;
		spendWood(configSmelter.zinc * metallurgy.zinc.costWood);
		materials.zincingot += configSmelter.zinc * metallurgy.zinc.output;
	}
	
	if(materials.sand > configSmelter.sand * metallurgy.sand.costOre && materials.wood > configSmelter.sand * metallurgy.sand.costWood) {
		materials.sand -= configSmelter.sand * metallurgy.sand.costOre;
		spendWood(configSmelter.sand * metallurgy.sand.costWood);
		materials.glass += configSmelter.sand * metallurgy.sand.output;
	}
	
	if(materials.copperingot > configSmelter.bronze * metallurgy.bronze.costCopper && materials.tiningot > configSmelter.bronze * metallurgy.bronze.costTin && materials.wood > configSmelter.bronze * metallurgy.bronze.costWood) {
		materials.copperingot -= configSmelter.bronze * metallurgy.bronze.costCopper;
		materials.tiningot -= configSmelter.bronze * metallurgy.bronze.costTin;
		spendWood(configSmelter.bronze * metallurgy.bronze.costWood);
		materials.bronze += configSmelter.bronze * metallurgy.bronze.output;
	}
	
	if(materials.copperingot > configSmelter.brass * metallurgy.brass.costCopper && materials.zincingot > configSmelter.brass * metallurgy.brass.costZinc && materials.wood > configSmelter.brass * metallurgy.brass.costWood) {
		materials.copperingot -= configSmelter.brass * metallurgy.brass.costCopper;
		materials.zincingot -= configSmelter.brass * metallurgy.brass.costZinc;
		spendWood(configSmelter.brass * metallurgy.brass.costWood);
		materials.brass += configSmelter.brass * metallurgy.brass.output;
	}
	
	materials.woodraw += buildings.farm * campsiteFarm.production;
	materials.stone += buildings.mine * campsiteMine.production;
	
	document.getElementById("tooltipCampsiteSmelter").innerHTML = tt_gen_shiny(["Smelt materials into other ones.", "Stone", (campsiteSmelter.costStone * Math.pow(1.15, buildings.smelter)).toFixed(3), "Copper", (campsiteSmelter.costCopper * Math.pow(1.15, buildings.smelter)).toFixed(3)], []);

	document.getElementById("tooltipToolstation1").innerHTML = tt_gen_shiny(["Allows you to harvest stone.", "Wood", toolstation1.costWood], []);

	document.getElementById("tooltipToolstation2").innerHTML = tt_gen_shiny(["Harvest wood faster.", "Wood", toolstation2.costWood], ["Wood Time Max: -" + toolstation2.timeMod, "Wood Queue Max: +" + toolstation2.queueMod]);

	document.getElementById("tooltipToolstation3").innerHTML = tt_gen_shiny(["Harvest stone faster.", "Wood", toolstation3.costWood, "Stone", toolstation3.costStone], ["Stone Time Max: -" + toolstation3.timeMod, "Stone Queue Max: +" + toolstation3.queueMod]);

	document.getElementById("tooltipToolstation4").innerHTML = tt_gen_shiny(["Harvest wood faster.", "Wood", toolstation4.costWood, "Stone", toolstation4.costStone], ["Wood Time Max: -" + toolstation4.timeMod, "Wood Queue Max: +" + toolstation4.queueMod]);

	document.getElementById("tooltipToolstation5").innerHTML = tt_gen_shiny(["Increase manual wood production.", "Wood", toolstation5.costWood, "Copper", toolstation5.costCopper], ["Wood Production Multiplier: x" + toolstation5.mult]);

	document.getElementById("tooltipToolstation6").innerHTML = tt_gen_shiny(["Increase manual stone production.", "Wood", toolstation6.costWood, "Copper", toolstation6.costCopper], ["Stone Production Multiplier: x" + toolstation6.mult]);
	
	document.getElementById("tooltipToolstation7").innerHTML = tt_gen_shiny(["Increase manual science production.", "Copper", toolstation7.costCopper], ["Science Production Multiplier: x" + toolstation7.mult]);
	
	document.getElementById("tooltipToolstation8").innerHTML = tt_gen_shiny(["Increase the exploration multiplier.", "Glass", toolstation8.costGlass, "Copper", toolstation8.costCopper], ["Exploration Multiplier: x" + toolstation8.mult]);
	
	document.getElementById("tooltipToolstation9").innerHTML = tt_gen_shiny(["Allows you to find Iron and Coal in stone.", "Wood", toolstation9.costWood, "Bronze", toolstation9.costBronze], ["Copper Chance: +" + toolstation8.add]);

	document.getElementById("tooltipResearch1").innerHTML = tt_gen_shiny(["Discover fire. Required for all other research upgrades.", "Science", research1.costScience], []);

	document.getElementById("tooltipResearch2").innerHTML = tt_gen_shiny(["Look around you. Discover new things.", "Science", research2.costScience], ["Unlocks: Manpower/Exploration"]);

	document.getElementById("tooltipResearch3").innerHTML = tt_gen_shiny(["Find ores in stone.", "Science", research3.costScience], ["Unlocks: Ores/Metals"]);

	document.getElementById("tooltipResearch4").innerHTML = tt_gen_shiny(["Learn how to grow plants.", "Science", research4.costScience], ["Unlocks: Agri Plots"]);
	
	document.getElementById("tooltipResearch5").innerHTML = tt_gen_shiny(["A new way to obtain stone.", "Science", research5.costScience], ["Unlocks: Mines"]);
	
	document.getElementById("tooltipResearch6").innerHTML = tt_gen_shiny(["Smelt materials into different forms.", "Science", research6.costScience], ["Unlocks: Smelters"]);
	
	document.getElementById("tooltipResearch7").innerHTML = tt_gen_shiny(["Unlock better ways to store items.", "Science", research7.costScience], ["Unlocks: Storehouses"]);
	
	document.getElementById("tooltipResearch8").innerHTML = tt_gen_shiny(["Alloys the creation of alloys in smelters.", "Science", research8.costScience], ["Unlocks: Bronze/Brass"]);
	
	{
		//Crate
		if (materials.wood >= campsiteStorage1.costWood * 0.3 || buildings.storage1 > 0) {
			document.getElementById("campsiteStorage1").removeAttribute("hidden");
		}
		//Crate
		
		//Storehouse
		if (materials.wood >= campsiteStorage2.costWood * 0.3 || buildings.storage2 > 0) {
			document.getElementById("campsiteStorage2").removeAttribute("hidden");
		}
		//Storehouse
		
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
			document.getElementById("toolstation1").parentElement.setAttribute("hidden", true);
			document.getElementById("toolstation1").setAttribute("hidden", true);
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
			document.getElementById("toolstation2").parentElement.setAttribute("hidden", true);
			document.getElementById("toolstation2").setAttribute("hidden", true);
			
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
			document.getElementById("toolstation3").parentElement.setAttribute("hidden", true);
			document.getElementById("toolstation3").setAttribute("hidden", true);
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
			document.getElementById("toolstation4").parentElement.setAttribute("hidden", true);
			document.getElementById("toolstation4").setAttribute("hidden", true);
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
			document.getElementById("toolstation5").parentElement.setAttribute("hidden", true);
			document.getElementById("toolstation5").setAttribute("hidden", true);
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
			document.getElementById("toolstation6").parentElement.setAttribute("hidden", true);
			document.getElementById("toolstation6").setAttribute("hidden", true);
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
			document.getElementById("toolstation7").parentElement.setAttribute("hidden", true);
			document.getElementById("toolstation7").setAttribute("hidden", true);
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
			document.getElementById("toolstation8").parentElement.setAttribute("hidden", true);
			document.getElementById("toolstation8").setAttribute("hidden", true);
		}
		//Copper Sights
		
		//Bronze Pickaxe
		if (materials.bronze >= toolstation9.costBronze * 0.3) {
			if (ts_check["9"] != true) {
				document.getElementById("toolstation9").removeAttribute("hidden");
			}
		}
		
		if (ts_check["9"] == true) {
			document.getElementById("coalDisplay").removeAttribute("hidden");
			document.getElementById("ironDisplay").removeAttribute("hidden");
			document.getElementById("toolstation9").parentElement.setAttribute("hidden", true);
			document.getElementById("toolstation9").setAttribute("hidden", true);
			geology.chanceCopper += 5;
		}
		//Wooden Pickaxe
		
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


	} 
	{
		document.getElementById("tooltipHarvestWood").innerHTML = tt_gen_alt(["Wood in Queue", woodQueue, "Wood Time", woodTime, "Wood Queue Max", woodQueueMax, "Wood Time Max", woodTimeMax]);
		document.getElementById("tooltipHarvestStone").innerHTML = tt_gen_alt(["Stone in Queue", stoneQueue, "Stone Time", stoneTime, "Stone Queue Max", stoneQueueMax, "Stone Time Max", stoneTimeMax]);
		document.getElementById("tooltipHarvestScience").innerHTML = tt_gen_alt(["Science in Queue", scienceQueue, "Science Time", scienceTime, "Science Queue Max", scienceQueueMax, "Science Time Max", scienceTimeMax]);
		document.getElementById("tooltipHarvestOres").innerHTML = tt_gen_alt(["Stone Cost", geology.costStone, "Productivity", geology.rolls, "Copper Chance", geology.chanceCopper, "Tin Chance", geology.chanceTin, "Zinc Chance", geology.chanceZinc]);
		if (ts_check["9"] == true) {
			document.getElementById("tooltipHarvestOres").innerHTML = tt_gen_alt(["Stone Cost", geology.costStone, "Productivity", geology.rolls, "Copper Chance", geology.chanceCopper, "Tin Chance", geology.chanceTin, "Zinc Chance", geology.chanceZinc, "Iron Chance", geology.chanceIron, "Coal Chance", geology.chanceCoal]);
		}
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
					if (natcopper >= 0.9) {
						materials.copperore++;
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
				var scienceprodtemp = (Math.random() * (3 * (buildings["research1"] * ((campsiteResearch1.bonus / 100) + 1))));
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
		woodQueueMax = 5;
		woodmult = 1;
		woodStorage = 50;
		stoneTimeMax = 15;
		stoneQueueMax = 5;
		stonemult = 1;
		stoneStorage = 50;
		scienceTimeMax = 25;
		scienceQueueMax = 3;
		sciencemult = 1;
		scienceStorage = 0;
		manpowerTimeMax = 100;
		explorationmult = 1;
		sandTimeMax = 20;
		sandQueueMax = 4;
		sandClay = 0.6;
		woodStorage = 50;
		stoneStorage = 50;
		scienceStorage = 0;
		 copperOreStorage = 50;
		tinOreStorage = 50;
		zincOreStorage = 50;
		copperIngotStorage = 10;
		tinIngotStorage = 10;
		zincIngotStorage = 10;
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
