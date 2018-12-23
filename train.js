
  var config = {
    apiKey: "AIzaSyDtXc4HR9pZrW5aaR1mJXdYkRcsxPgQHqk",
    authDomain: "week7-day2-6710e.firebaseapp.com",
    databaseURL: "https://week7-day2-6710e.firebaseio.com",
    projectId: "week7-day2-6710e",
    storageBucket: "week7-day2-6710e.appspot.com",
    messagingSenderId: "281281552033"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName="";
  var destination="";
  var firstTrain="";
  var frequency=0;


  $("#submit").on("click", function(event) {
    event.preventDefault();

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    // firstTrain = $("#firstTrain").val().trim();
    frequency = $("#frequency").val().trim();
    
    database.ref().push({
        trainName: trainName,
        destination: destination,
        // firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

  });

  database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

  
    console.log(sv.trainName);
    console.log(sv.destination);
    // console.log(sv.firstTrain);
    console.log(sv.frequency);

    var tableRow= $("<tr>");

    var tableCell= $("<td>").text(sv.trainName);
    var tableCell1= $("<td>").text(sv.destination);
    var tableCell2= $("<td>").text(sv.frequency);
    // var tableCell3= $("<td>").text(sv.firstTrain);
    


    tableRow.append(tableCell, tableCell1, tableCell2);
    $("#trainRows").append(tableRow);
  


    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });





// We need to get: train name by user input by string
var trainName;
// We need to get: destination by user input by string
var trainDest;
// We need to get: first train time in military time by user input (possible conversion) by string
var currentTime = moment();
var startTime = moment();
// We need to get: frequency in minutes by user input by number
// var frequency;

// For next arrival time- use math logic
// For minutes away- use math logic
var difference = currentTime.diff(startTime, "minutes")
var remainder = difference % frequency;

var nextTrain = frequency - remainder;

var nextArrival = currentTime.add(nextTrain, "minutes");
var tableCell4= $("<td>").text(sv.nextArrival);


//  test case
    // user enters 3:30 first time
    // current time = 3:42
    // diff = 12 minutes
    // frequency = 5min
    // remainder = diff/frequency or = 2min
    // minutes til next train = frequency minus the remainder or = 3min
    // time of next arrival = current time + minutes til next train
// 