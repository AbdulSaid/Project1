$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAtFbFd9IcS0epRUFwVAHv171yHyJJ265I",
    authDomain: "utmbootcampproject1.firebaseapp.com",
    databaseURL: "https://utmbootcampproject1.firebaseio.com",
    projectId: "utmbootcampproject1",
    storageBucket: "utmbootcampproject1.appspot.com",
    messagingSenderId: "1028484252352"
  };
  firebase.initializeApp(config); //Variable used to reference database

  var database = firebase.database(); //Sign In event

  // search function API

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
          var recipeDiv = "";

          var recipeImage = "";

          var spoonacularRecipeURL =
            "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" +
            recipeID +
            "/information?includeNutrition=flase";

          $.ajax({
            url: spoonacularRecipeURL,
            method: "GET",
            headers: {
              "X-Mashape-Key":
                "aJ0NhhB8Q8msh12jySvBgX34nXYmp1u8MVrjsna6Y4XHsKe8Bn"
            }
          })
            .then(function(recipeResponse) {
              // var responseofrecipe = recipeResponse.results;
              console.log(recipeResponse);
              var recipeImageURL = recipeResponse.image;

              var recipeURL = recipeResponse.spoonacularSourceUrl;
              recipeDiv = recipeURL;
              console.log(recipeURL);

              recipeImage = recipeImageURL;
              console.log(recipeImageURL);

              console.log("RECIPEDIV: " + recipeDiv);
              console.log("RECIPEIMAGE: " + recipeImage);
            })
            .catch(function(error) {
              console.log("Recipe Error: " + error);
            });
          var recipeFavButton = "";
          var displayCard =
            '<div class="col-lg-4 col-md-4 col-sm-4 card text-center resultSection"  ><div class="imgContainer"> <img class="card-img-top" src="' +
            recipeImage +
            '" ><br> <ul class="list-group list-group-flush"> <li class="list-group-item" id="recipeTitle"><strong>Recipe Name: </strong><span id="restauName">' +
            recipeTitle +
            '</span></li><li class="list-group-item" id="readyInMins"><strong>Ready in Minutes: </strong><span id="location">' +
            readyInMins +
            '</span></li> <li class="list-group-item"><strong>Servings: </strong><span id="servings">' +
            servings +
            '</span></li></ul> <div class="card-body justify-content-center"> <center> <a target="_blank" href="' +
            recipeDiv +
            '" class="btn btn-sm btn-info"> Checkout Their Menu here! </a> </div><div class="card-body justify-content-center"> <center> <a target="_blank" href="' +
            // this should be the favourite button, not made yet
            recipeFavButton +
            '" class="btn btn-sm btn-info"><i class="fa fa-code" aria-hidden="true"> Favourite This! </a></div>';

          console.log(readyInMins);
          console.log(servings);
          //   console.log(displayCard);

          $("#recipeRoot").append(displayCard);
          userRecipeSearch = "";
          $("recipeSearchInput").val("");
        }
      })
      .catch(function(error) {
        console.log("Error: " + error);
      });
  });

  /*the correct version of the JS should upload*/

  // //Sign-in function
  // $("#signIn").on("click", function() {
  //   event.preventDefault();
  //   //Grabs user input values for email and password
  //   var email = $("#username")
  //     .val()
  //     .trim();
  //   var password = $("#password")
  //     .val()
  //     .trim();

  //   //Clears fields
  //   $("#username").val("");
  //   $("#password").val("");

  //   //If email and password absent, display error message
  //   if (!email || !password) {
  //     $("#signInError").modal("show");
  //     //Else sign user in
  //   } else {
  //     var auth = firebase.auth();

  //     //Firebase function for signing in users
  //     auth.signInWithEmailAndPassword(email, password).catch(function(error) {
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       console.log("signIn error", error);
  //       $(".signInError").text(error);
  //       $("#signInError").modal("show");
  //     });

  //     //Once user is signed in, then direct them to their profile page
  //     firebase.auth().onAuthStateChanged(firebaseUser => {
  //       if (firebaseUser) {
  //         console.log(firebaseUser);
  //         console.log("logged in");
  //         $(window).attr("location", "profilepage.html");
  //       } else {
  //         console.log("not logged in");
  //       }
  //     });
  //   }
  // });

  // // database.ref().once("child_added", function(childSnapshot) {
  // //   var accountUser = childSnapshot.val().userName;
  // //   $("#accountName").append("<p>" + accountUser + "</p>");
  // //   console.log(accountUser);
  // // });

  // //Create account function
  // $("#createAccount").on("click", function() {
  //   //validate email entry
  //   event.preventDefault();

  //   //Grabs values from username, email, and password fields
  //   var username = $("#inputUsername")
  //     .val()
  //     .trim();

  //   var email = $("#inputEmail")
  //     .val()
  //     .trim();
  //   var password1 = $("#inputPassword1")
  //     .val()
  //     .trim();

  //   var password2 = $("#InputPassword2")
  //     .val()
  //     .trim();

  //   //Clears fields
  //   $("#inputUsername").val("");
  //   $("#inputEmail").val("");
  //   $("#inputPassword1").val("");
  //   $("#InputPassword2").val("");

  //   //If email and password absent, displays error message
  //   if (!email || !password1) {
  //     $("#accountCreateError").modal("show");
  //     //If password1 and password2 (confirmation), don't match, then displays error message
  //   } else if (password1 != password2) {
  //     $(".accountCreateError").text("Passwords do not match. Please re-type.");
  //     $("#accountCreateError").modal("show");
  //     //Creates account and stores in Firebase authentication
  //   } else {
  //     firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(email, password1)
  //       .catch(function(error) {
  //         $(".accountCreateError").text(error);
  //         $("#accountCreateError").modal("show");
  //         if (error.code === "auth/email-already-in-use") {
  //           var credential = firebase.auth.EmailAuthProvider.credential(
  //             email,
  //             password1
  //           );
  //         }
  //       });

  //     //Stores user information in Firebase database
  //     var uid = firebase.auth().currentUser.uid;
  //     firebase
  //       .database()
  //       .ref()
  //       .child("accounts")
  //       .child(uid)
  //       .set({
  //         email: email,
  //         username: username
  //       });
  //   }

  //   //Detects if user signed in, then directs to their profile page
  //   firebase.auth().onAuthStateChanged(firebaseUser => {
  //     if (firebaseUser) {
  //       console.log(firebaseUser);
  //       console.log("logged in");
  //       $(window).attr("location", "profilepage.html");
  //     } else {
  //       console.log("not logged in");
  //     }
  //   });
  // });

  // var unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
  //   if (firebaseUser) {
  //     console.log(firebaseUser);
  //     console.log("logged in");
  //   } else {
  //     console.log("not logged in");
  //     $(window).attr("location", "login.html");
  //   }
  // });

  // unsubscribe();
});
