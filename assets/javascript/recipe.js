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
        var recipeDiv = $('#recipe');
        var recipeImage = $('#recipeImage');

        var spoonacularRecipeURL =
          'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' +
          recipeID +
          '/information?includeNutrition=true';

        $.ajax({
          url: spoonacularRecipeURL,
          method: 'GET',
          headers: {
            'X-Mashape-Key':
              'aJ0NhhB8Q8msh12jySvBgX34nXYmp1u8MVrjsna6Y4XHsKe8Bn'
          }
        })
          .then(function(recipeResponse) {
            // debugger;
            console.log(recipeResponse);
            var recipeImageURL = JSON.stringify(recipeResponse.image);
            var recipeURL = recipeResponse.spoonacularSourceUrl;
            recipeDiv.attr('href', recipeURL);
            recipeImage.attr('src', recipeResponse.image);
            //   console.log("imgsrc", recipeResponse.image);
            console.log(recipeImage.attr('src'));
          })
          .catch(function(error) {
            console.log('Recipe Error: ' + error);
          });
        var recipeFavButton = '';
        var displayCard =
          "<div class='col-lg-4 col-md-4 col-sm-4 card text-center resultSection'><div class='imgContainer'> <img class='card-img-top' src=" +
          recipeImage.attr('src') +
          "> <br> <ul class='list-group list-group-flush'> <li class='list-group-item' id='recipeTitle'><strong>Recipe Name: </strong><span id='recipeTitle'>" +
          recipeTitle +
          "</span></li> <li class='list-group-item'><strong>Ready in: </strong><span id='readyInMins'>" +
          readyInMins +
          "</span></li> <li class='list-group-item'><strong>Servings: </strong><span id='servings'>" +
          servings +
          "class='btn btn-sm btn-info'><i class='fa fa-code' aria-hidden='true'> Here's the recipe! </a></div><div class='card-body justify-content-center'> <center> <a target=“_blank” href='" +
          recipeFavButton +
          "class='btn btn-sm btn-info'><i class='fa fa-code' aria-hidden='true'>Favorites THIS!</a></div>";

        console.log(readyInMins);
        console.log(servings);
        //   console.log(displayCard);

        $('#recipeRoot').append(displayCard);
      }
    })
    .catch(function(error) {
      console.log('Error: ' + error);
    });
});

//         var card =
//           ‘<div class=“col-lg-4 col-md-4 col-sm-4 card text-center resultSection”  ><div class=“imgContainer”> <img class=“card-img-top” src=’ +
//           restPic +
//           ‘><br> <ul class=“list-group list-group-flush”> <li class=“list-group-item” id=“restauName”><strong>Restaurant Name: </strong><span id=“restauName”>’ +
//           restauName +
//           ‘</span></li><li class=“list-group-item” id=“restLocation”><strong>Restaurant Address: </strong><span id=“location”>’ +
//           restLocation +
//           ‘</span></li> <li class=“list-group-item”><strong>Rating: </strong><span id=“rating”>’ +
//           restRating +
//           ‘</span></li> <li class=“list-group-item”><strong>Main cuisine type: </strong><span id=“cuisine”>’ +
//           restCouisines +
//           ‘</span></li> <li class=“list-group-item”><strong>Average Cost for Two: </strong><span id=“restAvgCost”>’ +
//           restAvgCost +
//           ‘</span></li> <li class=“list-group-item”><strong>Currency restaurant deals in: </strong><span id=“restCurrency”>’ +
//           restCurrency +
//           ‘</span></li></ul> <div class=“card-body justify-content-center”> <center> <a target=“_blank” href=“’ +
//           restMenu +
//           ‘” class=“btn btn-sm btn-info”><i class=“fa fa-code” aria-hidden=“true”> Checkout Their Menu here</a></div><div class=“card-body justify-content-center”> <center> <a target=“_blank” href=“’ +
//           favoriteButton +
//           ‘” class=“btn btn-sm btn-info”><i class=“fa fa-code” aria-hidden=“true”>Favorites THIS!</a></div>‘;

//         console.log(restauName);
//         console.log(restPic);
//         console.log(restLocation);
//         console.log(restCouisines);
//         console.log(restRating);
//         console.log(restAvgCost);
//         console.log(restCurrency);
//         console.log(restMenu);

//         $(‘#root’).append(card);
//       }
//     }
//   });
//   $(‘#root’).empty();
//  });

//   unirest
//     .get(
//       "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/menuItems/search?maxCalories=5000&maxCarbs=100&maxFat=100&maxProtein=100&minCalories=0&minCarbs=0&minFat=0&minProtein=0&number=10&offset=0&query=burger"
//     )
//     .header(
//       "X-Mashape-Key",
//       "aJ0NhhB8Q8msh12jySvBgX34nXYmp1u8MVrjsna6Y4XHsKe8Bn"
//     )
//     .header("Accept", "application/json")
//     .end(function(result) {
//       console.log(result.status, result.headers, result.body);
//     });
