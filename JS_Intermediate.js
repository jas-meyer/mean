Part I
function starString(num){
	starstr = ""
	for(var i = 1; i <= num; i++){
		starstr += "*"
	}
	return starstr
}

let stars = starString(10)
console.log(stars)

Part II
function drawStars(arr){
	for(var i = 0; i < arr.length; i++){
		starstr = ""
	for(var j = 1; j <= arr[i]; j++){
		starstr += "*"
	}
	console.log(starstr)
	}
}

let x = [4, 6, 1, 3, 5, 7, 25]
drawStars(x)
Part III
function drawStars(arr){
	for(var i = 0; i < arr.length; i++){
		starstr = ""
	if (arr[i].constructor === String){
		for(var k = 0; k <arr[i].length; k++){ 
		l = arr[i][0].toLowerCase()
		starstr += l  
	}
	}
	else{
	for(var j = 1; j <= arr[i]; j++){
		
		starstr += "*"
	}
	}	
	console.log(starstr)
	}
}

let x = [4, "Tom", 1, "Michael", 5, 7, "Jimmy Smith"]

drawStars(x)



