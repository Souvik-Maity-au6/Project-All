console.log("connected")

var searchInput = document.querySelector(".wrapper");
var loadingWheel = document.querySelector(".loader");
var display = document.querySelector(".food-name");
var searchContainer = document.querySelector(".search-box");
var foodHeader = document.querySelector(".food-name-header");
var foodContainer = document.querySelector(".food-name-container")
var ingredientsDetails = document.querySelector(".ingredents-list")
var goHome = document.querySelector(".reload")



goHome.addEventListener("click", function(event){
    event.preventDefault();
    location.reload();
})


function hashChange1(){
    location.hash = "part2";
    searchContainer.style.display = "none"
    loadingWheel.style.display = "block";

    searchInput.addEventListener("submit", function (event) {
        event.preventDefault();
        var searchFood = event.target.search.value;
        console.log(searchFood)
        var baseURL = `https://forkify-api.herokuapp.com/api/search?q=${searchFood}`;
        fetch(baseURL).then(function (response) {
            return response.json();
        }).then(function (responseData) {
            var foodName = responseData['recipes'];
            console.log(foodName);
            for (var i = 0; i < foodName.length; i++) {
                var id = foodName[i].recipe_id;
                var title = foodName[i].title;
                var publisher = foodName[i].publisher;
                var publisherLink = foodName[i].publisher_url;
                var source = foodName[i].source_url;
                var image = foodName[i].image_url;
                var title = foodName[i].title;

                display.innerHTML +=
                    `<div class="col-4 text-center">
            <div class="card text-primary bg-light mb-3 ml-4" style="width: 25rem; box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);">
            <img class="card-img-top" style = "height: 300px; width: 400px" src=${image} alt="Food Image">
            <div class="card-body">
            <h6 class = "card-title">Food Item : ${title}</h5>
            <p class="card-text">Recipe ID : ${id}</p>
            <p class="card-text"><a href=${publisherLink}>Publisher Name : ${publisher}</a></p>
            <p class="card-text"><a href=${source}> Food Source</a></p>
            <a class="btn" style = "background-color:#050f2c; color: azure; box-shadow: 10px 10px 5px -6px rgba(0,0,0,0.75);" onclick="hashChange2(${id})">Get Recipe Ingredients</a>

            </div>
            </div>
            </div>`

            }
            foodHeader.style.display = "block"
            loadingWheel.style.display = "none";
        }).catch(function (error) {
            console.log(error)
        })
        event.target.search.value = "";
        event.target.search.focus();
    })
}

function hashChange2(id){
    location.hash = "part3";
    foodContainer.style.display = "none";
    loadingWheel.style.display = "block";
    
    var baseURL = `https://forkify-api.herokuapp.com/api/get?rId=${id}`

    fetch(baseURL).then(function (response) {
        return response.json();
    }).then(function (responseData) {
        console.log(responseData)
        var Ingridents = responseData.recipe.ingredients;
        for (var i = 0; i < Ingridents.length; i++) {
            var X = Ingridents[i];
            console.log(X);
            ingredientsDetails.innerHTML +=`<div><ul><li> ${X}</li></ul></div>`

        }
        
        loadingWheel.style.display = "none";
        ingredientsDetails.style.display = "block"
        console.log(Ingridents);
    }).catch(function (error) {
        console.log(error);
    })


}




