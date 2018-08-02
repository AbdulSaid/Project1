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
      '<button type="submit" class="btn btn-primary submitposttowall justify-content-center" id="">Post comment</button>'
  );

  $('#postToWallId').val('');
});

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    email = firebaseUser.email;
    name = firebaseUser.displayName;
    $('#email').text(email);
    //User is signed in
    console.log(firebaseUser);
    console.log(name);
    console.log('logged in');
  } else {
    //No user is signed in
    console.log('not logged in');
  }
});
