var config = {
apiKey: "AIzaSyAYLEE8GgNfBwUU4F01CZnFPySIInOxe60",
authDomain: "trainschedule-3a03f.firebaseapp.com",
databaseURL: "https://trainschedule-3a03f.firebaseio.com",
projectId: "trainschedule-3a03f",
storageBucket: "",
messagingSenderId: "673670576355"
};

//initialize firebase
firebase.initializeApp(config);

//firebase data assignment
const database = firebase.database();

//creates variables for the values to be stored
let name = "";
let dest = ""
let time = 0;
let freq = 0;

//click event handlerer for submit button
$("#submitTrain").on("click", function(event) {
	event.preventDefault();

	//stores field values
	name = $("#trainName").val().trim();
  dest = $("#trainDest").val().trim();
  time = $("#firstTime").val().trim();
  freq = $("#freq").val().trim();

  //clears fields after storing values
  $("#trainName").val("");
  $("#trainDest").val("");
  $("#firstTime").val("");
  $("#freq").val("")

  //logs the values
  console.log(name);
  console.log(dest);
  console.log(time);
  console.log(freq);

  //submits stored values to firebase
  database.ref().push({
  	name,
    dest,
    time,
    freq
  });
});

database.ref().on("child_added", function(childSnapshot) {
	
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().dest);
  console.log(childSnapshot.val().freq);
  console.log(childSnapshot.val().time);
  
  //converts time from HTML(subtracts a year for past);
  let tTime = childSnapshot.val().time;
      tTime = moment(tTime,"HH:mm").subtract(1, "years");

  let tFreq = childSnapshot.val().freq;

  let currTime = moment().format("HH:mm");
    console.log("current:" + currTime);

  let diffTime = moment().diff(moment(tTime), "minutes");
    console.log("difference(min): " + diffTime);

  let tRemainder = diffTime % tFreq;
    console.log(tFreq);

    //Calculates min left til next train
  let tMinLeft = tFreq - tRemainder;
    console.log("Min left:" + tMinLeft);

    //calulates time of next train
  let nextTrainTime = moment().add(tMinLeft, "minutes");
      nextTrainTime = moment(nextTrainTime).format("hh:mm")
    console.log("Next train at:" + nextTrainTime)

    //adds train data to table
  $("#trainTable").append("<tr><th>" + childSnapshot.val().name +
  	"</th><td>" + childSnapshot.val().dest + "</td><td>" + tFreq +
  	"</td><td> " + nextTrainTime + "</td><td>"+ tMinLeft +"</td></tr>" );

}, function(errorObject) {
	console.log("Errors handled: " + errorObject.code);
});







 