var serachInput = document.querySelector("form");
var lodingText = document.querySelector("h3");
var resultList = document.querySelector("ul");
var display = document.querySelector(".display")

function fetchData(searchQuery){
    lodingText.style.display = "block"
    var baseURL = `https://api.duckduckgo.com/?q=${searchQuery}&format=json`;
    return fetch(baseURL).then(function(response){
        return response.json();
    }).then(function(responseData){
        return responseData.RelatedTopics;
    }).then(function(responsePureData){
        var x = responsePureData;
        var y = [];
        for(relatedTopic of x){
            if(relatedTopic.hasOwnProperty("Topics")){
                for(Q of relatedTopic.Topics){
                    y.push(Q)
                }
                continue;
            }else{
                y.push(relatedTopic);
            }
        }
        return y;
        console.log(y);
    }).catch(function(error){
        console.log(error);
    })
}

serachInput.addEventListener("submit", function(event){
    event.preventDefault();
    console.log(event);
    console.log(event.target);
    var searchQuery = event.target.search.value;
    fetchData(searchQuery).then(function(relatedTopicsPure){
        lodingText.style.display = "none";
        var B = relatedTopicsPure;
        console.log(B);
        if(B.length === 0){
            var D = document.createElement("h3");
            D.textContent = "No result found... pls Input correct words....";
            display.insertAdjacentElement("afterbegin", D);
        }else{
            for(relatedTopic of B){
                console.log(relatedTopic.Result)
                var z = document.createElement("li");
                z.insertAdjacentHTML("beforeend", relatedTopic.Result);
                resultList.insertAdjacentElement("beforeend", z)
            }
        }
        resultList.style.display = "block"
        event.target.search.value = "";
        event.target.search.focus();
    }).catch(function(error){
        console.log(error);
    })
    console.log(searchQuery);
    
})