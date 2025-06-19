var tickspeed = 50; //should be 5 in release ver
var global_version = 100;
/*
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
var sandTimeMax = 20;
var sandQueueMax = 8;
var sandClay = 0.65;*/
var i;
var j;

function test(element) {
	element.innerHTML = "deedsd";
}

var Game = {
	activeZone: "Clearing",
	createResource: function(zone, resource, subs, caps) {
		if(typeof(zone.materials[resource]) != "undefined"/* && zone.flags.materials[resource][0] == true*/) {
			 var display = zone.name + resource + "Display";
			 var output = "";
			 output += "<p id='";
			 output += resource;
			 output += "Display"
			 output += zone;
			 output += "'>";
			 output += resource;
			 output += ": ";
			 output += Number(zone.amount(resource).toFixed(3));
			 output += '<br/><font size="1">'
			 for(i = 0; i < subs.length; i++) {
				 if(typeof(zone.materials[resource][i]) != "undefined"/* && zone.flags.materials[resource][i + 1] == true*/) {
					 output += `<span id="${zone.name + resource}t${i}">${subs[i]}: ${Number(zone.materials[resource][i].toFixed(3))}/${Number(zone.resourcearray[resource][1][i])}<br/></span>`
					 /*output += '<span id="'
					 output += zone.name;
					 output += resource;
					 output += "t";
					 output += i;
					 output += '">';
					 output += subs[i];
					 output += ": ";
					 output += Number(zone.materials[resource][i].toFixed(3));
					 output +=
					 output += "<br/></span>";*/
				 }
			 }
			 output += "</font></p>"
			 
			 document.getElementById("resourceDisplay").innerHTML += output;
		}
	},
	purgeResources: function() {
		document.getElementById("resourceDisplay").innerHTML = "";
	},
	createSpecialButton: function(zone, func, name, id) {
		var output = "<div class='tooltip' id='";
		output += id;
		output += "'>";
		output += "<button onmousedown='";
		output += func;
		output += "'>";
		output += name;
		output += "</button></div>";
		document.getElementById("buttonDisplay").innerHTML += output;
	},
	createBuildingButton: function(zone, zoneName, building, name, id) {
		var output = "<div class='tooltip' id='";
		output += id;
		output += "'>";
		output += "<button onmousedown='";
		output += zoneName;
		output += ".build(\"";
		output += building;
		output += "\")'>";
		output += name;
		if(typeof(zone.buildings[building]) != "undefined") {
			output += " (";
			output += zone.buildings[building];
			output += ")";
		}
		output += "</button><span class='tooltiptext'>";
		output += tooltipBuilding(building, "normal", zone);
		output += "</div>";
		document.getElementById("buildingDisplay").innerHTML += output;
	},
	createToolButton: function(zone, zoneName, tool, name, id) {
		var output = "<div class='tooltip' id='";
		output += id+tool;
		output += "'>";
		output += "<button onmousedown='";
		output += zoneName;
		output += ".craft(\"";
		output += tool;
		output += "\")'>";
		output += name;
		output += "</button><span class='tooltiptext'>"
		output += tooltipTool(tool);
		output += "</span></div>";
		console.log();
		document.getElementById("toolDisplay").innerHTML += output;
		//console.log("buttonDisplay");
	},
	purgeButtons: function() {
		document.getElementById("buttonDisplay").innerHTML = "";
		document.getElementById("buildingDisplay").innerHTML = "";
		document.getElementById("toolDisplay").innerHTML = "";
		document.getElementById("explorationDisplay").innerHTML = "";
	},
	createTooltip: function(location, text) {
		var output = "<span class='tooltiptext'>";
		output += text;
		output += "</span>";
		document.getElementById(location).innerHTML += output;
	},
	createConfigurator: function(zone, zoneName, building, name, id) {
		if(typeof(zone.configSettings[building]) == "undefined") {
			zone.configSettings[building] = {
				visible: false
			}
		}
		var output = "";
		output += "<button onmousedown='";
		output += zoneName;
		output += ".toggleConfiguratorVisibility(\"";
		output += building;
		output += "\")'>";
		output += name;
		output += "</button>";
		output += "<div ";
		if(zone.configSettings[building].visible == false) {
			output += "hidden";
		}
		output += " id='";
		output += id;
		output += "' class='configBackground'>";
		output += "</div>";
		document.getElementById("configuratorDisplay").innerHTML += output;
		
	},
	createConfiguratorToggle: function(zone, zoneName, location, building) {
		if(typeof(zone.configSettings[building].increment) == "undefined") {
			zone.configSettings[building].increment = true;
		}
		var output = "";
		output += "<button onmousedown='";
		output += zoneName;
		output += ".toggleConfiguratorIncrement(\"";
		output += building;
		output += "\")'>";
		output += "Toggle (";
		if(zone.configSettings[building].increment == true) {
			output += "+";
		} else {
			output += "-";
		}
		output += ")</button>";
		document.getElementById(location).innerHTML += output;
	},
	createConfiguratorMode: function(zone, zoneName, location, building, mode, name, id) {
		if(typeof(zone.configSettings[building].modes) == "undefined") {
			zone.configSettings[building].modes = {};
		}
		if(typeof(zone.configSettings[building].modes[mode]) == "undefined") {
			zone.configSettings[building].modes[mode] = 0;
		}
		var output = "<div class='tooltip' id='";
		output += id;
		output += "'>";
		output += "<button onmousedown='";
		output += zoneName;
		output += ".modifyConfiguratorMode(\"";
		output += building;
		output += "\", \"";
		output += mode;
		output += "\")'>";
		output += name;
		output += " (";
		output += zone.configSettings[building].modes[mode];
		output += ")";
		output += "</button></div>";
		//console.log(output);
		document.getElementById(location).innerHTML += output;
	},
	purgeConfigurators: function() {
		document.getElementById("configuratorDisplay").innerHTML = "";
	},
	createNavbar: function(zone) {
		var output = "<li><a href='#' class='navbarMain' onmousedown='Game.activeZone = \"";
		output += zone.name;
		output += "\"'>";
		output += zone.name;
		output += "</li>";
		document.getElementById("Navbar").innerHTML += output;
	},
	purgeNavbar: function() {
		document.getElementById("Navbar").innerHTML = "";
	},
	createTools: function(zone, zoneName) {
		Object.keys(zone.flags.tools).forEach(function(key) {
			if(zone.flags.tools[key] == 1) {
				Game.createToolButton(zone, zoneName, key, ToolItems[key].name, zoneName);
				//console.log(q.flags.tools[key]);
			}
		})
	},
	createBuildings: function(zone, zoneName) {
		Object.keys(zone.flags.buildings).forEach(function(key) {
			if(zone.flags.buildings[key] >= 1) {
				Game.createBuildingButton(zone, zoneName, key, Buildings[key].name, zoneName);
				//console.log(q.flags.tools[key]);
			}
		})
	}
}

class Zone {
	constructor(name, resourcearray, baseCounters, extraCounters, flags) {
		this.name = name;
		this.materials = {};
		this.buildings = {};
		this.tools = [];
		this.configSettings = {};
		this.flags = flags;
		this.resourcearray = resourcearray;
		this.modifiers = {};
		this.income = {};
		this.modes = {};
		this.originalSpecialCounters = JSON.parse(JSON.stringify(baseCounters));
		this.specialCounters = Object.assign(JSON.parse(JSON.stringify(baseCounters)), extraCounters);
	}
	gain(resource, amount, tier) {
		if(typeof(this.materials[resource]) == "undefined") this.materials[resource] = []
		if(typeof(this.materials[resource][tier]) == "undefined") {
			this.materials[resource][tier] = 0;
		}
		if(amount > this.resourcearray[resource][1][tier] - this.materials[resource][tier]) {
			amount = this.resourcearray[resource][1][tier] - this.materials[resource][tier]
		}
		if(amount < 0) amount = 0;
		this.materials[resource][tier] += amount;
	}
	amount(resource) {
		var tally = 0;
		for(i = 0; i < this.materials[resource].length; i++) {
			if(typeof(this.materials[resource][i] != "undefined")) {
				tally += this.materials[resource][i];
			}
		}
		return tally;
	}
	spend(resource, amount, min_tier, max_tier) {
		var tally = 0;
		var q = this;
		for(i = 0; i < resource.length; i++) {
			if(max_tier[i] == -1) {
				if(typeof(this.materials[resource[i]]) != "undefined") {
					max_tier[i] = this.materials[resource[i]].length;
				}
				else {
					max_tier[i] = 0;
				}
			}
			var t2 = 0;
			for(j = min_tier[i]; j <= max_tier[i]; j++) {
				if(typeof(this.materials[resource[i]]) != "undefined") {
					t2 += this.materials[resource[i]][j];
				}
			}
			if(t2 <= amount[i]) {
				tally++;
			}
		}
		if(tally == 0) {
			for(i = 0; i < resource.length; i++) {
				t2 = amount[i];
				console.log(t2);
				for(j = min_tier[i]; j <= max_tier[i]; j++) {
					//console.log(this.materials);
					//console.log(resource[i]);
					if(typeof(this.materials[resource[i]][j]) == "undefined") {
						continue;
					}
					//console.log(j);
					var sub = Math.min(this.materials[resource[i]][j], t2);
					this.materials[resource[i]][j] -= sub;
					t2 -= sub;
					if(t2 == 0) {
						break;
					}
				}
			}
			return 1;
		}
	}
	build(building) {
		var sB = JSON.parse(JSON.stringify(Buildings[building]));
		var costs = sB.cost;
		if(typeof(this.buildings[building]) != "undefined") {
			for(i = 0; i < costs[1].length; i++) {
				costs[1][i] *= Math.pow(sB.ratio, this.buildings[building]);
			}
		}
		
		if(this.spend(costs[0], costs[1], costs[2], costs[3]) == 1) {
			if(typeof(this.buildings[building]) == "undefined") {
				this.buildings[building] = 0;
				this.configSettings[building] = {};
				this.flags.buildings[building] = 2
			}
			this.buildings[building]++;
		}
	}
	craft(tool) {
		var costs = ToolItems[tool].cost;
		if(this.spend(costs[0], costs[1], costs[2], costs[3]) == 1) {
			this.flags.tools[tool] = 2;
		}
	}
	createResources() {
		var q = this;
		Object.keys(this.resourcearray).forEach(function(key) {
			Game.createResource(q, key, q.resourcearray[key][0]);
		})
	}
	checkBuildings() {
		var q = this;
		Object.keys(q.buildings).forEach(function(key) {
			var tally = q.buildings[key];
			console.log(tally);
			if(typeof(q.configSettings[key].modes) != "undefined") {
				Object.keys(q.configSettings[key].modes).forEach(function(modeSet) {
					Buildings.interperet(q, key, modeSet, q.configSettings[key].modes[modeSet]);
					tally -= q.configSettings[key].modes[modeSet];
				});
			}
			Buildings.interperet(q, key, "normal", tally);
		})
	}
	toggleConfiguratorVisibility(building) {
		if(this.configSettings[building].visible == false) {
			this.configSettings[building].visible = true;
		} else {
			this.configSettings[building].visible = false
		}
	}
	toggleConfiguratorIncrement(building) {
		if(this.configSettings[building].increment == false) {
			this.configSettings[building].increment = true;
		} else {
			this.configSettings[building].increment = false
		}
	}
	modifyConfiguratorMode(building, mode) {
		var q = this;
		var remainingBuildings = this.buildings[building];
		Object.keys(q.configSettings[building].modes).forEach(function(key) {
			remainingBuildings -= q.configSettings[building].modes[key];
			
		})
		console.log(remainingBuildings);
		console.log(q.configSettings[building].increment);
		if(q.configSettings[building].increment == true && remainingBuildings > 0) {
			q.configSettings[building].modes[mode]++;
		}
		if(q.configSettings[building].increment == false && q.configSettings[building].modes[mode] > 0) {
			q.configSettings[building].modes[mode]--;
		}
		console.log("a");
	}
	earnIncome() {
		var q = this;
		Object.keys(q.income).forEach(function(key) {
			for(i = 0; i < q.income[key].length; i++) {
				//console.log(key);
				//console.log(q.income[key][i]);
				//console.log(i);
				q.gain(key, q.income[key][i], i)
			}
		})
	}
	checkTools(zoneName) {
		var q = this;
		Object.keys(q.flags.tools).forEach(function(key) {
			if(q.flags.tools[key] == 2) {
				
				ToolItems[key].execute(q);
			}
		})
	}
	refresh() {
		this.income = {};
		Object.assign(this.specialCounters, this.originalSpecialCounters);
	}
}

var Buildings = {
	farm: {
		name: "Farm",
		blurb: {
			normal: "Produces wood and grows plants.",
			fibers: "Long durable fibers good for construction.",
			resin: "Sticky resin useful for adhesives."
		},
		cost: [["wood", "soil"], [40, 15], [0, 0], [-1, -1]],
		ratio: 1.15,
		modes: ["normal", "fibers", "resin"],
		properties: {
			normal: {
				income: [["wood"], [0.06], [0]]
			},
			fibers: {
				income: [["wood", "rope"], [0.04, 0.01], [0, 0]]
			},
			resin: {
				income: [["wood", "adhesive"], [0.04, 0.01], [0, 0]]
			}
		}
	},
	waypost: {
		name: "Waypost",
		blurb: {
			normal: "Marks the way and allows you to explore."
		},
		cost: [["wood"], [20], [0], [-1]],
		ratio: 1.2,
		modes: ["normal"],
		properties: {
			normal: {
				
			}
		}
	},
	interperet: function(zone, building, mode, amount) {
		var v = Buildings[building].properties[mode];
		Object.keys(v).forEach(function(key) {
			switch(key) {
				case "income":
					for(i = 0; i < v.income[0].length; i++) {
						if(typeof(zone.income[v.income[0][i]]) == "undefined") {
							zone.income[v.income[0][i]] = [];
						}
						if(typeof(zone.income[v.income[0][i]][v.income[2][i]]) == "undefined") {
							zone.income[v.income[0][i]][v.income[2][i]] = 0;
						}
						zone.income[v.income[0][i]][v.income[2][i]] += v.income[1][i] * amount;
					}
					break;
			}
		})
	}
}

var ToolItems = {
	crudeAnvil: {
		name: "Stone \"Anvil\"",
		blurb: "A platform to help you produce simple tools.",
		cost: [["wood", "adhesive"], [50, 15], [0, 0], [-1, -1]],
		values: [2, 4],
		properties: [["Max Wood in Queue:&nbsp", "Wood Harvest Time:&nbsp"], [" +4", " -2"]],
		execute: function(zone) {
			zone.specialCounters.woodTimeMax -= this.values[0];
			zone.specialCounters.woodQueueMax += this.values[1];
		}
	},
	firepit: {
		name: "Fire Pit",
		blurb: "The start of a signal fire.",
		cost: [["wood", "stone"], [10, 10], [0, 0], [-1, -1]],
		values: [],
		properties: [[], []],
		execute: function(zone) {

		}
	},
	tieroneAxe: {
		name: "Wooden Axe",
		blurb: "Cut wood faster.",
		cost: [["wood", "adhesive"], [50, 15], [0, 0], [-1, -1]],
		values: [2, 4],
		properties: [["Max Wood in Queue:&nbsp", "Wood Harvest Time:&nbsp"], [" +4", " -2"]],
		execute: function(zone) {
			zone.specialCounters.woodTimeMax -= this.values[0];
			zone.specialCounters.woodQueueMax += this.values[1];
		}
	},
	tieroneShovel: {
		name: "Wooden Shovel",
		blurb: "Dig soil faster.",
		cost: [["wood", "adhesive"], [50, 15], [0, 0], [-1, -1]],
		values: [2, 4],
		properties: [["Max Soil in Queue:&nbsp", "Soil Harvest Time:&nbsp"], [" +4", " -2"]],
		execute: function(zone) {
			zone.specialCounters.woodTimeMax -= this.values[0];
			zone.specialCounters.woodQueueMax += this.values[1];
		}
	}
}

var nauvisResourceArray = {
	wood: [["timber", "lumber"], [50, 0]], 
	stone: [["stone"], [50]], 
	soil: [["mud", "clay"], [50, 0]],
	rope: [["fibers"], [10]],
	adhesive: [["sapglue"], [10]],
	ore: [["copper", "tin", "zinc"], [10, 10, 10]],
}
var nauvisSpecialCounters = {
	woodTimeMax: 15,
	woodQueueMax: 20,
	soilTimeMax: 15,
	soilQueueMax: 10,
	stoneTimeMax: 40,
	stoneQueueMax: 10
}
var nauvisExtraCounters = {
	woodTime: 0,
	woodQueue: 0,
	soilTime: 0,
	soilQueue: 0,
	stoneTime: 0,
	stoneQueue: 0
}
var nauvisFlags = {
	misc: {
		unlockedSoil: false,
		unlockedStone: false,
		unlockedFarm: false,
		unlockedFibers: false,
		unlockedResin: false
	},
	materials: {
		//deprecated? 
	},
	tools: {
		tieroneAxe: 0,
		firepit: 1
	},
	buildings: {
		farm: 0,
		waypost: 0
	}
}
class Encounter {
	constructor(enemies) {
		this.enemies = enemies;
	}
	begin() {
		combat_begin(this.enemies);
	}
}
class Discoveries {
	constructor(groups, encounters) {
		this.groups = groups;
		this.encounters = encounters;
	}
	createEncounter() {
		var enemies = [];
		var encountertype = this.encounters[Math.floor(Math.random() * this.encounters.length)]
		for(i = 0; i < encountertype.length; i++) {
			var ind = Math.floor(Math.random() * encountertype.length);
			enemies[i] = new this.groups[encountertype[ind]](3, 3, 2);
		}
	}
}
var nauvisDiscoveries = new Discoveries({
	weakFoe: [fighter_SandSlime],
	strongFoe: [fighter_StoneSoldier]
}, [["weakFoe", "weakFoe", "weakFoe"], ["weakFoe", "strongFoe"]])
/*var nauvisDiscoveries = {
	groups: {
		weakFoe: [fighter_SandSlime],
		strongFoe: [fighter_StoneSoldier]
	},
	encounters: [[this.groups.weakFoe, this.groups.weakFoe, this.groups.weakFoe], [this.groups.weakFoe, this.groups.strongFoe]],
	createEncounter() {
		var enemies = [];
		var encountertype = this.encounters[Math.floor(Math.random() * this.encounters.length)]
		for(i = 0; i < encountertype.length; i++) {
			var ind = Math.floor(Math.random() * encountertype.length);
			enemies[i] = new encountertype[ind](3, 3, 2);
		}
	}
}*/

var nauvis = new Zone("Clearing", nauvisResourceArray, nauvisSpecialCounters, nauvisExtraCounters, nauvisFlags);
var boris = new Zone("Testville", nauvisResourceArray, nauvisSpecialCounters, nauvisExtraCounters, nauvisFlags);
var combat = new Zone("Combat", {}, {}, {}, {});
var forging = new Zone("Forging", {}, {}, {}, {});
var equips = new Zone("Equips", {}, {}, {}, {});

var SpecialButtons = {
	harvestWood: function(zone) {
		zone.specialCounters.woodQueue++;
		zone.specialCounters.woodTime++;
	},
	tickingHarvestWood: function(zone) {
		if(zone.specialCounters.woodQueue > 0) {
			if(zone.specialCounters.woodQueue > zone.specialCounters.woodQueueMax) {
				zone.specialCounters.woodQueue = zone.specialCounters.woodQueueMax;
			}
			zone.specialCounters.woodTime++;
			if(zone.specialCounters.woodTime >= zone.specialCounters.woodTimeMax) {
				zone.specialCounters.woodTime = 0;
				zone.gain("wood", 1, 0);
				zone.specialCounters.woodQueue--;
			}
		}
	},
	harvestSoil: function(zone) {
		zone.specialCounters.soilQueue++;
		zone.specialCounters.soilTime++;
	},
	tickingHarvestSoil: function(zone) {
		if(zone.specialCounters.soilQueue > 0) {
			if(zone.specialCounters.soilQueue > zone.specialCounters.soilQueueMax) {
				zone.specialCounters.soilQueue = zone.specialCounters.soilQueueMax;
			}
			zone.specialCounters.soilTime++;
			if(zone.specialCounters.soilTime >= zone.specialCounters.soilTimeMax) {
				zone.specialCounters.soilTime = 0;
				zone.gain("soil", 1, 0);
				zone.specialCounters.soilQueue--;
			}
		}
	},
	harvestStone: function(zone) {
		zone.specialCounters.stoneQueue++;
		zone.specialCounters.stoneTime++;
	},
	tickingHarvestStone: function(zone) {
		if(zone.specialCounters.stoneQueue > 0) {
			if(zone.specialCounters.stoneQueue > zone.specialCounters.stoneQueueMax) {
				zone.specialCounters.stoneQueue = zone.specialCounters.stoneQueueMax;
			}
			zone.specialCounters.stoneTime++;
			if(zone.specialCounters.stoneTime >= zone.specialCounters.stoneTimeMax) {
				zone.specialCounters.stoneTime = 0;
				zone.gain("stone", 1, 0);
				zone.specialCounters.stoneQueue--;
			}
		}
	},
}

function tooltipGeneric(data) {
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

function tooltipBuilding(name, mode, zone) {
	var data = JSON.parse(JSON.stringify(Buildings[name]));	
	var output = data.blurb[mode];
	if(mode == "normal") {
		
		output += "<hr>"
		for(i = 0; i < data.cost[0].length; i++) {
			output += "<span class='forceleft'>"
			output += data.cost[0][i];
			if(data.cost[2][i] != 0 || data.cost[3][i] != -1) {
				output += " (tier ";
				output += data.cost[2][i];
				if(data.cost[3][i] == -1) {
					output += "+";
				} else if(data.cost[3][i] != data.cost[2][i]) {
					output += "-";
					output += data.cost[3][i];
				} 
				output += ")";
			}
			output +="</span> <span class='forceright'>";
			if(typeof(zone.buildings[name]) != "undefined") {
				output += Number((data.cost[1][i] *= Math.pow(data.ratio, zone.buildings[name])).toFixed(3));	
			} else {
				output += Number(data.cost[1][i].toFixed(3));
			}
			output += "</span><br>";
		}
	}
	
	output += "<hr>";
	Object.keys(data.properties[mode]).forEach(key => {
		switch(key) {
			case "income":
				for(i = 0; i < data.properties[mode].income[0].length; i++) {
					output += "<span class='forceleft'>"
					output += data.properties[mode].income[0][i];
					output += " (tier ";
					output += data.properties[mode].income[2][i];
					output += ")";
					output += "/s"
					output +="</span> <span class='forceright'>";
					output += Number((data.properties[mode].income[1][i] * tickspeed).toFixed(3));
					output += "</span><br>";
				}
				break;
		}
	});
	return output;
}

function tooltipTool(tool) {
	var data = ToolItems[tool];
	var output = data.blurb;
	output += "<hr>"
	for(i = 0; i < data.cost[0].length; i++) {
		output += "<span class='forceleft'>"
		output += data.cost[0][i];
		if(data.cost[2][i] != 0 || data.cost[3][i] != -1) {
			output += " (tier ";
			output += data.cost[2][i];
			if(data.cost[3][i] == -1) {
				output += "+";
			} else if(data.cost[3][i] != data.cost[2][i]) {
				output += "-";
				output += data.cost[3][i];
			} 
			output += ")";
		}
		output +="</span> <span class='forceright'>";
		output += Number(data.cost[1][i].toFixed(3));
		output += "</span><br>";
	}
	output += "<hr>";
	for(i = 0; i < data.properties[0].length; i++) {
		output += "<span class='forceleft attribute'>"
		output += data.properties[0][i];
		output +="</span> <span class='forceright attribute'>";
		output += data.properties[1][i];
		output += "</span><br>";
	}
	return output;
}

var quicktime = 0;
var time_payback = new Date();

//nauvis.gain("wood", 10000, 0);
//nauvis.gain("wood", 10000, 1);
nauvis.gain("soil", 100, 0);
setInterval(timer, 1000/tickspeed);
function timer() {
	var t2 = new Date();
	var difference = t2 - time_payback;
	//console.log(difference);
	if(difference > 2000 / tickspeed && quicktime == 0) {
		quicktime = Math.floor(difference / (1000 / tickspeed));
		quicktime = Math.min(1500, quicktime);
		console.log("Quicktime Activated for " + quicktime + " ticks");
		for(quicktime; quicktime > 0; quicktime--) {
			timer();
		}
	}
	time_payback = t2;
	
	//Reset Display State////////////////////////////////////////
	nauvis.refresh();
	
	nauvis.checkBuildings();
	Game.purgeButtons();
	Game.purgeResources();
	Game.purgeConfigurators();
	Game.purgeNavbar();
	Game.createNavbar(nauvis);
	Game.createNavbar(boris);
	Game.createNavbar(combat);
	Game.createNavbar(forging);
	Game.createNavbar(equips);
	
	nauvis.checkTools("nauvis");
	SpecialButtons.tickingHarvestWood(nauvis);
	SpecialButtons.tickingHarvestSoil(nauvis);
	SpecialButtons.tickingHarvestStone(nauvis);
	/////////////////////////////////////////////////////////////
	
	if(Game.activeZone == "Clearing") {
		nauvis.createResources();
		Game.createTools(nauvis, "nauvis")
		Game.createBuildings(nauvis, "nauvis")
		Game.createSpecialButton(nauvis, "SpecialButtons.harvestWood(nauvis)", "Collect Wood", "nauvisHarvestWood");
		Game.createSpecialButton(nauvis, "SpecialButtons.harvestStone(nauvis)", "Collect Stone", "nauvisHarvestStone");
		Game.createTooltip("nauvisHarvestWood", tooltipGeneric(["wood in queue:", nauvis.specialCounters.woodQueue + "/" + nauvis.specialCounters.woodQueueMax, "harvest progress:", nauvis.specialCounters.woodTime + "/" + nauvis.specialCounters.woodTimeMax]));
		Game.createTooltip("nauvisHarvestStone", tooltipGeneric(["stone in queue:", nauvis.specialCounters.stoneQueue + "/" + nauvis.specialCounters.stoneQueueMax, "harvest progress:", nauvis.specialCounters.stoneTime + "/" + nauvis.specialCounters.stoneTimeMax]));
		
		if(nauvis.flags.misc.unlockedSoil == true) {
			Game.createSpecialButton(nauvis, "SpecialButtons.harvestSoil(nauvis)", "Collect Soil", "nauvisHarvestSoil");
			Game.createTooltip("nauvisHarvestSoil", tooltipGeneric(["soil in queue:", nauvis.specialCounters.soilQueue + "/" + nauvis.specialCounters.soilQueueMax, "harvest progress:", nauvis.specialCounters.soilTime + "/" + nauvis.specialCounters.soilTimeMax]));
		}
		
		//if(nauvis.flags.misc.unlockedSoil == true) {
		//	Game.createBuildingButton(nauvis, "nauvis", "farm", "nauvisBuildFarm");
		//	Game.createTooltip("nauvisBuildFarm", tooltipBuilding("farm", "normal", nauvis));
		//}
		if(nauvis.flags.buildings.farm == 2) {
			Game.createConfigurator(nauvis, "nauvis", "farm", "Farm Configuration", "nauvisConfigFarm");
			Game.createConfiguratorToggle(nauvis, "nauvis", "nauvisConfigFarm", "farm");
		}
		
		//Game.createConfiguratorMode(nauvis, "nauvis", "nauvisConfigFarm", "farm", "fibers", "Fibrous Stalks", "nauvisConfigModeFibers");
		//Game.createTooltip("nauvisConfigModeFibers", tooltipBuilding("farm", "fibers", nauvis));
		//Game.createConfiguratorMode(nauvis, "nauvis", "nauvisConfigFarm", "farm", "resin", "Resiny Bark", "nauvisConfigModeResin");
		//Game.createTooltip("nauvisConfigModeResin", tooltipBuilding("farm", "resin", nauvis));
		if(nauvis.amount("wood") > 10 && nauvis.flags.tools.tieroneAxe == 0) {
			nauvis.flags.misc.unlockedSoil = true;
			nauvis.flags.tools.tieroneAxe = 1;
			console.log("BITCH");
		}
		
		if(nauvis.amount("soil") > 10 && nauvis.flags.buildings.farm == 0) {
			nauvis.flags.buildings.farm = 1;
			console.log("owo");
		}
		
	}
	
	if(Game.activeZone == "Testville") {
		Game.createSpecialButton(nauvis, "SpecialButtons.harvestWood(nauvis)", "Collect Wood", "nauvisHarvestWood");
	}
	
	if(Game.activeZone == "Combat") {
		document.getElementById("combatZone").hidden = false;
		document.getElementById("forgeZone").hidden = true;
		document.getElementById("equipZone").hidden = true;
	} else document.getElementById("combatZone").hidden = true;
	
	if(Game.activeZone == "Forging") {
		document.getElementById("combatZone").hidden = true;
		document.getElementById("forgeZone").hidden = false;
		document.getElementById("equipZone").hidden = true;
	} else document.getElementById("forgeZone").hidden = true;
	
	if(Game.activeZone == "Equips") {
		document.getElementById("combatZone").hidden = true;
		document.getElementById("forgeZone").hidden = true;
		document.getElementById("equipZone").hidden = false;
	} else document.getElementById("equipZone").hidden = true;
	
	nauvis.earnIncome();
}

/*

var materials = {
	zoneCore: {
		levelupThresholds: [10, 100, 1000],
		level: 0,
		experience: 0,
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
		mud: 0,
		glass: 0,
		bronze: 0,
		brass: 0,
		ironore: 0,
		ironingot: 0,
		coal: 0
	},
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

//stone shovel
var toolstation11 = {
	cost: [25, 15, 10],
	material: ["stone", "wood", "clay"],
	attributes: [3, 5], //time mod, queue mod
	id: "10",
};

//bronze shovel
var toolstation12 = {
	cost: [5, 50, 25],
	material: ["bronze", "wood", "clay"],
	attributes: [2, 6, 5], //time mod, queue mod, clay chance
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

//storehouse
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

var coastPost = {
	cost: [40, 3, 8],
	material: ["wood", "copperingot", "manpower"],
	call: "coastPost",
	ratio: [1.15],
	attributes: [2], //doubling chance
	classifications: []
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


//setInterval(timer, 1000/tickspeed);

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


function timer() {
	saveGame();
	
	configSmelter.active = buildings.smelter;
	for(s = 0; s < metallurgy.globalnames.length; s++) {
		configSmelter.active -= configSmelter[metallurgy.globalnames[s]];
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
*/