//displays user specific calendar so events can be stored, deleted, or moved.
//events can include descriptions specific to each day.
//fullCalendario.js is used to access calendar.
//JSON is used to transfer events to and from local storage. 
//Stringify and parse are used to convert text string to objects and back.

$(init)

function init() {
		//creates a local storage item called id to give to event objects.
		//if none is located in local storage then it is created.
		if (localStorage.getItem("id") == null){
			localStorage.setItem("id","0");
		}
		$('#sign-inModalDaily').submit(signInModalDaily);

//calendar object is created for page.
$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			
			selectable: true,
			selectHelper: true,
			events: [],
			//after clicking a day, a prompt will ask for title and then daily goal.
			//after entering prompts, an event is created with the eventData below.
			select: function(start, end) {
				var title = prompt('Event Title:');
				var description = prompt('Daily Goal:')
				var eventData;
				if (title) {
					newCount = parseInt(localStorage.getItem("id"))+1
					localStorage.setItem("id",newCount)
					eventData = {
						title: title,
						start: start,
						end: end,
						description: description,
						id: newCount
						
					};
					//renderEvent puts the event on the calendar on the page.
					$('#calendar').fullCalendar('renderEvent', eventData, true); //					stick? = true
					//event is then stored in local storage based on the user name.
					var welcomeText = $("#welcome").html();
					if (welcomeText != "Hello Guest"){
						welcomeText = welcomeText.substring(8,welcomeText.indexOf("<"));
						logName = JSON.parse(localStorage.getItem(welcomeText));
						logName.events.push(eventData);
						var jsonNewEvent = JSON.stringify(logName);
						localStorage.setItem(welcomeText,jsonNewEvent);
						
					}
					
				$('#calendar').fullCalendar('unselect');
			}
			},
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			//on moving an event, the event, is moved. A new event is created for that day
			//and the old event is deleted. Events are then re-stored in localStorage.
			eventDrop: function(event, delta, revertFunc) {
								var newEvent = {
									title: event.title,
									start: event.start,
									end: event.end,
									description: event.description,
									id: event.id
								};
					var welcomeText = $("#welcome").html();

					if (welcomeText != "Hello Guest"){
						welcomeText = welcomeText.substring(8,welcomeText.indexOf("<"))
						logName = JSON.parse(localStorage.getItem(welcomeText));
						for (i = 0; i<logName.events.length;i++){
							if (logName.events[i].id == event.id) {
								logName.events.splice(i,1);
							}
						}
						logName.events.push(newEvent);
						
						var jsonNewEvent = JSON.stringify(logName);
						localStorage.setItem(welcomeText,jsonNewEvent);
					}		

    },
			
			//when clicking an existing event, show the description and ask if they want to delete.
			eventClick: function(calEvent, jsEvent, view) {
		console.log(calEvent)
        alert('Event: ' + calEvent.title + "\n" + 'Description: '+calEvent.description);
		
        // 
        var r=confirm("Delete " + calEvent.title);
            if (r===true)
              {
                  $('#calendar').fullCalendar('removeEvents', calEvent._id);
				  	var welcomeText = $("#welcome").html();
					
					if (welcomeText != "Hello Guest"){
						welcomeText = welcomeText.substring(8,welcomeText.indexOf("<"));
						logName = JSON.parse(localStorage.getItem(welcomeText));

						for (i = 0; i<logName.events.length;i++){
							if (logName.events[i].id == calEvent._id) {
								logName.events.splice(i,1);
							}
						}
						
						var jsonDeleteEvent = JSON.stringify(logName);
						localStorage.setItem(welcomeText,jsonDeleteEvent);
					}	
			  }
    },
			
		});//end of full Calendar Object
//initializes welcome text to see if a user is logged in. If they are, then
//add all events to calendar from localStorage.	
var welcomeText = $("#welcome").html()
	if (welcomeText != "Hello Guest"){
		welcomeText = welcomeText.substring(8,welcomeText.indexOf("<"))
		logName = JSON.parse(localStorage.getItem(welcomeText));
				
		for (item in logName.events){		
		$('#calendar').fullCalendar('renderEvent',logName.events[item],true);
		}
	}
		
	};//end of init function
	
//special signIn function used in case user decides to log-in from dailylog.html.
//adds events to calendar. Without this function, if the user logged in while on dailylog.html
// the events would not add until they refreshed the page.
function signInModalDaily(){
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
	var welcomeText = $("#welcome").html()
				if (welcomeText != "Hello Guest"){
				welcomeText = welcomeText.substring(8,welcomeText.indexOf("<"));
				logName = JSON.parse(localStorage.getItem(welcomeText));

				for (item in logName.events){
					
					$('#calendar').fullCalendar('renderEvent',logName.events[item],true);
				}
				}
	}
	else{
	alert("Password is not correct, please re-enter password");
	}
}
return false
}


