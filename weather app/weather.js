
       $(document).ready(function(){
            $('form').submit(function(){
                var city = $("#city").val();
                console.log(city);
                $.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&APPID=616bbe9129e94af7f41e939cc86298e3", function(res) {
                    console.log(res.main.temp);
                    console.log(res.name);
                    console.log(res);
                   // $('#city').val("");
                    $('form')[0].reset(),
                 
                    $("div").append("<h1>"+res.name+"</h1><h2>Temperature: "+res.main.temp+"</h2>" )
                }, "json");
           return false;


            });
     });
