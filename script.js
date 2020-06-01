$(document).ready(function(){
	var url = "https://api.covid19india.org/data.json"
	
	$.getJSON(url,function(data){
		console.log(data)
		
		var total_active,total_recovered,total_deaths,total_confirmed
		
		total_active = data.statewise[0].active
		total_confirmed = data.statewise[0].confirmed
		total_recovered = data.statewise[0].recovered
		total_deaths = data.statewise[0].deaths
		
		$("#active").append(total_active)
		$("#confirmed").append(total_confirmed)
		$("#recovered").append(total_recovered)
		$("#deaths").append(total_deaths)
		
		var state = []
		var confirmed = []
		var recovered = []
		var deaths = []
		
		$.each(data.statewise,function(id,obj){
			state.push(obj.state)
			confirmed.push(obj.confirmed)
			recovered.push(obj.recovered)
			deaths.push(obj.deaths)
		})
		
		
		state.shift()
		confirmed.shift()
		recovered.shift()
		deaths.shift()
		
		console.log(state)
		
		var mychart =document.getElementById("myChart").getContext('2d')
		
		var chart = new Chart(myChart,{
			type:'line',
			data:{
				labels:state,
				datasets:[
					{
						label: "Confirmed Cases",
						data: confirmed,
						backgroundColor: "#f1c40f",
						minBarLength: 100
					},
					{
						label: "Recovered",
						data: recovered,
						backgroundColor: "#2ecc71",
						minBarLength: 100
					},
					{
						label: "Decease",
						data: deaths,
						backgroundColor: "#e74c3c",
						minBarLength: 100
					}
				
				]
				
			},
			options:{}
			
		})
		
		var len = state.length;
                var txt = "";
                if(len > 0){
                    for(var i=0;i<len;i++){
                            txt += "<tr><td>"+state[i]+"</td><td>"+confirmed[i]+"</td><td>"+recovered[i]+"</td><td>"+deaths[i]+"</td></tr>";
                        
                    }
                    if(txt != ""){
                        $("#myTbl").append(txt).removeClass("hidden");
                    }
                }
            
		
	})
})
