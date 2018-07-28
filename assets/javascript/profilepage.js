var queryUrl = 'https://developers.zomato.com/api/v2.1/';
var search = 'search?q=';
var userSearch = '';

$('form').on('submit', event => {
  event.preventDefault();
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

      $('#results').empty();

      for (var i = 0; i < results.length; i++) {
        var restauName = results[i].restaurant.name;
        var restPic = results[i].restaurant.featured_image;
        var restLocation = results[i].restaurant.location.address;
        var restCouisines = results[i].restaurant.cuisines;
        var restRating = results[i].restaurant.aggregate_rating;
        var restAvgCost = results[i].restaurant.average_cost_for_two;
        var restCurrency = results[i].restaurant.currency;
        var restMenu = results[i].restaurant.menu_url;
        var menuIDvar = $('#menuId');

        menuIDvar.attr('href', restMenu);

        console.log(restauName);
        console.log(restPic);
        console.log(restLocation);
        console.log(restCouisines);
        console.log(restRating);
        console.log(restAvgCost);
        console.log(restCurrency);
        console.log(restMenu);

        $('#restrauntNameId').append(restauName);
        $('#imageLocationId').append(restPic);
        $('#ratingId').append(restauName);
        $('#addressId').append(restPic);
        $('#cousineId').append(restauName);
        $('#averageCostId').append(restPic);
        $('#currencyId').append(restauName);
      }
    }
  });
});
