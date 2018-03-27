class Ninja {
   fullName: string;
   constructor(
      public firstName: string,
      public lastName: string){
         this.fullName = `${firstName} ${lastName}`;
      }
   debug(){
      console.log("Console.log() is my friend.")
   }
}
// This is not making an instance of Ninja, for some reason:
const shane = new Ninja("Shane", "White");
//Ninja Class needs the first and last name as parameters.
// Since I'm having trouble making an instance of Ninja, I decided to do this:
const turing = {

    firstName: "Alan",
    lastName: "Turing",
    fullName: "Alan Turing",
    debug(){
      console.log("Console.log() is my friend.")
    }
   //need to include debug function inside turing variable to match the Ninja Class
}
// Now I'll make a study function, which is a lot like our graduate function from above:
function study(programmer: Ninja){
   return `Ready to whiteboard an algorithm, ${programmer.fullName}?`
}
// Now this has problems:
console.log(study(turing));
console.log(study(shane));
var increment = x => x + 1;
// This works great:
console.log(increment(3));
var square = x => x * x;
//remove the curly brackets after the arrows
// This is not showing me what I want:
console.log(square(4));
// This is not working:
var multiply = (x, y) => x * y;
console.log(multiply(3,5))
//need parenthesis around x and y
// Nor is this working:
var math = (x, y) => {
    let sum = x + y;
    let product = x * y;
    let difference = Math.abs(x - y);
    return [sum, product, difference];
}
console.log(math(4,6))
//need curly brackets after arrow around the sum, product and difference expressions
class Elephant {
    constructor(public age: number) {}
    birthday = () => {
        this.age++;
//Used equal sign, parenthesis, arrow and curly brackets after birthday variable.
   }
}
const babar = new Elephant(8);
setTimeout(babar.birthday, 1000)
setTimeout(function(){
   console.log(`Babar's age is ${babar.age}.`)
   }, 2000)
// Why didn't
