function dogImage(){
    fetch(`https://dog.ceo/api/breeds/image/random`).then(function(response){
        lodingText.style.display = 'block';
        return response.json();
    }).then(function(responseData){
        console.log(responseData);
        return responseData.message;
    }).then(function(image){
        var y = document.querySelector("img");
        if(y)y.remove();
        var x = document.createElement("img");
        x.setAttribute("src", image);
        x.alt = "A qute Dog";
        x.height = 300;
        x.width = 300;
        x.style.display = 'block'
        lodingText.style.display = 'none';
        document.body.appendChild(x);
    }).catch(function(error){
        console.log(error)
    })
}


var button = document.querySelector("button");
var lodingText = document.querySelector("h4");
button.addEventListener("click", dogImage)