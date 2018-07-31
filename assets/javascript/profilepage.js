// search function API
var queryUrl = 'https://developers.zomato.com/api/v2.1/';
var search = 'search?q=';
var userSearch = '';
//document.getElementById('cardofRest').style.cssText = 'display: none';

$('form').on('submit', event => {
  event.preventDefault();
  $('#results').empty();
  userSearch = $('#searchInput')
    .val()
    .trim(); // ajax call
  console.log(queryUrl + search + userSearch);
  $.ajax({
    type: 'GET', //it's a GET request API
    headers: {
      'X-Zomato-API-Key': 'd1a7372a2de0ce54286c43c8cdba7a34' //only allowed non-standard header
    },
    url: queryUrl + search + userSearch, //what do you want
    dataType: 'json', //wanted response data type - let jQuery handle the rest...
    data: {
      //could be directly in URL, but this is more pretty, clear and easier to edit
      name: userSearch
    },
    processData: true, //data is an object => tells jQuery to construct URL params from it
    success: function(data) {
      var results = data.restaurants;
      console.log(results);

      for (var i = 0; i < results.length; i++) {
        var restauName = results[i].restaurant.name; //
        var restPic = results[i].restaurant.featured_image; //
        var picofrest = $('#restrauntPictureId'); //
        picofrest.attr('src', restPic); //
        var restLocation = results[i].restaurant.location.address; //
        var restCouisines = results[i].restaurant.cuisines; //
        var restRating = results[i].restaurant.user_rating.rating_text; //
        var restAvgCost = results[i].restaurant.average_cost_for_two; //
        var restCurrency = results[i].restaurant.currency; //
        var restMenu = results[i].restaurant.menu_url;
        var menuIDvar = $('#menuId');
        menuIDvar.attr('href', restMenu);
        var card =
          '<div class="col-lg-4 col-md-4 col-sm-4 card text-center resultSection"  ><div class="imgContainer"> <img class="card-img-top" src=' +
          restPic +
          '><br> <ul class="list-group list-group-flush"> <li class="list-group-item" id="restauName"><strong>Restaurant Name: </strong><span id="restauName">' +
          restauName +
          '</span></li><li class="list-group-item" id="restLocation"><strong>Restaurant Address: </strong><span id="location">' +
          restLocation +
          '</span></li> <li class="list-group-item"><strong>Rating: </strong><span id="rating">' +
          restRating +
          '</span></li> <li class="list-group-item"><strong>Main cuisine type: </strong><span id="cuisine">' +
          restCouisines +
          '</span></li> <li class="list-group-item"><strong>Average Cost for Two: </strong><span id="restAvgCost">' +
          restAvgCost +
          '</span></li> <li class="list-group-item"><strong>Currency restaurant deals in: </strong><span id="restCurrency">' +
          restCurrency +
          '</span></li></ul> <div class="card-body justify-content-center"> <center> <a target="_blank" href="' +
          restMenu +
          '" class="btn btn-sm btn-info"><i class="fa fa-code" aria-hidden="true"> Checkout Their Menu here</a></div>';
        console.log(restauName);
        console.log(restPic);
        console.log(restLocation);
        console.log(restCouisines);
        console.log(restRating);
        console.log(restAvgCost);
        console.log(restCurrency);
        console.log(restMenu);

        $('#root').append(card);
      }
    }
  });
  $('#root').empty();
});

/*the correct version of the JS should upload*/
