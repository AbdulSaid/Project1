// Initialize Firebase
var config = {
  apiKey: "AIzaSyAtFbFd9IcS0epRUFwVAHv171yHyJJ265I",
  authDomain: "utmbootcampproject1.firebaseapp.com",
  databaseURL: "https://utmbootcampproject1.firebaseio.com",
  projectId: "utmbootcampproject1",
  storageBucket: "utmbootcampproject1.appspot.com",
  messagingSenderId: "1028484252352"
};
firebase.initializeApp(config);

//Variable used to reference database
var database = firebase.database();

var userRecipeSearch = "";

$("form").on("submit", event => {
  event.preventDefault();

  userRecipeSearch = $("#recipeSearchInput")
    .val()
    .trim();
  console.log(userRecipeSearch);
  var queryURL =
    "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?" +
    userRecipeSearch +
    "&instructionsRequired=true&number=10";

  console.log(queryURL + userRecipeSearch);

  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "X-Mashape-Key": "aJ0NhhB8Q8msh12jySvBgX34nXYmp1u8MVrjsna6Y4XHsKe8Bn"
    }
  })
    .then(function(response) {
      var recipeInfo = response.results;
      console.log(recipeInfo);
      for (var i = 0; i < recipeInfo.length; i++) {
        var recipeTitle = recipeInfo[i].title;
        var recipeID = recipeInfo[i].id;

        var readyInMins = recipeInfo[i].readyInMinutes;
        var servings = recipeInfo[i].servings;
        var recipeDiv = $("#recipe");
        var recipeimg = recipeInfo[i].image;
        console.log(recipeimg);
        var recipeImage = $("#recipeImage");
        recipeImage.attr("src", recipeimg);
        console.log(recipeImage);

        var spoonacularRecipeURL =
          "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" +
          recipeID +
          "/information?includeNutrition=true";

        $.ajax({
          url: spoonacularRecipeURL,
          method: "GET",
          headers: {
            "X-Mashape-Key":
              "aJ0NhhB8Q8msh12jySvBgX34nXYmp1u8MVrjsna6Y4XHsKe8Bn"
          }
        })
          .then(function(recipeResponse) {
            var responseofrecipe = recipeResponse.results;
            console.log(responseofrecipe);
            var recipeImageURL = JSON.stringify(recipeResponse.image);
            var recipeURL = recipeResponse.spoonacularSourceUrl;
            var recipeIDvar = $("#recipeId");
            recipeIDvar.attr("href", recipeURL);
            console.log(recipeIDvar);
            console.log(recipeURL);
            recipeDiv.attr("href", recipeURL);
            recipeImage.attr("src", recipeResponse.image);
            console.log(recipeImage);
            //   console.log("imgsrc", recipeResponse.image);
            console.log(recipeImage.attr("src"));
          })
          .catch(function(error) {
            console.log("Recipe Error: " + error);
          });
        var recipeFavButton = "";
        var displayCard =
          "<div class='col-lg-4 col-md-4 col-sm-4 card text-center resultSection'><div class='imgContainer'> <img class='card-img-top' src=" +
          recipeImage +
          "> <br> <ul class='list-group list-group-flush'> <li class='list-group-item' id='recipeTitle'><strong>Recipe Name: </strong><span id='recipeTitle'>" +
          recipeTitle +
          "</span></li> <li class='list-group-item'><strong>Ready in: </strong><span id='readyInMins'>" +
          readyInMins +
          " mins" +
          "</span></li> <li class='list-group-item'><strong>Servings: </strong><span id='servings'>" +
          servings +
          '</span></li></ul> <div class="card-body justify-content-center"> <center> <a target="_blank" href="' +
          //this should be the recipe button not yet made //
          recipeFavButton +
          '" class="btn btn-sm btn-info"><i class="fa fa-code" aria-hidden="true">Check Out The Recipe!</a></div> <div class="card-body justify-content-center"> <center> <a target="_blank" href="' +
          recipeFavButton +
          '" class="btn btn-sm btn-info"><i class="fa fa-code" aria-hidden="true">Favorites THIS!</a></div>';

        console.log(readyInMins);
        console.log(servings);
        //   console.log(displayCard);

        $("#recipeRoot").append(displayCard);
      }
    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
});

$("#signOut").on("click", function() {
  firebase
    .auth()
    .signOut()
    .then(
      function() {
        console.log("Logged out!");
        $(window).attr("location", "login.html");
      },
      function(error) {
        console.log(error.code);
        console.log(error.message);
      }
    );

  $(window).attr("location", "login.html");
});

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
    console.log("logged in");
  } else {
    console.log("not logged in");
    $(window).attr("location", "login.html");
  }
});
