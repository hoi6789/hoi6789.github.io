var materialNames = {
	fuel: "Fuel",
	wood: "Wood",
	woodraw: "Timber",
	woodcut: "Lumber",
	stone: "Stone",
	science: "Science",
	manpower: "Manpower",
	exploredarea: "Explored Area",
	copperore: "Copper Ore",
	copperingot: "Copper Ingot",
	tinore: "Tin Ore",
	tiningot: "Tin Ingot",
	zincore: "Zinc Ore",
	zincingot: "Zinc Ingot - Deprecated",
	clay: "Clay",
	clayE: "Clay",
	sand: "Sand",
	sandE: "Sand",
	glass: "Glass",
	bronze: "Bronze",
	brass: "Brass",
	ironore: "Iron Ore",
	ironingot: "Iron Ingot",
	coal: "Coal",
	steel: "Steel",
}

var universalStrings = {
	toolstation1: {
		blurb: "Allows you to harvest stone.",
		attributes: [],
		attributes2: []
	},
	toolstation2: {
		blurb: "Harvest wood faster.",
		attributes: ["Wood Time Max: -", "Wood Queue Max: +"],
		attributes2: ["", ""]
	},
	toolstation3: {
		blurb: "Harvest stone faster.",
		attributes: ["Stone Time Max: -", "Stone Queue Max: +"],
		attributes2: ["", ""]
	},
	toolstation4: {
		blurb: "Harvest wood faster.",
		attributes: ["Wood Time Max: -", "Wood Queue Max: +"],
		attributes2: ["", ""]
	},
	toolstation5: {
		blurb: "Increase wood production.",
		attributes: ["Wood Production Multiplier: x"],
		attributes2: [""]
	},
	toolstation6: {
		blurb: "Increase stone production.",
		attributes: ["Stone Production Multiplier: x"],
		attributes2: [""]
	},
	toolstation7: {
		blurb: "Increase science production. Research Stations produce science.",
		attributes: ["Science Production Multiplier: x", "Science per Station: "],
		attributes2: ["", ""]
	},
	toolstation8: {
		blurb: "Increase the exploration multiplier.",
		attributes: ["Exploration Multiplier: x"],
		attributes2: [""]
	},
	toolstation9: {
		blurb: "Allows you to find Iron and Coal while analyzing ores. Gain more ores from Excavators.",
		attributes: ["Ore Bonus: +"],
		attributes2: ["%"]
	},
	toolstation10: {
		blurb: "Allows you to use coal as fuel in smelter recipes. Coal is 4x more efficient than wood.",
		attributes: [],
		attributes2: []
	},
	toolstation11: {
		blurb: "Produce compost from waste material. Forestries produce sand and clay.",
		attributes: ["Sand per Forestry: ", "Clay per Forestry: "],
		attributes2: ["/s", "/s"]
	},
	toolstation12: {
		blurb: "Produce more wood.",
		attributes: ["Wood Production Multiplier: x"],
		attributes2: [""]
	},
	toolstation13: {
		blurb: "Increase ores obtained through analysis.",
		attributes: ["Analyze Productivity +"],
		attributes2: [""]
	},
	toolstation14: {
		blurb: "Produce more stone.",
		attributes: ["Stone Production Multiplier: x"],
		attributes2: [""]
	},
	toolstation15: {
		blurb: "Produce more sand and clay.",
		attributes: ["Sand and Clay Multiplier: +"],
		attributes2: ["%"]
	},
	toolstation16: {
		blurb: "Excavators also produce Coal and Iron.",
		attributes: ["Coal Production: ", "Iron Production: "],
		attributes2: ["/s", "/s"]
	},
	toolstation17: {
		blurb: "Mines improve ore production.",
		attributes: ["Ore Bonus per Mine: "],
		attributes2: ["%"]
	},
	toolstation18: {
		blurb: "Factories improve mineral production.",
		attributes: ["Ore/Stone Bonus per Mine: "],
		attributes2: ["%"]
	},
	toolstation19: {
		blurb: "Produce more wood.",
		attributes: ["Stone Production Multiplier: x"],
		attributes2: [""]
	},
	toolstation20: {
		blurb: "Factories improve wood production.",
		attributes: ["Stone Production Multiplier: x"],
		attributes2: [""]
	},
	toolstation21: {
		blurb: "Sawmills begin converting raw wood into Lumber. Lumber can be used like wood in recipes.",
		attributes: ["Stone Production Multiplier: x"],
		attributes2: [""]
	},
	toolstation22: {
		blurb: "Excavators also produce Sand and Clay.",
		attributes: ["Stone Production Multiplier: x"],
		attributes2: [""]
	},
	toolstation23: {
		blurb: "Produce more science.",
		attributes: ["Stone Production Multiplier: x"],
		attributes2: [""]
	},
	research1: {
		blurb: "Discover fire. Required for all other research upgrades.",
		attributes: [],
		attributes2: []
	},
	research2: {
		blurb: "Look around you. Discover new things.",
		attributes: ["Unlocks: Manpower/Exploration"],
		attributes2: [""]
	},
	research3: {
		blurb: "Find ores in stone.",
		attributes: ["Unlocks: Ores/Metals"],
		attributes2: [""]
	},
	research4: {
		blurb: "Learn how to grow plants.",
		attributes: ["Unlocks: Forestry Upgrades"],
		attributes2: [""]
	},
	research5: {
		blurb: "A new way to obtain stone.",
		attributes: ["Unlocks: Mine Upgrades"],
		attributes2: [""]
	},
	research6: {
		blurb: "Smelt materials into different forms.",
		attributes: ["Unlocks: Smelters"],
		attributes2: [""]
	},
	research7: {
		blurb: "Unlock better ways to store items.",
		attributes: ["Unlocks: Storage Crates"],
		attributes2: [""]
	},
	research8: {
		blurb: "Allows the creation of alloys in smelters.",
		attributes: ["Unlocks: Bronze/Brass"],
		attributes2: [""]
	},
	research9: {
		blurb: "Allows for the delegation of tasks.",
		attributes: ["Unlocks: Forestries/Mines"],
		attributes2: [""]
	},
	research10: {
		blurb: "Allows for construction of massive machinery.",
		attributes: ["Unlocks: Factories"],
		attributes2: [""]
	},
	campsiteResearch1: {
		blurb: "Allows you to conduct research.",
		attributes: ["Science Bonus: +", "Science Storage: +"],
		attributes2: ["%", ""]
	},
	campsiteResearch2: {
		blurb: "Increased research storage.",
		attributes: ["Science Storage: +"],
		attributes2: [""]
	},
	campsiteStorage1: {
		blurb: "Increases resource storage.",
		attributes: [],
		attributes2: []
	},
	campsiteStorage2: {
		blurb: "Increases resource storage.",
		attributes: [],
		attributes2: []
	},
	campsiteFarm: {
		blurb: "Produces wood over time.",
		attributes: ["Wood Production: "],
		attributes2: ["/sec"]
	},
	campsiteMine: {
		blurb: "Produces stone over time.",
		attributes: ["Stone Production: "],
		attributes2: ["/sec"]
	},
	campsiteFarm2: {
		blurb: "Produces wood over time. Increases Forestry production.",
		attributes: ["Wood Production: ", "Forestry Production Bonus: "],
		attributes2: ["/sec", "%"]
	},
	campsiteMine2: {
		blurb: "Produces ores over time. Increases stone production.",
		attributes: ["Copper Ore Production: ", "Tin Ore Production: ", "Zinc Production: ", "Stone Bonus: "],
		attributes2: ["/sec", "/sec", "/sec", "%"]
	},
	campsiteSmelter: {
		blurb: "Smelt materials into different forms.",
		attributes: [],
		attributes2: []
	},
	campsiteWaypost: {
		blurb: "Increases manpower gain. Explored Area increases clay chances.",
		attributes: ["Manpower Production: +", "Bonus Manual Clay: "],
		attributes2: ["%", "%/area"]
	},
	campsiteFactory: {
		blurb: "Prints Medallions and earns you Score. CANNOT BE TURNED OFF.",
		attributes: ["Iron Consumed: ", "Bronze Consumed: ", "Brass Consumed: ", "Coal Consumed: ", "Medallions Produced: ", "Score Earned: "],
		attributes2: ["/s", "/s", "/s", "/s", "/s", ""]
	},
}

var combat_status_names = {
	burn: "Burn",
	buff: "Buffs",
	debuff: "Debuffs"
}