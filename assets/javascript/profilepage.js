// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAtFbFd9IcS0epRUFwVAHv171yHyJJ265I',
  authDomain: 'utmbootcampproject1.firebaseapp.com',
  databaseURL: 'https://utmbootcampproject1.firebaseio.com',
  projectId: 'utmbootcampproject1',
  storageBucket: 'utmbootcampproject1.appspot.com',
  messagingSenderId: '1028484252352'
};
firebase.initializeApp(config);

//Variable used to reference database
var database = firebase.database();

$('form').on('submit', function() {
  event.preventDefault();

  var post = $('#postToWallId')
    .val()
    .trim();
  var time = setInterval(function(startTime) {
    $('#timer').html(moment().format('hh:mm a'));
  }, 1000);
  $('body').on('click', '.fa-trash', function() {
    $(this)
      .closest('tr')
      .remove();
    alert('delete button clicked');
  });

  var userPostData = {
    userPost: post,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };

  database.ref().push(userPostData);

  console.log(userPostData.userPost);
  console.log(post);

  $('#post-topbar').append(
    '<i id="trashcan" aria-hidden="true"></i>' +
      '<div class="post-topbar"> <div class="post-bar"> <div class="usy-dt">' +
      '<h6>' +
      'Status:' +
      '</div> <div class="usy-name">' +
      post +
      '</h6><span> <img /> </span> </div> </div>' +
      '<div class="form-group"><label for="exampleTextarea"></label><textarea class="form-control" id="exampleTextarea" rows="3" placeholder="leave a comment"></textarea></div>' +
      '<button type="button" class="btn btn-primary submitposttowall justify-content-center" id="">Post comment</button>'
  );
});

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    // email = firebaseUser.email;
    // $("#username").text(email);
    //User is signed in
    console.log(firebaseUser.uid);
    console.log('logged in');

    var uid = firebase.auth().currentUser.uid;
    database
      .ref('accounts')
      .ref.child(uid)
      .orderByChild('username')
      .on('value', function(snapshot) {
        $('.username').text(snapshot.val().username);
        console.log;
      });
  } else {
    //No user is signed in
    console.log('not logged in');
  }
});

$('#signOut').on('click', function() {
  firebase
    .auth()
    .signOut()
    .then(
      function() {
        console.log('Logged out!');
        $(window).attr('location', 'login.html');
      },
      function(error) {
        console.log(error.code);
        console.log(error.message);
      }
    );

  $(window).attr('location', 'login.html');
});

$('#edit').on('click', function() {
  $('#editProfile').modal('show');
});

$('#saveChanges').on('click', function() {
  age = $('#ageInput')
    .val()
    .trim();

  aboutMe = $('#aboutMeInput')
    .val()
    .trim();

  displayName = $('#displayNameInput')
    .val()
    .trim();

  $('.age').text(age);
  $('.aboutMe').text(aboutMe);
  $('#displayName').text(displayName);
});
