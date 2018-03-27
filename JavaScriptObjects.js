function challenge1(arr){
	for(var i = 0; i < arr.length; i++){
		challstr = ""
		for(let key in arr[i]){
			if(key == 'name'){
			challstr += ("Name: "+arr[i][key])
		}
			if (key == 'cohort'){
				challstr += (", Cohort: " + arr[i][key])
			}
		
		}
	console.log(challstr)
	}
}
let students = [
    {name: 'Remy', cohort: 'Jan'},
    {name: 'Genevieve', cohort: 'March'},
    {name: 'Chuck', cohort: 'Jan'},
    {name: 'Osmund', cohort: 'June'},
    {name: 'Nikki', cohort: 'June'},
    {name: 'Boris', cohort: 'June'}
];
challenge1(students)

function challenge2(obj){
	for (let key in obj){
		upperkey1 = key.toUpperCase()
		console.log(upperkey1)
		count = 1
		for (let key2 in obj[key]){
			length = obj[key][key2].last_name.length + obj[key][key2].first_name.length
			console.log(count + " - "+obj[key][key2].last_name.toUpperCase() +", " +obj[key][key2].first_name.toUpperCase() + " - " + length)
			count++ 
		}
	}
	}
 challenge2(users)
let users = {
    employees: [
        {'first_name':  'Miguel', 'last_name' : 'Jones'},
        {'first_name' : 'Ernie', 'last_name' : 'Bertson'},
        {'first_name' : 'Nora', 'last_name' : 'Lu'},
        {'first_name' : 'Sally', 'last_name' : 'Barkyoumb'}
    ],
    managers: [
       {'first_name' : 'Lillian', 'last_name' : 'Chambers'},
       {'first_name' : 'Gordon', 'last_name' : 'Poe'}
    ]
 };
