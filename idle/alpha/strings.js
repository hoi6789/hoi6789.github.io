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
		blurb: "Use the power of wood to harvest more wood.",
		attributes: ["Wood Time Max: -", "Wood Queue Max: +"],
		attributes2: ["", ""]
	},
	toolstation3: {
		blurb: "A truly marvelous invention that compensates for the lack of stone production upgrades.",
		attributes: ["Stone Time Max: -", "Stone Queue Max: +"],
		attributes2: ["", ""]
	},
	toolstation4: {
		blurb: "Just barely sharper than the wooden axe, not like it matters.",
		attributes: ["Wood Time Max: -", "Wood Queue Max: +"],
		attributes2: ["", ""]
	},
	toolstation5: {
		blurb: "Increases manual wood production. Much sharper than the wooden axe, which matters this time.",
		attributes: ["Wood Production Multiplier: x"],
		attributes2: [""]
	},
	toolstation6: {
		blurb: "Increases manual stone production. Good to get before the other copper tools, but I won't stop you.",
		attributes: ["Stone Production Multiplier: x"],
		attributes2: [""]
	},
	toolstation7: {
		blurb: "Increases manual science production. Finally, some scientific method and matter.",
		attributes: ["Science Production Multiplier: x"],
		attributes2: [""]
	},
	toolstation8: {
		blurb: "You can see clearly now; manpower contributes more towards explored area.",
		attributes: ["Exploration Multiplier: x"],
		attributes2: [""]
	},
	toolstation9: {
		blurb: "Allows you to find Iron and Coal in stone. This is because Iron and Coal are both aeraminemagnetic.",
		attributes: ["Copper Chance: +"],
		attributes2: ["%"]
	},
	toolstation10: {
		blurb: "Allows you to use coal as fuel in smelter recipes. Coal is 4x more efficient than wood. Try not to worry about global warming in this game.",
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
		blurb: "Find ores in stone. You can finally use things other than your bare hands and junk you picked off the ground.",
		attributes: ["Unlocks: Ores/Metals"],
		attributes2: [""]
	},
	research4: {
		blurb: "Learn how to grow plants. Good for not starving to death, if starvation existed.",
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
		blurb: "If you call a table cluttered with stone tools a research station. Allows you to produce science.",
		attributes: ["Science Bonus: +", "Science Storage: +"],
		attributes2: ["%", ""]
	},
	campsiteStorage1: {
		blurb: "The first law of hammerspace declares that if you have a box, you can put a greater amount of items in the box than in an equal amount of air. Why? Hax.",
		attributes: [],
		attributes2: []
	},
	campsiteStorage2: {
		blurb: "The second law of hammerspace declares that the more expensive the storage container, the greater the effects of the first law. Why? More hax.",
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
		blurb: "Smelt materials into different forms. Don't put your bare hands in it.",
		attributes: [],
		attributes2: []
	}
}

var combat_status_names = {
	burn: "Burn",
	buff: "Buffs",
	debuff: "Debuffs"
}