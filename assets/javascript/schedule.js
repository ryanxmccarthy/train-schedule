var config = {
    apiKey: "AIzaSyCeOq_JRH1jGjOOL7T9I58ddRaPMA_ur4s",
    authDomain: "employee-data-mgmt-c63c4.firebaseapp.com",
    databaseURL: "https://employee-data-mgmt-c63c4.firebaseio.com",
    projectId: "employee-data-mgmt-c63c4",
    storageBucket: "employee-data-mgmt-c63c4.appspot.com",
    messagingSenderId: "218126975087"
};

firebase.initializeApp(config);

var database = firebase.database()

$('#submit').on('click', function() {
	event.preventDefault();

	var name = $('#name').val();
	var role = $('#role').val();
	var start = $('#start').val();
	var rate = $('#rate').val();
	// console.log(name, role, start, rate)

	database.ref().push({
	    name: name,
	    role: role,
	    start: start,
	    rate: rate,
	    dateAdded: firebase.database.ServerValue.TIMESTAMP
	})	
});

database.ref().on("child_added", function(childSnapshot){
		var childName = childSnapshot.val().name;
		var roleName = childSnapshot.val().role;
		var childDate = childSnapshot.val().start;
		var today = "10/04/17"
		var monthsWorked = moment(today).diff(childDate, 'months'); 
		var childRate = childSnapshot.val().rate;
		var totalBilled = monthsWorked * childRate;

		var table = $('#employee-data');
		table.append(
			'<tr><td>' + childName + '</td>' +
			'<td>' + roleName + '</td>' +
			'<td>' + childDate + '</td>' +
			'<td>' + monthsWorked + '</td>' +
			'<td>' + childRate + '</td>' +
			'<td>' + totalBilled + '</td></tr>'
			);
})