$(document).ready(function(){
	var config = {
	    apiKey: "AIzaSyCsfoDFVSdMNuw3K22R0EUOzSAZFmbVFIc",
	    authDomain: "train-schedule-7b1a2.firebaseapp.com",
	    databaseURL: "https://train-schedule-7b1a2.firebaseio.com",
	    projectId: "train-schedule-7b1a2",
	    storageBucket: "",
	    messagingSenderId: "552069096998"
	};

	firebase.initializeApp(config);

	var database = firebase.database()

	$('#submit').on('click', function() {
		event.preventDefault();

		var name = $('#name').val();
		var dest = $('#dest').val();
		var first = $('#first').val();
		var freq = $('#freq').val();
		// console.log(name, role, start, rate)

		database.ref().push({
		    name: name,
		    dest: dest,
		    first: first,
		    freq: freq,
		})	
	});

	database.ref().on("child_added", function(childSnapshot){
			var childName = childSnapshot.val().name;
			var childDest = childSnapshot.val().dest;
			var childFirst = moment(childSnapshot.val().first, "HH:mm").subtract(10, "years").format("X");
			// console.log(childFirst)		
			var childFreq = childSnapshot.val().freq;

			var differenceTimes = moment().diff(moment.unix(childFirst), "minutes");
			// console.log(differenceTimes)
			var tRemainder = moment().diff(moment.unix(childFirst), "minutes") % childFreq ;
			// console.log(tRemainder)
			var tMinutes = childFreq - tRemainder;

			var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

			var table = $('#employee-data');
			table.append(
				'<tr><td>' + childName + '</td>' +
				'<td>' + childDest + '</td>' +
				'<td>' + childFreq + '</td>' +
				'<td>' + tArrival + '</td>' +
				'<td>' + tMinutes + '</td></tr>'
				);
	})
});