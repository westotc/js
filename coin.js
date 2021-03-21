	var base_url = "https://api.coingecko.com/api/v3"
	var result = document.getElementById("market")	
	
	function showPopularCurrencies(){
	    var xhr = new XMLHttpRequest()
	    var params = new URLSearchParams()
	    params.append("vs_currency", "usd")
		params.append("ids", "")
	    params.append("order", "market_cap_desc")
	    params.append("per_page", "5")
	    params.append("price_chage_percentage", "24h")
	    xhr.open("GET", base_url+"/coins/markets?"+params)
	    xhr.setRequestHeader("accept", "application/json")
	    xhr.send()
	    xhr.onload = function(){
	        console.log(xhr.status)
	        var data = JSON.parse(this.response)
	        displayCoins(data)
	    }
	}
	
	function displayCoins(data){
	    var arr = data
	    arr.forEach(function(cryptocurrency){
	        var div = createCard(cryptocurrency);
	        result.append(div)
	    })
	
	    function createCard(cryptocurrency){
	        var div = document.createElement("div");
	        div.setAttribute("class","coin");
	        div.setAttribute("id",cryptocurrency["id"])
	        var coin = document.createElement("div")
	        coin.innerHTML =  cryptocurrency.symbol + " <span class='badge'>24H</span>"
	        var price = document.createElement("div")
			var priceChange = Math.round(100*cryptocurrency.price_change_percentage_24h)/100		
			price.innerText = "$ "+Math.round(100*cryptocurrency.current_price)/100  + "（" + priceChange + "%）"
	                
	        if (cryptocurrency.price_change_percentage_24h > 0) {
	            price.className = "goup"
	        }
	        else {
	            price.className = "godown"
	        }
	        div.append(coin,price)
	        return div
	
	    }
	}
	
	function coinUnavailable(){
	    console.log("Coin not available! Please try again!")
	    h1 = document.createElement("h1")
	    h1.innerText = "Coin not available! Please try again..."
	    h1.setAttribute("class","sub-heading")
	    document.getElementById("coinResult").append(h1)
	}
