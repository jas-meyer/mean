module.exports = function() {
	return{
    add: function(num1, num2) { 
         let sum = num1 + num2;
         console.log(sum)
         return sum
    },
    multiply: function(num1, num2) {
         let product = num1 * num2;
         console.log(product)
         return product
    },
    square: function(num) {
         let product = num * num
         console.log(product)
         return product
    },
    random: function(num1, num2) {
         let result = Math.floor(Math.random() *(num2 - num1)+num1);
         console.log(result)
         return result
    }
  }
};