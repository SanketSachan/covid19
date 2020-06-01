$(document).ready(function(){
	var url = "https://api.covid19api.com/summary"
	
	$.getJSON(url,function(data){
		console.log(data)
		
		var total_active,total_recovered,total_deaths,total_confirmed
		
		
		total_confirmed = data.Global.TotalConfirmed
		total_recovered = data.Global.TotalRecovered
		total_deaths = data.Global.TotalDeaths
		total_active = total_confirmed-(total_recovered+total_deaths)
		
		$("#active").append(total_active)
		$("#confirmed").append(total_confirmed)
		$("#recovered").append(total_recovered)
		$("#deaths").append(total_deaths)
		
		var state = []
		var confirmed = []
		var recovered = []
		var deaths = []
		var active = []
		
		$.each(data.Countries,function(id,obj){
			state.push(obj.Country)
			confirmed.push(obj.TotalConfirmed)
			recovered.push(obj.TotalRecovered)
			deaths.push(obj.TotalDeaths)
			active.push(obj.TotalConfirmed-(obj.TotalRecovered+obj.TotalDeaths))
		})
		
		
		state.shift()
		confirmed.shift()
		recovered.shift()
		deaths.shift()
		active.shift()
		
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
					},
					{
						label: "Active",
						data: active,
						backgroundColor: "blue",
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
                            txt += "<tr><td>"+state[i]+"</td><td>"+confirmed[i]+"</td><td>"+active[i]+"</td><td>"+recovered[i]+"</td><td>"+deaths[i]+"</td></tr>";
                        
                    }
                    if(txt != ""){
                        $("#myTbl").append(txt).removeClass("hidden");
                    }
                }
        
		
		
	})
	
})