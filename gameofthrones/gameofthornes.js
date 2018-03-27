 $(document).ready(function(){
 		$('.house').click(function(){
 			$("#details").empty();
 			//var	num=String(0);
 			//console.log(num);
 			var id = $(this).attr('title');
 			$.get("https://www.anapioficeandfire.com/api/houses/", { name: id }, function(res){
 				//console.log(res);
 				//console.log(res["0"].name);
 				//console.log(res["0"].words);
 				//console.log(res["0"].titles);
 				var titles = res["0"].titles
 				var titlestr = ""
 				for(var i = 0; i < titles.length; i++){
 				if(i == titles.length -1){
 					titlestr += titles[i];
 				}
 				else{
 				titlestr += titles[i]+", ";
 			}
 			}
 				//console.log(titlestr);
 				var name = res["0"].name;
 				var words = res["0"].words; 
 		
 			$("#details").append("<h1>Name: " + name + "</h1><h1>Words: " + words +"<h1><h1> Titles: "+titlestr+"</h1>");
 			
 		})
 			"json";
 	});
 });
 	