$(document).ready(function(){
	var url = "https://api.covid19india.org/v2/state_district_wise.json"
	
	$.getJSON(url,function(data){
		console.log(data)
		
		var state = []
		var confirmed = []
		var recovered = []
		var active = []
		var deaths = [] 
		
		$.each(data[34].districtData,function(id,obj){
			state.push(obj.district)
			confirmed.push(obj.confirmed)
			active.push(obj.active)
			recovered.push(obj.recovered)
			deaths.push(obj.deceased)
		})
		console.log(data[34].districtData)
		
		state.shift()
		confirmed.shift()
		active.shift()
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
        
		var total_active = active.reduce(function(a, b){
			return a + b;
			}, 0);
    
			console.log(total_active);
		var total_confirmed = confirmed.reduce(function(a, b){
			return a + b;
			}, 0);
    
			console.log(total_confirmed);
		var total_recovered = recovered.reduce(function(a, b){
			return a + b;
			}, 0);
    
			console.log(total_recovered);
		var total_deaths = deaths.reduce(function(a, b){
			return a + b;
			}, 0);
    
			console.log(total_deaths);
		
		
		$("#active").append(total_active)
		$("#confirmed").append(total_confirmed)
		$("#recovered").append(total_recovered)
		$("#deaths").append(total_deaths) 
		
	})
	
})