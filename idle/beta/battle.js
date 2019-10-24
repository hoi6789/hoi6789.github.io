function decimalPlaces(num) {
  var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) { return 0; }
  return Math.max(
       0,
       // Number of digits right of decimal point.
       (match[1] ? match[1].length : 0)
       // Adjust for scientific notation.
       - (match[2] ? +match[2] : 0));
}

var combat_team1 = [];
var combat_team2 = [];
var combat_graveyard1 = [];
var combat_graveyard2 = [];
var fighters = [];
var fighters_safe = [];
var awaitingInput = false;
var c_inputUser;
var c_skillUsed;


class combat_status_object {
	constructor(name, param, power, duration, chance, user, target) {
		this.name = name;
		this.param = param;
		this.power = power;
		this.duration = duration;
		this.chance = chance;
		this.target = target;
		this.user = user;
	}
	send() {
		var _roll = Math.random();
		if(typeof(this.target.statusResists[this.name]) == "undefined") {
			_roll *= 1;
		} else {
			_roll /= this.target.statusResists[this.name];
		}
		if(_roll < this.chance) {
			this.target.statusList.push(this);
		}
	}
	execute() {
		switch(this.name) {
			case "burn":
				var damage_event = new combat_damage_object("Burn", this.power, 1, "none", 999, 999, this.target, "fire");
				damage_event.send();
				break;
			case "buff":
				var _buffPower = (this.power / 100) + 1;
				this.target[this.param] *= _buffPower;
				break;
			case "debuff":
				var _buffPower = (this.power / 100) - 1;
				if(_buffPower > -0.1) {
					_buffPower = -0.1;
				}
				_buffPower = Math.abs(_buffPower);
				this.target[this.param] *= _buffPower;
				break;
		}
		this.duration--;
	}
}

class combat_player_skill {
	constructor(name, power, atk, type, acc, accMod, target, element, special, status, special2) {
		this.name = name;
		this.power = power * atk;
		this.acc = acc * accMod;
		this.target = target;
		this.type = type;
		this.element = element;
		this.status = status;
		this.special = special;
	}
}

class combat_damage_object {
	constructor(user, name, power, atk, type, acc, accMod, target, element, weapon) {
		this.user = user;
		this.name = name;
		this.power = power * atk;
		this.acc = acc * accMod;
		this.target = target;
		this.type = type;
		this.element = element;
		this.status = status;
		this.hit = 0;
		this.weapon = weapon;
		if(typeof(this.user.weapon) != "undefined") {
			for(c_j = 0; c_j < this.user.weapon.primary_effect.length; c_j++) {
				this.user.weapon.primary_effect[c_j].stateOnhitGeneric(this);
			}
		}
		
	}
	send() {
		var _dodge = Math.random();
		if(_dodge > this.acc / this.target.evd) {
			this.hit = 1;
			console.log("Dodge!");
		}
		var _damage = this.power;
		if(typeof(this.target.elementResists[this.element]) == "undefined") {
			_damage *= 1;
		} else {
			_damage *= this.target.elementResists[this.element];
		}
		if(this.type == "atk") {
			_damage /= this.target.def;
		} else if(this.type == "matk") {
			_damage /= this.target.mdef;
		} else {
			_damage /= 1;
		}
		
		if(this.hit == 0) {
			this.target.currentHealth -= Math.round(_damage);
		}
		console.log(this.target.currentHealth);
		if(typeof(this.user.weapon) != "undefined" && this.weapon == true) {
			for(c_j = 0; c_j < this.user.weapon.primary_effect.length; c_j++) {
				this.user.weapon.primary_effect[c_j].stateOnhitWeapon(this);
			}
		}
	}
	inflict(_status) {
		if(this.hit == 0) {
			var _roll = Math.random();
			if(typeof(this.target.statusResists[_status.name]) == "undefined") {
				_roll *= 1;
			} else {
				_roll *= this.target.statusResists[_status.name];
			}
				if(_roll < _status.chance) {
			this.target.statusList.push(_status);
			}
		}
	}
}

function combat_ai(type, param) {
	switch(type) {
		case "lowestBuff": 
			param.charAt(0).toUpperCase();
			var dispTemp = "disp" + param.charAt(0).toUpperCase() + param.substring(1);
			console.log(dispTemp);
			var target_container;
			var debuffFactor;
			for(c_ai = 0; c_ai < combat_team1.length; c_ai++) {
				if(combat_team1[c_ai][param] / combat_team1[c_ai][dispTemp] < debuffFactor || typeof(debuffFactor) == "undefined") {
					target_container = combat_team1[c_ai];
					debuffFactor = combat_team1[c_ai][param] / combat_team1[c_ai][dispTemp];
				}
			}
			return([target_container, debuffFactor]);
			break;
		
	}
}

class combat_fighter_object {
	constructor(startinglevel, level, health, atk, matk, def, mdef, acc, evd, mana, chargemax, tag, side, elementResists, statusResists) {
		this.startinglevel = startinglevel;
		this.level = level;
		this.health = health;
		this.atk = atk;
		this.matk = matk;
		this.def = def;
		this.mdef = mdef;
		this.acc = acc;
		this.evd = evd;
		this.mana = mana;
		this.chargemax = chargemax;
		this.tag = tag;
		this.elementResists = JSON.parse(JSON.stringify(elementResists));
		this.statusResists = JSON.parse(JSON.stringify(statusResists));
		this.statusList = [];
		this.currentHealth = health;
		this.trueElementResists = JSON.parse(JSON.stringify(this.elementResists));
		this.trueStatusResists = JSON.parse(JSON.stringify(this.statusResists));
		this.trueHealth = health;
		this.trueAtk = atk;
		this.trueMatk = matk;
		this.trueDef = def;
		this.trueMdef = mdef;
		this.trueAcc = acc;
		this.trueEvd = evd;
		this.dispHealth = health;
		this.dispAtk = atk;
		this.dispMatk = matk;
		this.dispDef = def;
		this.dispMdef = mdef;
		this.dispAcc = acc;
		this.dispEvd = evd;
		this.currentMana = mana;
		this.charge = 0;
		this.side = side;
		
		if(this.tag == "hero") {
			this.health = Math.floor(this.health * Math.pow(1.14, this.level + 2) * 1.4);
			this.atk = this.atk * Math.pow(1.1, this.level + 2) * 1.4;
			this.matk = this.matk * Math.pow(1.1, this.level + 2) * 1.4;
			this.def = this.def * Math.pow(1.05, this.level + 2) * 1.4;
			this.mdef = this.mdef * Math.pow(1.05, this.level + 2) * 1.4;
			this.acc = this.acc * Math.pow(1.02, this.level + 2) * 1.4;
			this.evd = this.evd * Math.pow(1.02, this.level + 2) * 1.4;
		} else {
			this.health = Math.floor(this.health * Math.pow(1.14, this.startinglevel - 1) * Math.pow(1.182, this.level - this.startinglevel));
			this.atk = this.atk * Math.pow(1.1, this.startinglevel - 1) * Math.pow(1.13, this.level - this.startinglevel);
			this.matk = this.matk * Math.pow(1.1, this.startinglevel - 1) * Math.pow(1.13, this.level - this.startinglevel);
			this.def = this.def * Math.pow(1.05, this.startinglevel - 1) * Math.pow(1.065, this.level - this.startinglevel);
			this.mdef = this.mdef * Math.pow(1.05, this.startinglevel - 1) * Math.pow(1.065, this.level - this.startinglevel);
			this.acc = this.acc * Math.pow(1.02, this.startinglevel - 1) * Math.pow(1.026, this.level - this.startinglevel);
			this.evd = this.evd * Math.pow(1.02, this.startinglevel - 1) * Math.pow(1.026, this.level - this.startinglevel);
		}
		this.dispAtk = this.atk;
		this.dispMatk = this.matk;
		this.dispDef = this.def;
		this.dispMdef = this.mdef;
		this.dispAcc = this.acc;
		this.dispEvd = this.evd;
		this.currentHealth = this.health;
		this.currentMana = this.mana;
		this.charge = 0;
	}
	gametick() {
		if(this.currentHealth > 0) {
			this.charge++;
		}
		if(this.charge >= this.chargemax) {
			this.ai();
			this.charge -= this.chargemax;
		}
	}

	reinit() {
		if(this.tag == "hero") {
			this.health = Math.floor(this.trueHealth * Math.pow(1.14, this.level + 2) * 1.4);
			this.atk = this.trueAtk * Math.pow(1.1, this.level + 2) * 1.4;
			this.matk = this.trueMatk * Math.pow(1.1, this.level + 2) * 1.4;
			this.def = this.trueDef * Math.pow(1.05, this.level + 2) * 1.4;
			this.mdef = this.trueMdef * Math.pow(1.05, this.level + 2) * 1.4;
			this.acc = this.trueAcc * Math.pow(1.02, this.level + 2) * 1.4;
			this.evd = this.trueEvd * Math.pow(1.02, this.level + 2) * 1.4;
		} else {
			this.health = Math.floor(this.trueHealth * Math.pow(1.14, this.startinglevel - 1) * Math.pow(1.182, this.level - this.startinglevel));
			this.atk = this.trueAtk * Math.pow(1.1, this.startinglevel - 1) * Math.pow(1.13, this.level - this.startinglevel);
			this.matk = this.trueMatk * Math.pow(1.1, this.startinglevel - 1) * Math.pow(1.13, this.level - this.startinglevel);
			this.def = this.trueDef * Math.pow(1.05, this.startinglevel - 1) * Math.pow(1.065, this.level - this.startinglevel);
			this.mdef = this.trueMdef * Math.pow(1.05, this.startinglevel - 1) * Math.pow(1.065, this.level - this.startinglevel);
			this.acc = this.trueAcc * Math.pow(1.02, this.startinglevel - 1) * Math.pow(1.026, this.level - this.startinglevel);
			this.evd = this.trueEvd * Math.pow(1.02, this.startinglevel - 1) * Math.pow(1.026, this.level - this.startinglevel);
		}
		if(typeof(this.weapon) != "undefined") {
			this.health = Math.floor(this.health * this.weapon.health);
			this.atk *= this.weapon.atk;
			this.matk *= this.weapon.matk;
			this.def *= this.weapon.def;
			this.mdef *= this.weapon.mdef;
			this.acc *= this.weapon.acc;
			this.evd *= this.weapon.evd;
		}
		this.dispAtk = this.atk;
		this.dispMatk = this.matk;
		this.dispDef = this.def;
		this.dispMdef = this.mdef;
		this.dispAcc = this.acc;
		this.dispEvd = this.evd;
		this.elementResists = JSON.parse(JSON.stringify(this.trueElementResists));
		this.statusResists = JSON.parse(JSON.stringify(this.trueStatusResists));
	}
}

class fighter_SandSlime extends combat_fighter_object {
	constructor(startinglevel, level, side) {
		super(startinglevel, level, 49, 4, 4, 3.5, 3.5, 4, 3.8, 3, 50, "unit", side, {fire:0.5,thunder:0.5,ice:1.5,earth:0.5,water:1.5,wind:0.8}, {burn:1});
		//this.template = fighter_SandSlime;
		this.properName = "Sand Slime";
		this.target;
		this.playerskills = 
		[new combat_player_skill("Pound", 16, this.atk, "atk", this.acc, 1, this.target, "none", "tactic_standard"), 
		new combat_player_skill("Sand Spit", 5, this.atk, "atk", this.acc, 1, this.target, "earth", "tactic_standard", [new combat_status_object("debuff", "def", 25, 60, 1, this, this.target)]),
		new combat_player_skill("Sandblast", 40, this.atk, "atk", this.acc, 1, this.target, "earth", "spell_standard")];
	}
	ai() {
		var _target;
		if(this.side == 1) {
			updateMovelist(this);
			awaitingInput = true;
			c_inputUser = this;
			clearInterval(combat_starter); 
		} else {
			_target = combat_team1[Math.floor(Math.random() * combat_team1.length)];
			var _roll = Math.floor(Math.random() * 2);
			if(this.currentHealth / this.health < 0.5 && this.currentMana > 0) {
				if(combat_ai("lowestBuff", "def")[1] > 0.9) {
					var damage_event = new combat_damage_object(this, "Sand Spit", 5, this.atk, "atk", this.acc, 1, _target, "earth");
					damage_event.send();
					damage_event.inflict(new combat_status_object("debuff", "def", 25, 60, 1, this, _target));
				} else {
					_target = combat_ai("lowestBuff", "def")[0];
					var damage_event = new combat_damage_object(this, "Sandblast", 40, this.atk, "atk", this.acc, 1, _target, "earth");
					damage_event.send();
					this.currentMana--;
				}
				
			} else {
				if(_roll == 0) {
					var damage_event = new combat_damage_object(this, "Pound", 16, this.atk, "atk", this.acc, 1, _target, "none", true);
					console.log(damage_event.power);
					damage_event.send();
				}
				if(_roll == 1) {
					var damage_event = new combat_damage_object(this, "Sand Spit", 5, this.atk, "atk", this.acc, 1, _target, "earth");
					damage_event.send();
					damage_event.inflict(new combat_status_object("debuff", "def", 25, 60, 1, this, _target));
				}
			}
		}
	}
	playerControl(roll, _target) {
		if(roll == 0) {
			var damage_event = new combat_damage_object(this, "Pound", 16, this.atk, "atk", this.acc, 1, _target, "none", true);
			damage_event.send();
		}
		if(roll == 1) {
			var damage_event = new combat_damage_object(this, "Sand Spit", 5, this.atk, "atk", this.acc, 1, _target, "earth");
			damage_event.send();
			damage_event.inflict(new combat_status_object("debuff", "def", 25, 60, 1, this, _target));
		}
		if(roll == 2) {
			var damage_event = new combat_damage_object(this, "Sandblast", 40, this.atk, "atk", this.acc, 1, _target, "earth");
			damage_event.send();
			this.currentMana--;
		}
	}
}

class fighter_SandierSlime extends combat_fighter_object {
	constructor(startinglevel, level, side) {
		super(startinglevel, level, 49, 4, 4, 3.5, 3.5, 4, 3.8, 3, 50, "unit", side, {fire:0.5,thunder:0.5,ice:1.5,earth:0.5,water:1.5,wind:0.8}, {});
	}
	ai() {
		var _target;
		if(this.side == 1) {
			_target = combat_team2[Math.floor(Math.random() * combat_team2.length)]
		} else {
			_target = combat_team1[Math.floor(Math.random() * combat_team1.length)]
		}
		
		var damage_event = new combat_damage_object("defiled", 12, this.atk, "atk", this.acc, 1, _target, "earth");
		damage_event.send();
		
	}
}

var combat_starter;

fighters[0] = new fighter_SandSlime(3, 3, 1);
fighters[1] = new fighter_SandSlime(2, 2, 1);
	fighters_safe = fighters;

function combat_begin(opponents) {
	combat_starter = setInterval(combat_timer, 1000/tickspeed);
	combat_team1 = fighters;
	combat_team2 = opponents;
}

function combat_timer() {
	for(c_i = 0; c_i < combat_team1.length; c_i++) {
		combat_team1[c_i].reinit();
		for(c_j = 0; c_j < combat_team1[c_i].statusList.length; c_j++) {
			combat_team1[c_i].statusList[c_j].execute();
			if(combat_team1[c_i].statusList[c_j].duration == 0) {
				combat_team1[c_i].statusList.splice(c_j, 1);
			}
		}
		if(typeof(combat_team1[c_i].weapon) != "undefined") {
			for(c_j = 0; c_j < combat_team1[c_i].weapon.primary_effect.length; c_j++) {
				combat_team1[c_i].weapon.primary_effect[c_j].stateReinit();
			}
		}
		
		if(combat_team1[c_i].currentHealth <= 0) {
			combat_graveyard1 = combat_graveyard1.concat(combat_team1.splice(c_i, 1));
		}
		combat_team1[c_i].gametick();
		if(combat_team1[c_i].charge == 0) {
			break;
		}
	}
	for(c_i = 0; c_i < combat_team2.length; c_i++) {
		combat_team2[c_i].reinit();
		for(c_j = 0; c_j < combat_team2[c_i].statusList.length; c_j++) {
			combat_team2[c_i].statusList[c_j].execute();
			if(combat_team2[c_i].statusList[c_j].duration <= 0) {
				combat_team2[c_i].statusList.splice(c_j, 1);
			}
		}
		if(combat_team2[c_i].currentHealth <= 0) {
			combat_graveyard2 = combat_graveyard2.concat(combat_team2.splice(c_i, 1));
		}
		combat_team2[c_i].gametick();
	}
	if(combat_team1.length == 0 || combat_team2.length == 0) {
		combat_end();
	}
	updateGraphics();
}

function combat_end() {
	combat_team1 = [];
	combat_team2 = [];
	fighters = combat_graveyard1;
	combat_graveyard1 = [];
	combat_graveyard2 = [];
	clearInterval(combat_starter); 
}

function updateGraphics() {
	var combat_output = "";
	var _dummy1;
	if(combat_team1.length < combat_team2.length) {
		_dummy1 = combat_team2.length;
	} else {
		_dummy1 = combat_team1.length;
	}
	for(c_o = 0; c_o < _dummy1; c_o++) {
		if(typeof(combat_team1[c_o]) != "undefined") {
			combat_output += '<div class="fighterLeft" onmouseover="updateInfobox(1, '
			combat_output += c_o;
			combat_output += ')"><span>';
			combat_output += combat_team1[c_o].properName;
			combat_output += '</span></div>';
		}
		if(typeof(combat_team2[c_o]) != "undefined") {
			combat_output += '<div class="fighterRight" onclick="setTarget(combat_team2[';
			combat_output += c_o;
			combat_output += '])" onmouseover="updateInfobox(2, '
			combat_output += c_o;
			combat_output += ')"><span>';
			combat_output += combat_team2[c_o].properName;
			combat_output += '</span></div>';
		}
		if(typeof(combat_team1[c_o]) != "undefined") {
			combat_output += '<div><progress class="forceLeft health" max="1" value="';
			combat_output += combat_team1[c_o].currentHealth / combat_team1[c_o].health;
			combat_output += '"></progress></div>';
		}
		if(typeof(combat_team2[c_o]) != "undefined") {
			combat_output += '<div><progress class="forceRight health" max="1" value="';
			combat_output += combat_team2[c_o].currentHealth / combat_team2[c_o].health;
			combat_output += '"></progress></div>';
		}
		combat_output += '<br>';
		if(typeof(combat_team1[c_o]) != "undefined") {
			combat_output += '<div><progress class="forceLeft charge" max="1" value="';
			combat_output += combat_team1[c_o].charge / combat_team1[c_o].chargemax;
			combat_output += '"></progress></div>';
		}
		if(typeof(combat_team2[c_o]) != "undefined") {
			combat_output += '<div><progress class="forceRight charge" max="1" value="';
			combat_output += combat_team2[c_o].charge / combat_team2[c_o].chargemax;
			combat_output += '"></progress></div>';
		}
		combat_output += '<br> <br>';
	}
	combat_output += '<hr>'
	document.getElementById("combatOutputLocation").innerHTML = combat_output;
}

function updateInfobox(side, num) {
	var infobox_output = "";
	var _ct;
	if(side == 1) {
		_ct = combat_team1[num];
	} else {
		_ct = combat_team2[num];
	}
	//column 1
	infobox_output += '<div class="combatColumn"><b>';
	infobox_output += _ct.properName;
	infobox_output += '</b><br/> HP:';
	infobox_output += _ct.currentHealth + "/" + _ct.health;
	infobox_output += '<br> Level: ' + _ct.level;
	infobox_output += '<br> Charge: ' + _ct.charge + "/" + _ct.chargemax;
	infobox_output += '<br> Mana: ' + _ct.currentMana + "/" + _ct.mana;
	infobox_output += '<br> DEF: ' + _ct.def.toFixed(3);
	infobox_output += '<br> MDEF: ' + _ct.mdef.toFixed(3);
	infobox_output += '<br> EVD: ' + _ct.evd.toFixed(3) + '<br><br><b>Buffs/Debuffs</b><br>';
	infobox_output += (_ct.atk / _ct.dispAtk) + 'x ATK<br>'
	infobox_output += (_ct.matk / _ct.dispMatk) + 'x MATK<br>'
	infobox_output += (_ct.def / _ct.dispDef) + 'x DEF<br>'
	infobox_output += (_ct.mdef / _ct.dispMdef) + 'x MDEF<br>'
	infobox_output += (_ct.acc / _ct.dispAcc) + 'x ACC<br>'
	infobox_output += (_ct.evd / _ct.dispEvd) + 'x EVD</div>'
	
	//column 2
	infobox_output += '<div class="combatColumn"><b>Elemental Weaknesses</b><br/>'
	infobox_output += 'Fire: '
	if(typeof(_ct.elementResists.fire) != "undefined") {
		infobox_output += _ct.elementResists.fire.toFixed(3).toString();;
	} else {
		infobox_output += 1;
	}
	infobox_output += 'x<br>';
	infobox_output += 'Ice: '
	if(typeof(_ct.elementResists.ice) != "undefined") {
		infobox_output += _ct.elementResists.ice;
	} else {
		infobox_output += 1;
	}
	infobox_output += 'x<br>';
	infobox_output += 'Electric: '
	if(typeof(_ct.elementResists.thunder) != "undefined") {
		infobox_output += _ct.elementResists.thunder;
	} else {
		infobox_output += 1;
	}
	infobox_output += 'x<br>';
	infobox_output += 'Earth: '
	if(typeof(_ct.elementResists.earth) != "undefined") {
		infobox_output += _ct.elementResists.earth;
	} else {
		infobox_output += 1;
	}
	infobox_output += 'x<br>';
	infobox_output += 'Poison: '
	if(typeof(_ct.elementResists.poison) != "undefined") {
		infobox_output += _ct.elementResists.poison;
	} else {
		infobox_output += 1;
	}
	infobox_output += 'x<br>';
	infobox_output += 'Energy: '
	if(typeof(_ct.elementResists.bomb) != "undefined") {
		infobox_output += _ct.elementResists.bomb;
	} else {
		infobox_output += 1;
	}
	infobox_output += 'x<br>';
	infobox_output += 'Water: '
	if(typeof(_ct.elementResists.water) != "undefined") {
		infobox_output += _ct.elementResists.water;
	} else {
		infobox_output += 1;
	}
	infobox_output += 'x<br>';
	infobox_output += 'Wind: '
	if(typeof(_ct.elementResists.wind) != "undefined") {
		infobox_output += _ct.elementResists.wind;
	} else {
		infobox_output += 1;
	}
	infobox_output += 'x<br>';
	infobox_output += 'Light: '
	if(typeof(_ct.elementResists.holy) != "undefined") {
		infobox_output += _ct.elementResists.holy;
	} else {
		infobox_output += 1;
	}
	infobox_output += 'x<br>';
	infobox_output += 'Dark: '
	if(typeof(_ct.elementResists.dark) != "undefined") {
		infobox_output += _ct.elementResists.dark;
	} else {
		infobox_output += 1;
	}
	infobox_output += 'x</div>';
	
	//column 3
	infobox_output += '<div class="combatColumn"><b>Status/Debuff Resistances</b>'
	Object.keys(_ct.statusResists).forEach(function(key) {
		infobox_output += "<br>";
		infobox_output += combat_status_names[key];
		infobox_output += ": ";
		infobox_output += _ct.statusResists[key];
		infobox_output += "x";
	});
	infobox_output += '<br/><br/><b>Environment Modifiers</b></div>';
	
	//column 4
	infobox_output += '<div class="combatColumn"><b>Current Afflictions/Modifiers</b>'
	for(c_uwu = 0; c_uwu < _ct.statusList.length; c_uwu ++) {
		if(_ct.statusList[c_uwu].name != "buff" && _ct.statusList[c_uwu].name != "debuff") {
			infobox_output += "<br>";
			infobox_output += _ct.statusList[c_uwu].power;
			infobox_output += "x ";
			infobox_output += combat_status_names[_ct.statusList[c_uwu].name];
			infobox_output += "for ";
			infobox_output += _ct.statusList[c_uwu].duration / tickspeed;
			infobox_output += "sec"
		}
	}
	infobox_output += "</div>";
	document.getElementById("combatFlex").innerHTML = infobox_output;
}

function updateMovelist(user) {
	var movelist_output = "";
	for(c_owo = 0; c_owo < user.playerskills.length; c_owo++) {
		movelist_output += "<button onclick='";
		movelist_output += 'c_skillUsed = ';
		movelist_output += c_owo;
		movelist_output += ";awaitingTarget = true' onmouseover='updateMovebox(";
		movelist_output += JSON.stringify(JSON.decycle(user.playerskills[c_owo]));
		movelist_output += ")'>T: ";
		movelist_output += user.playerskills[c_owo].name;
		movelist_output += '</button>';
	}
	document.getElementById("moveset").innerHTML = movelist_output;
}

function updateMovebox(skill) {
	var movebox_output = "";
	movebox_output += '<div class="combatMove"><b>'
	movebox_output += skill.name;
	movebox_output += '</b><br/>Power: ';
	movebox_output += skill.power.toFixed(3);
	movebox_output += ' ';
	if(skill.type == "atk") {
		movebox_output += "Physical";
	} else {
		movebox_output += "Magical";
	}
	movebox_output += '<br/>Accuracy: ';
	movebox_output += skill.acc.toFixed(3);
	movebox_output += '<br>Element: ';
	movebox_output += skill.element;
	movebox_output += '</div><div class="combatMove"><b>Effects</b>';
	if(typeof(skill.status) != "undefined") {
		for(c_sklshr = 0; c_sklshr < skill.status.length; c_sklshr++) {
			movebox_output += "<br>";
			movebox_output += skill.status[c_sklshr].power;
			movebox_output += "x ";
			movebox_output += combat_status_names[skill.status[c_sklshr].name];
			movebox_output += " for ";
			movebox_output += skill.status[c_sklshr].duration / tickspeed;
			movebox_output += "sec";
		}
	}
	movebox_output += "</div>";
	document.getElementById("moveDisplay").innerHTML = movebox_output;
}

function setTarget(tgt) {
	if(awaitingInput == true && typeof(c_skillUsed) != "undefined") {
		c_inputUser.playerControl(c_skillUsed, tgt);
		awaitingInput = false;
		c_skillUsed = undefined;
		combat_starter = setInterval(combat_timer, 1000/tickspeed);
	}
}

class forge_component {
	constructor(material, part) {
		this.hardness = material.hardness * part.hardness;
		this.sharpness = material.sharpness * part.sharpness;
		this.flexibility = material.flexibility * part.flexibility;
		this.primary_effect = material.primary_effect;
		this.weight = material.weight;
		this.durability = material.durability;
		this.power = 0;
		this.power += this.hardness;
		this.power += this.sharpness;
		this.power += this.flexibility;
	}
}
class forge_tool {
	constructor(components) {
		this.user;
		this.power = 0;
		this.primary_effect = [];
		var f_i;
		for(f_i = 0; f_i < components.length; f_i++) {
			if(f_i == 0) {
				this.power += components[0].power * 1.5;
			} else {
				this.power += components[f_i].power;
			}
			if(typeof(components[f_i].primary_effect) != "undefined") {
				this.primary_effect = this.primary_effect.concat(components[f_i].primary_effect);
			}
		}
	}
	assign(user) {
		this.user = user;
		for(var f_i = 0; f_i < this.primary_effect.length; f_i++) {
			this.primary_effect[f_i].user = this.user;
		}
		user.weapon = this;
	}
}
class forge_tool_sword extends forge_tool {
	constructor(components) {
		super(components);
		this.health = 1;
		this.atk = 0.5 * this.power / 100 + 1;
		this.matk = 0.3 * this.power / 100 + 1;
		this.def = 0.15 * this.power / 100 + 1;
		this.mdef = 0.12 * this.power / 100 + 1;
		this.acc = 0.03 * this.power / 100 + 1;
		this.evd = 0.04 * this.power / 100 + 1;
	}
}

class forge_effect {
	constructor(name, params) {
		this.name = name;
		this.params = params;
		this.user;
	}
	stateReinit() {
		switch(this.name) {
			case "resistElement":
				if(typeof(this.user.elementResists[this.params[0]]) != "undefined") {
					this.user.elementResists[this.params[0]] -= this.params[1];
				} else {
					this.user.elementResists[this.params[0]] = 1 - this.params[1];
				}
				break;
			case "resistStatus":
				if(typeof(this.user.statusResists[this.params[0]]) != "undefined") {
					this.user.statusResists[this.params[0]] -= this.params[1];
				} else {
					this.user.statusResists[this.params[0]] = 1 - this.params[1];
				}
				break;
		}
	}
	stateOnhitGeneric(attack) {
		switch(this.name) {
			case "boostElement":
				if(attack.element == this.params[0]) {
					attack.power *= this.params[1];
				}
				break;
			default:
				
		}
	}
	stateOnhitWeapon(attack) {
		switch(this.name) {
			case "inflictStatus":
				attack.inflict(new combat_status_object(this.params[0], this.params[1], this.params[2], this.params[3], this.params[4], attack.user, attack.target));
				name, param, power, duration, chance, user, target
				break;
			default:
				
		}
	}
}

var toolparts = {
	shaft: {
		hardness: 1,
		sharpness: 0,
		flexibility: 1.3
	},
	blade: {
		hardness: 1.1,
		sharpness: 1.5,
		flexibility: -0.05
	},
	axe: {
		hardness: 1.1,
		sharpness: 1.5,
		flexibility: -0.05
	},
	hammer: {
		hardness: 1.7,
		sharpness: 0,
		flexibility: 0.8
	},
	rope: {
		hardness: 0.5,
		sharpness: 0.5,
		flexibility: 1.7
	}
}
var toolmaterials = {
	wood: {
		hardness: 3.5,
		sharpness: 1.8,
		flexibility: 6,
		durability: 35,
		weight: 4.1,
		primary_effect: [new forge_effect("inflictStatus", ["debuff", "def", 25, 60, 1])]
	},
	stone: {
		hardness: 8.3,
		sharpness: 1.8,
		flexibility: 2,
		durability: 60,
		weight: 12
	},
	copper: {
		hardness: 4.6,
		sharpness: 5.5,
		flexibility: 4.4,
		durability: 100,
		weight: 8.5
	},
	tin: {
		hardness: 4.3,
		sharpness: 4.8,
		flexibility: 5.1,
		durability: 85,
		weight: 6.5
	},
	bronze: {
		hardness: 4.5,
		sharpness: 5.3,
		flexibility: 4.9,
		durability: 120,
		weight: 8,
		primary_effect: [new forge_effect("resistElement", ["fire", 1.15])]
	},
	steel: {
		hardness: 5.8,
		sharpness: 6.2,
		flexibility: 3.9,
		durability: 170,
		weight: 10.5
	}
}

var x = new forge_component(toolmaterials.bronze, toolparts.blade);
var y = new forge_component(toolmaterials.bronze, toolparts.blade);
var z = new forge_component(toolmaterials.wood, toolparts.shaft);
var q = new forge_tool_sword([x, y, z]);
q.assign(fighters[0]);