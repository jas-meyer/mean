/*function zero_negativity(arr){
for (var i = 0; i < arr.length; i++){
	if(arr[i] < 0){
		return false
	}
}
	return true
}


zero_negativity([0,7,4,6,3])
*/
/*function is_even(num){
	return (num % 2 == 0)
}

is_even(3)
*/
/*
function how_many_even(arr){
var count = 0
for(var i = 0; i < arr.length; i++){
	if(arr[i] % 2 ==0){
		count++
	}
}
	return count
}

how_many_even([2,3,4,5,6,8])
*/
/*
function create_dummy_array(n){
	dumm = []
for(var i = 0; i < n; i++){
	dumm.push(Math.floor(Math.random()*10))
}
return dumm
}

create_dummy_array(10)
*/
function random_choice(arr){
return arr[Math.floor(Math.random()*arr.length)]

}

random_choice([2,3,45,6,74,5,8,232])