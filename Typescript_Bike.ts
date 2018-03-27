class Bike{
  miles = 0;
  constructor(public price: number,
              public max_speed: number,

              ){}

  displayInfo = () => {
  console.log("Price: "+this.price+" Max speed: "+ this.max_speed+" Total miles: "+this.miles)
  return this
  }
  ride = () => {
  console.log("Riding")
    this.miles += 10;
    return this
  }
  reverse = () => {
  if(this.miles == 0){
    console.log("Stop Reversing!")
    return this
  }
  console.log("Reversing")
  this.miles -= 5
  return this
  }
}

let bike1 = new Bike(10000, 55);
let bike2 = new Bike(15000, 20);
let bike3 = new Bike(20000, 40);
bike1.ride().ride().ride().reverse().displayInfo()
bike2.ride().ride().reverse().reverse().displayInfo()
bike3.reverse().reverse().reverse().displayInfo()
