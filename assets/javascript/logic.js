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
  firebase.initializeApp(config);

  //Variable used to reference database
  var database = firebase.database();

  //Sign In event
  $("#signIn").on("click", function() {
    event.preventDefault();
    var email = $("#username")
      .val()
      .trim();
    var password = $("#password")
      .val()
      .trim();

    $("#username").val("");
    $("#password").val("");

    if (!email || !password) {
      $("#signInError").modal("show");
    } else {
      var auth = firebase.auth();

      auth.signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("signIn error", error);
        $(".signInError").text(error);
        $("#signInError").modal("show");
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

  $("#createAccount").on("click", function() {
    //validate email entry
    event.preventDefault();
    var email = $("#inputEmail")
      .val()
      .trim();
    var password1 = $("#inputPassword1")
      .val()
      .trim();

    var password2 = $("#InputPassword2")
      .val()
      .trim();

    $("#inputEmail").val("");
    $("#inputPassword1").val("");
    $("#InputPassword2").val("");

    if (!email || !password1) {
      $("#accountCreateError").modal("show");
    } else if (password1 != password2) {
      $(".accountCreateError").text("Passwords do not match. Please re-type.");
      $("#accountCreateError").modal("show");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password1)
        .catch(function(error) {
          $(".accountCreateError").text(error);
          $("#accountCreateError").modal("show");
          if (error.code === "auth/email-already-in-use") {
            var credential = firebase.auth.EmailAuthProvider.credential(
              email,
              password1
            );
          }
        });
    }
  });

  $("#signOut").on("click", function() {
    event.preventDefault();
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
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
      console.log("logged in");
    } else {
      console.log("not logged in");
      // setTimeout(function() {
      //   window.location.href = "login.html";
      // }, 1000);
    }
  });
});
