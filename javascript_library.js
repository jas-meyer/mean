var _ = {
   map: function(list, callback) {
      var new_array = []
      for(var i = 0; i < list.length; i++){
        
        var result = callback(list[i]);
        new_array.push(result);
      }
      list = new_array;
      return list;
    },
   reduce: function(list, callback, memo) {
     var total = memo
     for(var i = 0; i < list.length; i++){
      var result = callback(total,list[i])
      console.log(result)
      total += list[i] 
     }
     return result
   },
   find: function(list, callback) {   
     for(var i = 0; i < list.length; i++){
        var result = callback(list[i]);
        if (result == true){
          return list[i]
        }
     }
   },
   filter: function(list, callback) { 
      new_arr = []
      for(var i = 0; i < list.length; i++){
        var result = callback(list[i]);
        if (result == true){
         new_arr.push(list[i])
        }
      }
      list = new_arr
      return list
   },
   reject: function() { 
     new_arr = []
      for(var i = 0; i < list.length; i++){
        var result = callback(list[i]);
        if (result == false){
         new_arr.push(list[i])
        }
      }
      list = new_arr
      return list
   }
 }

