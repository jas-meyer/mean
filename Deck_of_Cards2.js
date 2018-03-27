class Deck{
 constructor(){
	this.cards = [] 
		for(var i = 1; i <= 10; i++){
		this.cards.push('c'+i)
		}
		this.cards.push('cj')
		this.cards.push('cq')
		this.cards.push('ck')
		for(var i = 1; i <= 10; i++){
		this.cards.push('d'+i)
		}
		this.cards.push('dj')
		this.cards.push('dq')
		this.cards.push('dk')
		
		for(var i = 1; i <= 10; i++){
		this.cards.push('h'+i)
		}
		this.cards.push('hj')
		this.cards.push('hq')
		this.cards.push('hk')
		
		for(var i = 1; i <= 10; i++){
		this.cards.push('s'+i)
		}
		this.cards.push('sj')
		this.cards.push('sq')
		this.cards.push('sk')
		
		}
shuffle(){
  var m = this.cards.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = this.cards[m];
    this.cards[m] = this.cards[i];
    this.cards[i] = t;
  }

  return this.cards;
}
reset(){
this.cards = [] 
		for(var i = 1; i <= 10; i++){
		this.cards.push('c'+i)
		}
		this.cards.push('cj')
		this.cards.push('cq')
		this.cards.push('ck')
		for(var i = 1; i <= 10; i++){
		this.cards.push('d'+i)
		}
		this.cards.push('dj')
		this.cards.push('dq')
		this.cards.push('dk')
		
		for(var i = 1; i <= 10; i++){
		this.cards.push('h'+i)
		}
		this.cards.push('hj')
		this.cards.push('hq')
		this.cards.push('hk')
		
		for(var i = 1; i <= 10; i++){
		this.cards.push('s'+i)
		}
		this.cards.push('sj')
		this.cards.push('sq')
		this.cards.push('sk')
		
		}

deal (){
	var dealt = this.cards.pop()
	console.log(dealt)
	return dealt
}
}
class Player extends Deck{
	constructor(name){
		super();
		this.name = name;
		this.hand = [];
	}
take(deck){
	let drawn = deck.deal()
	this.hand.push(drawn)
}
discard(deck){
console.log(deck)
let move = this.hand[(this.hand).length-1];
//deck['cards'] = move
deck.cards.push(move);
this.hand.pop();

}
}


const deck1 = new Deck()
console.log(deck1)
deck1.shuffle()

const player1 = new Player('Jack')

player1.take(deck1)
player1.take(deck1)
console.log(player1.hand)
console.log(deck1)
player1.discard(deck1)
console.log(deck1)
console.log(player1.hand)