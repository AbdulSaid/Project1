$(document).ready(function () {

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


  //Login event 
  $("#login").on("click", function () {
    event.preventDefault();
    var email = $("#userEmail")
      .val()
      .trim();
    var password = $("#userPassword")
      .val()
      .trim();

    $("#userEmail").val("");
    $("#userPassword").val("");

    if (!email || !password) {
      $("#loginError").modal('show')
    } else {

      var auth = firebase.auth();

      auth.signInWithEmailAndPassword(email, password)
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("signIn error", error);
          $(".loginError").text(error);
          $("#loginError").modal("show");
        });

      firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          console.log(firebaseUser);
          console.log("logged in");
          $(window).attr("location", "profilepage.html");
        } else {
          console.log("not logged in");
        }
      });

    }
  });

  $("#createAccount").on("click", function () {
    //validate email entry
    event.preventDefault();
    var email = $("#createEmail")
      .val()
      .trim();
    var password = $("#createPassword1")
      .val()
      .trim();

    $("#createEmail").val("");
    $("#createPassword1").val("");

    if (!email || !password) {
      $("#accountCreateError").modal("show");
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        $(".accountCreateError").text(error);
        $("#accountCreateError").modal("show");
        if (error.code === "auth/email-already-in-use") {
          var credential = firebase.auth.EmailAuthProvider.credential(
            email,
            password
          );
        }
      });
  });


  $('#logout').on('click', function () {
    event.preventDefault();
    firebase.auth().signOut().then(function () {
      console.log("Logged out!")
      $(window).attr("location", "login.html");
    }, function (error) {
      console.log(error.code);
      console.log(error.message);
    });
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
      console.log("logged in");
    } else {
      console.log("not logged in");
    }
  });


});