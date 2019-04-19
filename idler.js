var tickspeed = 200; //should be 200 in release ver
var wood = 0;
var woodraw = 0;
var woodcut = 0;
var stone = 0;
var science = 0;
var copperore = 0;
var copperingot = 0;
var tinore = 0;
var tiningot = 0;
var zincore = 0;
var zincingot = 0;
var manpower = 0;
var clay = 0;
var clayE = 0;
var sand = 0;
var sandE = 0;
var glass = 0;
var naviData = 0;
var EnaviData = 0;
//wood pickaxe
//check, costwood
var toolstation1 = [0, 30];
//wood axe
//check, costwood, time, queue
var toolstation2 = [0, 10, 3, 1];
//stone pickaxe
//check, costwood, coststone, time, queue
var toolstation3 = [0, 30, 15, 3, 1];
//stone axe
//check, costwood, coststone, time, queue
var toolstation4 = [0, 15, 30, 2, 2];
//copper axe
//check, costwood, costcopper, mult
var toolstation5 = [0, 25, 5, 1.2];
//copper pickaxe
//check, costwood, costcopper, mult
var toolstation6 = [0, 25, 5, 1.2];
//copper instruments
//check, costcopper, mult
var toolstation7 = [0, 5, 1.2];
//copper optics
//check, costglass, costcopper, mult
var toolstation8 = [0, 25, 5, 1.2];
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
var research4 = [0, 60];
//mining
//check, costscience
var research5 = [0, 60];
//metallurgy
//check, costscience
var research6 = [0, 90];
document.getElementById("explorationzone").setAttribute("hidden", true);
document.getElementById("coastEzone").setAttribute("hidden", true);
document.getElementById("naviExploration").setAttribute("hidden", true);
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
	exploration[0] += manpower * exploration[1];
	manpower = 0;
}
function caravanCoast() {
	if(manpower >= caravan1[0]) {
		document.getElementById("caravanCoast").setAttribute("disabled", true);
		if(sandE >= caravan1[2]) {
			sandE -= caravan1[2];
			var tempsand = caravan1[2];
		}	else {
			var tempsand = sandE;
			sandE = 0;
		}
		if(clayE >= caravan1[3]) {
			clayE -= caravan1[3];
			var tempclay = caravan1[3];
		}	else {
			var tempclay = clayE;
			clayE = 0;
		}
		setTimeout(function() {sand += tempsand; clay += tempclay; document.getElementById("caravanCoast").removeAttribute("disabled");}, caravan1[1] * tickspeed)
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
				if(wood >= campsiteResearch1[1] * Math.pow(1.15, campsiteResearch1[0])) {
					if(stone >= campsiteResearch1[2] * Math.pow(1.15, campsiteResearch1[0])) {
						spendWood(campsiteResearch1[1] * Math.pow(1.15, campsiteResearch1[0]));
						stone = stone - campsiteResearch1[2] * Math.pow(1.15, campsiteResearch1[0]);
						campsiteResearch1[0]++;
						document.getElementById("harvestScience").removeAttribute("hidden");
					document.getElementById("scienceDisplay").removeAttribute("hidden");
					}
				}
			}
			//Research Station
			
			//Smelt Copper
			function clickSmeltCopper() {
				if(copperore >= 10) {
					if(clay >= 10) {
						copperore -= 10;
						clay -= 10;
						copperingot++;
					}
				}
			}
			//Smelt Copper
			
			//Wooden Pickaxe
      function clickToolstation1() {
        if (wood >= toolstation1[1]) {
          spendWood(toolstation1[1]);
          toolstation1[0] = 1;
					document.getElementById("toolstation1").setAttribute("hidden", true);
					document.getElementById("harvestStone").removeAttribute("hidden");
					document.getElementById("stoneDisplay").removeAttribute("hidden");
        }
      }
			//Wooden Pickaxe
			
			//Wooden Axe
			function clickToolstation2() {
        if (wood >= toolstation2[1]) {
          spendWood(toolstation2[1]);
          toolstation2[0] = 1;
					document.getElementById("toolstation2").setAttribute("hidden", true);
        }
      }
			//Wooden Axe
			
			//Stone Pickaxe
			function clickToolstation3() {
        if (wood >= toolstation3[1]) {
					if(stone >= toolstation3[2]) {
          spendWood(toolstation3[1]);
					stone = stone - toolstation3[2];
          toolstation3[0] = 1;
					document.getElementById("toolstation3").setAttribute("hidden", true);
					}
        }
      }
			//Stone Pickaxe
			
			//Stone Axe
			function clickToolstation4() {
        if (wood >= toolstation4[1]) {
					if(stone >= toolstation4[2]) {
          spendWood(toolstation4[1]);
					stone = stone - toolstation4[2];
          toolstation4[0] = 1;
					document.getElementById("toolstation4").setAttribute("hidden", true);
					}
        }
      }
			//Stone Axe
			
			//Copper Axe
			function clickToolstation5() {
        if (wood >= toolstation5[1]) {
					if(copperingot >= toolstation5[2]) {
          spendWood(toolstation5[1]);
					copperingot = copperingot - toolstation5[2];
          toolstation5[0] = 1;
					document.getElementById("toolstation5").setAttribute("hidden", true);
					}
        }
      }
			//Copper Axe
			
			//Copper Pickaxe
			function clickToolstation6() {
        if (wood >= toolstation6[1]) {
					if(copperingot >= toolstation6[2]) {
          spendWood(toolstation6[1]);
					copperingot = copperingot - toolstation6[2];
          toolstation6[0] = 1;
					document.getElementById("toolstation6").setAttribute("hidden", true);
					}
        }
      }
			//Copper Pickxe
			
			//Copper Instruments
			function clickToolstation7() {
					if(copperingot >= toolstation7[1]) {
					copperingot = copperingot - toolstation7[1];
          toolstation7[0] = 1;
					document.getElementById("toolstation7").setAttribute("hidden", true);
					}
      }
			//Copper Instruments
			
			//Stone Axe
			function clickToolstation8() {
        if (glass >= toolstation8[1]) {
					if(copper >= toolstation8[2]) {
          glass -=(toolstation8[1]);
					copper -= toolstation8[2];
          toolstation8[0] = 1;
					document.getElementById("toolstation8").setAttribute("hidden", true);
					}
        }
      }
			//Stone Axe
			
			//Fire
			 function clickResearch1() {
        if (science >= research1[1]) {
          science = science - research1[1];
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
        if (science >= research2[1]) {
          science = science - research2[1];
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
				 if(science >= research3[1]) {
					 science -= research3[1];
					 research3[0] = 1;
					document.getElementById("research3").setAttribute("hidden", true); document.getElementById("copperDisplay").removeAttribute("hidden");
					 document.getElementById("tinDisplay").removeAttribute("hidden");
					 document.getElementById("zincDisplay").removeAttribute("hidden");
					 document.getElementById("harvestOres").removeAttribute("hidden");
					 document.getElementById("smeltCopper").removeAttribute("hidden");
				 }
			}
			//Geology
loadGame([woodraw,woodcut,stone,science,copperore,copperingot,tinore,tiningot,zincore,zincingot,manpower,clay,clayE,sand,sandE,glass,toolstation1[0],toolstation2[0],toolstation3[0],toolstation4[0],toolstation5[0],toolstation6[0],toolstation7[0],toolstation8[0],campsiteResearch1[0],research1[0],research2[0],research3[0],research4[0],research5[0],research6[0]]);
			
setInterval(timer, tickspeed);

function saveGame(list) {
	for(l = 0; l < list.length; l++) {
		localStorage[l] = list[l];
	}
}

function loadGame(list) {
	for(l = 0; l < list.length; l++) {
		list[l] = localStorage[l];
	}
}



function timer()	{
	saveGame([woodraw,woodcut,stone,science,copperore,copperingot,tinore,tiningot,zincore,zincingot,manpower,clay,clayE,sand,sandE,glass,toolstation1[0],toolstation2[0],toolstation3[0],toolstation4[0],toolstation5[0],toolstation6[0],toolstation7[0],toolstation8[0],campsiteResearch1[0],research1[0],research2[0],research3[0],research4[0],research5[0],research6[0]]);
	function tt_gen(data) {
		var output = "<span class='tooltiptext'> <span class='forceleft'> ";
		output += data[0];
		output += " </span> <span class='forceright'>";
		output += data[1];
		for(i = 2; i < data.length; i++) {
			if(i % 2 == 0) {
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
	wood = woodraw + woodcut
	document.getElementById("woodDisplay").innerHTML = "Wood: " + wood.toFixed(3) + tt_gen(["Timber", woodraw.toFixed(3), "Lumber", woodcut.toFixed(3)]);
	document.getElementById("stoneDisplay").innerHTML = "Stone: " + stone.toFixed(3);
	document.getElementById("scienceDisplay").innerHTML = "Science: " + science.toFixed(3);
	document.getElementById("copperDisplay").innerHTML = "Copper: " + copperingot.toFixed(3) + tt_gen(["Copper Ingots", copperingot.toFixed(3), "Copper Ore", copperore.toFixed(3)]);
	document.getElementById("tinDisplay").innerHTML = "Tin: " + tiningot.toFixed(3) + tt_gen(["Tin Ingots", tiningot.toFixed(3), "Tin Ore", tinore.toFixed(3)]);
	document.getElementById("zincDisplay").innerHTML = "Zinc: " + zincingot.toFixed(3) + tt_gen(["Zinc Ingots", zincingot.toFixed(3), "Zinc Ore", zincore.toFixed(3)]);
	document.getElementById("manpowerDisplay").innerHTML = "Manpower: " + manpower.toFixed(3);
	document.getElementById("sandDisplayE").innerHTML = "Sand: " + sandE.toFixed(3);
	document.getElementById("clayDisplayE").innerHTML = "Clay: " + clayE.toFixed(3);
	document.getElementById("sandDisplay").innerHTML = "Sand: " + sand.toFixed(3);
	document.getElementById("clayDisplay").innerHTML = "Clay: " + clay.toFixed(3);
	
	if(naviData == 0) {
	document.getElementById("naviCampsite").setAttribute("class", "active");
	}
	if(naviData == 1) {
	document.getElementById("naviExploration").setAttribute("class", "active");
	}
	if(EnaviData == 0) {
	document.getElementById("EnaviCoast").setAttribute("class", "activeE");
	}
	
	document.getElementById("tooltipSmeltCopper").innerHTML = "<span class='forceleft'> Copper Ore Cost: </span> <span class='forceright'>" + "10" + "</span> <br> <span class='forceleft' > Clay Cost: </span> <span class='forceright'>" + "10" + "</span>";
	
	document.getElementById("campsiteResearch1").innerHTML = "Research Station (" + campsiteResearch1[0] + ")";
	
	document.getElementById("tooltipCampsiteResearch1").innerHTML = "Allows you to conduct research. <hr> <span class='forceleft'>Wood</span> <span class='forceright'> " + (campsiteResearch1[1] * Math.pow(1.15, campsiteResearch1[0])).toFixed(3) + "</span> <br> <span class='forceleft'> Stone </span> <span class='forceright'> " + (campsiteResearch1[2] * Math.pow(1.15, campsiteResearch1[0])).toFixed(3) + "</span> <br><hr> <span class='attribute'> Science Bonus: " + campsiteResearch1[3] + "%</span>";
	
	document.getElementById("tooltipToolstation1").innerHTML = "Allows you to harvest stone. <hr> <span class='forceleft'>Wood</span> <span class='forceright'> " + toolstation1[1] + "</span> ";
	
	document.getElementById("tooltipToolstation2").innerHTML = "Harvest wood faster. <hr> <span class='forceleft'>Wood</span> <span class='forceright'> " + toolstation2[1] + "</span> <br> <hr> <span class='attribute'> Wood Time Max: -" + toolstation2[2] + "</span> <br> <span class='attribute'> Wood Queue Max: +" + toolstation2[3] + "</span>";
	
	document.getElementById("tooltipToolstation3").innerHTML = "Harvest stone faster. <hr> <span class='forceleft'>Wood</span> <span class='forceright'> " + toolstation3[1] + "</span> <br> <span class='forceleft'> Stone </span> <span class='forceright'> " + toolstation3[2] + "</span> <br><hr> <span class='attribute'> Stone Time Max: -" + toolstation3[3] + "</span> <br> <span class='attribute'> Stone Queue Max: +" + toolstation3[4] + "</span>";
	
	document.getElementById("tooltipToolstation4").innerHTML = "Harvest wood faster. <hr> <span class='forceleft'>Wood</span> <span class='forceright'> " + toolstation4[1] + "</span> <br> <span class='forceleft'> Stone </span> <span class='forceright'> " + toolstation4[2] + "</span> <br><hr> <span class='attribute'> Wood Time Max: -" + toolstation4[3] + "</span> <br> <span class='attribute'> Wood Queue Max: +" + toolstation4[4] + "</span>";
	
	document.getElementById("tooltipToolstation5").innerHTML = "Increase manual wood production. <hr> <span class='forceleft'>Wood</span> <span class='forceright'> " + toolstation5[1] + "</span> <br> <span class='forceleft'> Copper </span> <span class='forceright'> " + toolstation5[2] + "</span> <br><hr> <span class='attribute'> Wood Production Multiplier: x" + toolstation5[3] + "</span>";
	
	document.getElementById("tooltipToolstation6").innerHTML = "Increase manual stone production. <hr> <span class='forceleft'>Wood</span> <span class='forceright'> " + toolstation6[1] + "</span> <br> <span class='forceleft'> Copper </span> <span class='forceright'> " + toolstation6[2] + "</span> <br><hr> <span class='attribute'> Stone Production Multiplier: x" + toolstation6[3] + "</span>";
	
	document.getElementById("tooltipResearch1").innerHTML = "Discover fire. Required for all other research upgrades. <hr> <span class='forceleft'>Science</span> <span class='forceright'> " + research1[1] + "</span> ";
	
	document.getElementById("tooltipResearch2").innerHTML = "Look around you. Discover new things.<hr> <span class='forceleft'>Science</span> <span class='forceright'> " + research2[1] + "</span> <br> <hr> <span class='attribute'>Unlocks: Manpower/Exploration</span>";
	
	document.getElementById("tooltipResearch3").innerHTML = "Find ores in stone. <hr> <span class='forceleft'>Science</span> <span class='forceright'> " + research3[1] + "</span> <br> <hr> <span class='attribute'>Unlocks: Ores/Metals</span>";
	
	document.getElementById("tooltipResearch4").innerHTML = "Learn how to grow plants. TBA<hr> <span class='forceleft'>Science</span> <span class='forceright'> " + research4[1] + "</span> <br> <hr> <span class='attribute'>Unlocks: Growing Plants</span>";
{
	//Research Station
	if(stone >= campsiteResearch1[2] * 0.3) {
		document.getElementById("campsiteResearch1").removeAttribute("hidden");
	}
	//Research Station
	
	//Wooden Pickaxe
	if(wood >= toolstation1[1] * 0.3)	{
		if(toolstation1[0] != 1) {
			document.getElementById("toolstation1").removeAttribute("hidden");
		}
	}
	//Wooden Pickaxe
	
	//Wooden Axe
	if(wood >= toolstation2[1] * 0.3)	{
		if(toolstation2[0] != 1) {
			document.getElementById("toolstation2").removeAttribute("hidden");
		}
	}
	
		if(toolstation2[0] == 1) {
			woodTimeMax = woodTimeMax - toolstation2[2];
			woodQueueMax = woodQueueMax + toolstation2[3];
		}
	//Wooden Axe
	
	//Stone Pickaxe
	if(stone >= toolstation3[2] * 0.3)	{
		if(toolstation3[0] != 1) {
			document.getElementById("toolstation3").removeAttribute("hidden");
		}
	}
	
		if(toolstation3[0] == 1) {
			stoneTimeMax = stoneTimeMax - 3;
			stoneQueueMax = stoneQueueMax + 1;
		}
	//Stone Pickaxe
	
	//Stone Axe
	if(stone >= toolstation4[2] * 0.3)	{
		if(toolstation4[0] != 1) {
			document.getElementById("toolstation4").removeAttribute("hidden");
		}
	}
	
		if(toolstation4[0] == 1) {
			woodTimeMax = woodTimeMax - 2;
			woodQueueMax = woodQueueMax + 2;
		}
	//Stone Axe
	
	//Copper Axe
	if(copperingot >= toolstation5[2] * 0.3)	{
		if(toolstation5[0] != 1) {
			document.getElementById("toolstation5").removeAttribute("hidden");
		}
	}
	
		if(toolstation5[0] == 1) {
			woodTimeMax = woodTimeMax - 2;
			woodQueueMax = woodQueueMax + 2;
		}
	//Copper Axe
	
	//Fire
	if(science >= 1)	{
		if(research1[0] != 1) {
			document.getElementById("research1").removeAttribute("hidden");
		}
	}
	//Fire
	
	if(research2[0] != 1) {
		document.getElementById("naviExploration").style.display = "none";
	}
	
	//Coast
	if(exploration[0] >= exploration[2]) {
		document.getElementById("EnaviCoast").style.display = "block";
	}
	//Coast

}
{
	document.getElementById("tooltipHarvestWood").innerHTML = "<span class='forceleft'> Wood in Queue: </span> <span class='forceright'>" + woodQueue + "</span> <br> <span class='forceleft' > Wood Time: </span> <span class='forceright'>" + woodTime + "</span> <br> <span class='forceleft'> Wood Queue Max: </span> <span class='forceright'>" + woodQueueMax + "</span> <br> <span class='forceleft'> Wood Time Max: </span> <span class='forceright'>" + woodTimeMax + "</span>";
	document.getElementById("tooltipHarvestStone").innerHTML = "<span class='forceleft'> Stone in Queue: </span> <span class='forceright'>" + stoneQueue + "</span> <br> <span class='forceleft' > Stone Time: </span> <span class='forceright'>" + stoneTime + "</span> <br> <span class='forceleft'> Stone Queue Max: </span> <span class='forceright'>" + stoneQueueMax + "</span> <br> <span class='forceleft'> Stone Time Max: </span> <span class='forceright'>" + stoneTimeMax + "</span>";
	document.getElementById("tooltipHarvestScience").innerHTML = "<span class='forceleft'> Science in Queue: </span> <span class='forceright'>" + scienceQueue + "</span> <br> <span class='forceleft' > Science Time: </span> <span class='forceright'>" + scienceTime + "</span> <br> <span class='forceleft'> Science Queue Max: </span> <span class='forceright'>" + scienceQueueMax + "</span> <br> <span class='forceleft'> Science Time Max: </span> <span class='forceright'>" + scienceTimeMax + "</span>";
	document.getElementById("tooltipHarvestOres").innerHTML = "<span class='forceleft'> Stone Cost: </span> <span class='forceright'>" + geology[0] + "</span> <br> <span class='forceleft' > Productivity: </span> <span class='forceright'>" + geology[1] + "</span> <br> <span class='forceleft'> Copper Chance: </span> <span class='forceright'>" + geology[2] + "</span> <br> <span class='forceleft'> Tin Chance: </span> <span class='forceright'>" + geology[3] + "</span> <br> <span class='forceleft'> Zinc Chance: </span> <span class='forceright'>" + geology[4] + "</span>";
	document.getElementById("tooltipExplore").innerHTML = "<span class='forceleft'> Explored Area: </span> <span class='forceright'>" + exploration[0] + "</span> <br> <span class='forceleft' > Productivity: </span> <span class='forceright'>" + exploration[1] + "</span>";
	document.getElementById("tooltipHarvestManpower").innerHTML = "<span class='forceleft'> Manpower Time: </span> <span class='forceright'>" + manpowerTime + "</span> <br> <span class='forceleft' > Manpower Time Max: </span> <span class='forceright'>" + manpowerTimeMax + "</span>";
	document.getElementById("tooltipHarvestSand").innerHTML = "<span class='forceleft'> Sand in Queue: </span> <span class='forceright'>" + sandQueue + "</span> <br> <span class='forceleft' > Sand Time: </span> <span class='forceright'>" + sandTime + "</span> <br> <span class='forceleft'> Sand Queue Max: </span> <span class='forceright'>" + sandQueueMax + "</span> <br> <span class='forceleft'> Sand Time Max: </span> <span class='forceright'>" + sandTimeMax + "</span> <br> <span class='forceleft'> Clay Chance: </span> <span class='forceright'>" + sandClay * 100 + "%</span>";
}
	
	
{
	if(woodQueue > 0)	{
		if(woodQueue > woodQueueMax)	{
			woodQueue = woodQueueMax;
		}
		woodTime++;
		if(woodTime >= woodTimeMax)	{
			var woodmult = 1;
			if(toolstation5[0] == 1) {
				woodmult *= toolstation5[3];
			}
			woodTime = 0;
			woodraw += woodmult;
			woodQueue--;
		}
	}
			woodTimeMax = 15; 
			woodQueueMax = 5;
			
	if(stoneQueue > 0)	{
		if(stoneQueue > stoneQueueMax)	{
			stoneQueue = stoneQueueMax;
		}
		stoneTime++;
		if(stoneTime >= stoneTimeMax)	{
			stoneTime = 0;
			stone++;
			if(research3[0] == 1) {
				var natcopper = (Math.random());
				if(natcopper >= 0.9) {
					copperore++;
				}
			}
			stoneQueue--;
		}
	}
			stoneTimeMax = 15; 
			stoneQueueMax = 5;
	
	if(scienceQueue > 0)	{
		if(scienceQueue > scienceQueueMax)	{
			scienceQueue = scienceQueueMax;
		}
		scienceTime++;
		if(scienceTime >= scienceTimeMax)	{
			scienceTime = 0;
			var scienceprodtemp = (Math.random() * (3 * (campsiteResearch1[0] * ((campsiteResearch1[3] / 100) + 1))));
			science = science + scienceprodtemp;
			scienceQueue--;
		}
	}
			scienceTimeMax = 25; 
			scienceQueueMax = 3;
	
	if(oresQueue > 0) {
		if(stone >= geology[0]) {
			for(i = 0; i < geology[1]; i++) {
				var geocopper = Math.random();
				if(geocopper <= (geology[2] / 100)) {
					copperore++;
				}
				var geotin = Math.random();
				if(geotin <= (geology[3] / 100)) {
					tinore++;
				}
				var geozinc = Math.random();
				if(geozinc <= (geology[4] / 100)) {
					zincore++;
				}
			}
			oresQueue--
			stone -= geology[0];
		}
	}
	if(research2[0] == 1) {
	manpowerTime++
	if(manpowerTime >= manpowerTimeMax) {
		manpower++;
		manpowerTime = 0;
	}
	}
	manpowerTimeMax = 100;
	
	if(sandQueue > 0)	{
		if(sandQueue > sandQueueMax)	{
			sandQueue = sandQueueMax;
		}
		sandTime++;
		if(sandTime >= sandTimeMax)	{
			sandTime = 0;
			sandE++;

				var claygen = (Math.random());
				if(claygen >= sandClay) {
					clayE++;
				}
			sandQueue--;
		}
	}
			sandTimeMax = 20; 
			sandQueueMax = 4;
}
}
			
			function spendWood(purchase) {
				if(woodcut >= purchase) {
					woodcut -= purchase;
				}
				else {
					purchase -= woodcut;
					woodcut = 0;
					woodraw -= purchase;
				}
			}
