function Ninja(name){
	const speed = 3;
	const strength = 3;
	this.name = name;
	this.health = 100
	this.sayName = function(){
		console.log("My ninja name is "+this.name)
		return this
	}
	this.showStats = function(){
		console.log("Name: "+ this.name + ", Health: "+this.health+", Speed: " + speed+", Strength: "+ strength)
		return this

	}
	this.drinkSake = function(){
		this.health += 10
		return this
	}
	this.punch = function(opp){
		opp.health -= 10
	}
	this.kick = function(opp){
		opp.health -= 15
	}

}

const ninja1 = new Ninja("Hattori");
const ninja2 = new Ninja("Goku");

ninja1.sayName().drinkSake().showStats()