var userRecipeSearch = '';

$('form').on('submit', event => {
  event.preventDefault();

  userRecipeSearch = $('#recipeSearchInput')
    .val()
    .trim();
  console.log(userRecipeSearch);
  var queryURL =
    'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?' +
    userRecipeSearch +
    '&instructionsRequired=true&number=10';

  console.log(queryURL + userRecipeSearch);

  $.ajax({
    url: queryURL,
    method: 'GET',
    headers: {
      'X-Mashape-Key': 'aJ0NhhB8Q8msh12jySvBgX34nXYmp1u8MVrjsna6Y4XHsKe8Bn'
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
        var recipeDiv = '';

        var recipeImage = '';

        var spoonacularRecipeURL =
          'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' +
          recipeID +
          '/information?includeNutrition=false';

        $.ajax({
          url: spoonacularRecipeURL,
          method: 'GET',
          headers: {
            'X-Mashape-Key':
              'aJ0NhhB8Q8msh12jySvBgX34nXYmp1u8MVrjsna6Y4XHsKe8Bn'
          }
        })
          .then(function(recipeResponse) {
            // var responseofrecipe = recipeResponse.results;
            console.log(recipeResponse);
            var recipeImageURL = recipeResponse.image;
            var recipeURL = recipeResponse.spoonacularSourceUrl;

            recipeDiv = recipeURL; // console.log(recipeURL);
            recipeImage = recipeImageURL; // console.log(recipeImageURL);
            console.log('RECIPEDIV: ' + recipeDiv);
            console.log('RECIPEIMAGE: ' + recipeImage);
            var recipeFavButton = '';
            var displayCard =
              '<div class="col-lg-4 col-md-4 col-sm-4 card text-center resultSection"  ><div class="imgContainer"> <img class="card-img-top" src="' +
              recipeImage + // image url returning unknown"
              '" ><br> <ul class="list-group list-group-flush"> <li class="list-group-item" id="recipeTitle"><strong>Recipe Name: </strong><span id="restauName">' +
              recipeTitle +
              '</span></li><li class="list-group-item" id="readyInMins"><strong>Ready in Minutes: </strong><span id="location">' +
              readyInMins +
              '</span></li> <li class="list-group-item"><strong>Servings: </strong><span id="servings">' +
              servings +
              '</span></li></ul> <div class="card-body justify-content-center"> <center> <a target="_blank" href="' +
              recipeDiv +
              '" class="btn btn-sm btn-info"> Checkout Recipe! </a> </div><div class="card-body justify-content-center"> <center> <a target="_blank" href="' + // this should be the favourite and recipe button, not linked yet
              recipeFavButton +
              '" class="btn btn-sm btn-info"><i class="fa fa-code" aria-hidden="true"> Favourite This! </a></div>';

            console.log(
              '<a target="_blank" href="' +
                recipeDiv +
                '" class="btn btn-sm btn-info"> Checkout Their Menu here! </a>'
            );
            console.log(servings);
            console.log(displayCard);

            $('#recipeRoot').append(displayCard);
            userRecipeSearch = '';
            $('recipeSearchInput').val('');
          })
          .catch(function(error) {
            console.log('Recipe Error: ' + error);
          });
      }
    })
    .catch(function(error) {
      console.log('Error: ' + error);
    });
});
