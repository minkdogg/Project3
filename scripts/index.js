//script handles user log-in(newLogIn,signIn,signInModal) and log-out (hideName)
//creates user object for new users and stores password.
//displays proper background image based on if a user is logged in.
//localStorage only can store text so "JSON's stringify and parse are used
//to convert data to objects and then back to text.

$(init);

function init(){

	$('#sign-up').submit(newLogIn);
	$('#sign-in').submit(signIn);
	$('#sign-inModal').submit(signInModal);
	$("#welcome").click(hideName);
	$("#addExercise").click(addExerciseUser);
	
//anonymous function used to check which index.html background image to display.
//decision is based on if the welcomeText displays Hello Guest or a user name.
//First 8 characters of welcomeText are used.
	(function() {
	var welcomeText = $("#welcome").html();
	welcomeText = welcomeText.substring(8,welcomeText.indexOf("<"));
	var path = $(location).attr('pathname');
	var loc = path.substring(path.lastIndexOf('/')+1);
	if (loc == "index.html" && welcomeText =="Hello Gu"){
			$("#user-login").hide();
			$("#main-body").show();
	}
	else if (loc =="index.html" && welcomeText !="Hello Gu"){
			$("#user-login").show();
			$("#main-body").hide();
	}
	})()
		
} //end of init function

//called on to display the correct div's based if a user is logged in.
function openingScreen(guest) {
	var path = $(location).attr('pathname');
	var loc = path.substring(path.lastIndexOf('/')+1);
	if (loc == "index.html" && guest == true){
			$("#user-login").hide();
			$("#main-body").show();
	}
	else if (loc =="index.html" && guest == false){
			$("#user-login").show();
			$("#main-body").hide();
		
	}
};

//returns all of the current users in localStorage
//not used but created in case it was needed.
function allStorage(){
    var archive = [];
    var keys = Object.keys(localStorage);
	var removeAutoIndex = keys.indexOf("autosave");
	//removes the autosave key from keys
	keys.splice(removeAutoIndex, 1);
    return keys;
};

//creates a new User object
function createName(name){
	return new User(name,localStorage.getItem(name));
};
 
//workhorse function. Log's the user out and displays alert.
//user can also log-in from a modal pop-up if no user is currently logged in.
//if user logs out, all calendar events are removed to create a blank calendar.
function hideName(){
	if (document.getElementById('welcome').innerHTML != "Hello Guest"){
	$("#welcomeLogIn").hide("slow", function() {
	var welcomeText = $("#welcome").html();
	welcomeText = welcomeText.substring(8,welcomeText.indexOf("<"));
	logOutName = JSON.parse(localStorage.getItem(welcomeText));
	logOutName.state = false;
    alert( "You are logged out! Thanks for visiting!" );
  });
	
  $("#welcomeLogIn").show("fast", function() {
    localStorage.removeItem('autosave');
	document.getElementById('welcome').innerHTML = "Hello Guest";
	
  });
  $("#welcome").blur();
  openingScreen(true);
	}
	else{
		$('#myloginModal').modal();
	}
	var path = $(location).attr('pathname');
	var loc = path.substring(path.lastIndexOf('/')+1);
	if (loc == "dailylog.html"){
			$('#calendar').fullCalendar('removeEvents');
	}
};

//checks to see if a user is already in localStorage.
//if not, then creates new User and adds username and password to local storage.
//updates welcome message to indicate they are signed in.
function newLogIn(){
	var signUser = $('#id_username_sign_up').val();
	var signPass = $('#id_password_sign_up').val();
	if (localStorage.getItem(signUser)) {
		alert("User already exists");
	}
	else{
		newUser = new User(signUser,signPass);
		newUser.state = true;
		var jsonNewUser = JSON.stringify(newUser);
		localStorage.setItem(signUser,jsonNewUser);
	$("#welcome").html("Welcome "+ signUser + "<br>" + "(click here to sign out)");
	$('#id_username_sign_up').val("");
	$('#id_password_sign_up').val("");
}
console.log("New User");
openingScreen(false);
return false;
}

//checks to see if username and password exist from localStorage. If not, alert tells user
//to reenter username or password. If it does, then the user is logged in.
function signIn(){
	var checkUser = $('#id_username').val();
	var checkPass = $('#id_password').val();
	var signInUser = JSON.parse(localStorage.getItem(checkUser))
	if (signInUser == null){
		alert("Username is not correct, please sign-up or enter correct log in name");
	}
	else {
		if (checkPass == signInUser.password){
	$("#welcome").html("Welcome "+ checkUser + "<br>" + "(click here to sign out)");
	$('#id_username').val("");
	$('#id_password').val("");
	$("#welcome").html("Welcome "+ checkUser + "<br>" + "(click here to sign out)");
	signInUser.state = true;
	$('#myloginModal').modal('hide');
	$('#id_username').val("");
	$('#id_password').val("");
	openingScreen(false);
	}
	else{
	alert("Password is not correct, please re-enter password");
	}
}
return false;
}

//from the modal window, a user can log-in. Same process as SignIn, except the 
//modal window values are used.
function signInModal(){
	var checkUser = $('#id_usernameModal').val();
	var checkPass = $('#id_passwordModal').val();
	var signInUserModal = JSON.parse(localStorage.getItem(checkUser));
	if (signInUserModal == null){
		alert("Username is not correct, please sign-up or enter correct log in name");
	}
	else {
		if (checkPass == signInUserModal.password){
	$("#welcome").html("Welcome "+ checkUser + "<br>" + "(click here to sign out)");
	$('#id_usernameModal').val("");
	$('#id_passwordModal').val("");
	$("#welcome").html("Welcome "+ checkUser + "<br>" + "(click here to sign out)");
	signInUserModal.state = true;
	$('#myloginModal').modal('hide');
	$('#id_usernameModal').val("");
	$('#id_passwordModal').val("");
	openingScreen(false);
	}
	else{
	alert("Password is not correct, please re-enter password");
	}
}
return false;
}

//creates a User object and stores the username and password.
//workoutRoutine,dailyLog, and state are not utilized at this time.
function User(username,password) {
	this.username = username;
	this.password = password;
	this.workoutRoutine = [];
	this.dailyLog = [];
	this.events =  [];
	this.state = false;
	
}

//object Food is not used. Will be incorporated in future work.
function Food(name,amount) {
	this.name = name;
	this.amount;
}


//anonymous function used to autosave the welcome text so that if
//the user closes the browser accidently, it will keep them logged in. 
(function() {
  // Grab the text-welcome message
  var welcome = document.getElementById('welcome');
  // checks to see if localStorage is supported by the user's browser.
  function supportsLocalStorage() {
    return typeof(Storage)!== 'undefined';
  }
  // if it isn't supported then the welcome message will inform the user
  // that localStorage doesn't work and this site won't be able to use the login feature.
  if (!supportsLocalStorage()) {
    // Change the value to inform the user of no support
    welcome.innerHTML = 'No HTML5 localStorage support';
  } else {
    // if it does, then every second it will save the welcome message to a variable called "autosave"
    try {
      // Set the interval and autosave every second
      setInterval(function() {
        localStorage.setItem('autosave', welcome.innerHTML);
      }, 1000);
    } catch (e) {
      // If any errors, catch and alert the user that the 5MB of localStorage has been used up.
      if (e == QUOTA_EXCEEDED_ERR) {
        alert('Quota exceeded!');
      }
    }
    
    // Finally, it will check to see if there is an autosave value in Local Storage
	// and if there is it will log the user in by displaying the welcome greeting.
    if (localStorage.getItem('autosave')) {
    
      // Retrieve the item
      welcome.innerHTML = localStorage.getItem('autosave');
    }
  }
})();

 function addExerciseUser(user) {
	 exercise = $('#exerciseType').val()
	 if (document.getElementById('welcome').innerHTML != "Hello Guest"){
		var welcomeText = $("#welcome").html();
		welcomeText = welcomeText.substring(8,welcomeText.indexOf("<"));
		logOutName = JSON.parse(localStorage.getItem(welcomeText));
		logOutName.events.push(exercise);
		var logBackName = JSON.stringify(logOutName);
		localStorage.setItem(welcomeText,logBackName);
		console.log(logOutName.events)
 }
 }
 

