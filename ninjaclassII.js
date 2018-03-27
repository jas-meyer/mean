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
		if(opp instanceof Ninja){
		opp.health -= 5
		console.log(opp.name + " was punched by "+this.name+" and lost 5 Health!")
	}
	
		return this
	}

	this.kick = function(opp){
		if(opp instanceof Ninja){
		loss = 15 * strength
		opp.health -= (15 * strength)
		console.log(opp.name + " was kicked by "+this.name+" and lost "+loss+" Health!")
		
	}
	return this
	}

}

const ninja1 = new Ninja("Hattori");
const ninja2 = new Ninja("Goku");


ninja1.sayName().drinkSake().showStats().punch(ninja2).kick(ninja2).showStats()
ninja2.showStats()