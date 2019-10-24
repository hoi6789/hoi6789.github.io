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
	coal: "Coal"
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
		blurb: "Increase manual wood production.",
		attributes: ["Wood Production Multiplier: x"],
		attributes2: [""]
	},
	toolstation6: {
		blurb: "Increase manual stone production.",
		attributes: ["Stone Production Multiplier: x"],
		attributes2: [""]
	},
	toolstation7: {
		blurb: "Increase manual science production.",
		attributes: ["Science Production Multiplier: x"],
		attributes2: [""]
	},
	toolstation8: {
		blurb: "Increase the exploration multiplier.",
		attributes: ["Exploration Multiplier: x"],
		attributes2: [""]
	},
	toolstation9: {
		blurb: "Allows you to find Iron and Coal in stone.",
		attributes: ["Copper Chance: +"],
		attributes2: ["%"]
	},
	toolstation10: {
		blurb: "Allows you to use coal as fuel in smelter recipes. Coal is 4x more efficient than wood.",
		attributes: [],
		attributes2: []
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
		attributes: ["Unlocks: Agri Plots"],
		attributes2: [""]
	},
	research5: {
		blurb: "A new way to obtain stone.",
		attributes: ["Unlocks: Mines"],
		attributes2: [""]
	},
	research6: {
		blurb: "Smelt materials into different forms.",
		attributes: ["Unlocks: Smelters"],
		attributes2: [""]
	},
	research7: {
		blurb: "Unlock better ways to store items.",
		attributes: ["Unlocks: Storehouses"],
		attributes2: [""]
	},
	research8: {
		blurb: "Allows the creation of alloys in smelters.",
		attributes: ["Unlocks: Bronze/Brass"],
		attributes2: [""]
	},
	campsiteResearch1: {
		blurb: "Allows you to conduct research.",
		attributes: ["Science Bonus: +", "Science Storage: +"],
		attributes2: ["%", ""]
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
	campsiteSmelter: {
		blurb: "Smelt materials into different forms.",
		attributes: [],
		attributes2: []
	}
}

var combat_status_names = {
	burn: "Burn",
	buff: "Buffs",
	debuff: "Debuffs"
}