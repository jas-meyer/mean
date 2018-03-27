var myString: string;
// I can assign myString like this:
myString = "Bee stinger";
// Why is there a problem with this? What can I do to fix this?
myString = "Take";
//The myString variable must be equal to a string data type

function sayHello(name: string){
   return `Hello, ${name}!`;
}
// This is working great:
console.log(sayHello("Kermit"));
// Why isn't this working? I want it to return "Hello, 9!"
console.log(sayHello("9"));
//The 9 must be in quotes

function fullName(firstName: string, lastName: string, middleName: string){
   let fullName = `${firstName} ${middleName} ${lastName}`;
   return fullName;
}
// This works:
console.log(fullName("Mary", "Moore", "Tyler"));
// What do I do if someone doesn't have a middle name?
console.log(fullName("Jimbo", "", "Jones"));
//Type in a empty string

interface Student {
   firstName: string;
   lastName: string;
   belts: number;
}
function graduate(ninja: Student){
   return `Congratulations, ${ninja.firstName} ${ninja.lastName}, you earned ${ninja.belts} belts!`;
}
const christine = {
   firstName: "Christine",
   lastName: "Yang",
   belts: 2
}
const jay = {
   firstName: "Jay",
   lastName: "Patel",
   belts: 4
}
//belts attribute was spelled "belt" in jay variable
// This seems to work fine:
console.log(graduate(christine));
// This one has problems:
console.log(graduate(jay));

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