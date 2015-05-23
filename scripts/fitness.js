//allows user to select an exercise based on the category and display an embedded
//youTube video which the user can play.
//disregard errors in console as this is a chrome error with youTube videos. Does not harm site.

$(init)

//initialize values on page. Populate exercise list based on default selection.
function init() {
		$('#fitnessExercise').change(getCategory);
		$('#fitnessPlan').submit(getVideo);
		//anonymous function that runs on page load to fill up exercise select list.
		(function() {
		var typeOfExercise = $('#fitnessExercise').val();
		for (exercise in exercises){
		if (exercises[exercise].category == typeOfExercise){
		$("#exerciseType").append('<option>'+exercises[exercise].title+'</option>');
		}
		}
	})();
	
	};

//create Exercise object with title,category,youtube link, and youtubeEmbedLink
function Exercise(title,category,youtubeLink,youtubeEmbedLink) {
	this.title = title,
	this.category = category,
	this.youtubeLink = youtubeLink,
	this.youtubeEmbedLink = youtubeEmbedLink
}

//removes select options from exerciseType and then re-populates list after going through
//all the exercise objects and matching them to the appropriate category.
function getCategory(){
	$("#exerciseType").empty();
	var typeOfExercise = $('#fitnessExercise').val();
	for (exercise in exercises){
		if (exercises[exercise].category == typeOfExercise){
		$("#exerciseType").append('<option>'+exercises[exercise].title+'</option>');
		}
	}
}

//on submit click the appropriate iframe link is gotten from exercises.
//the workoutVideo div's children are emptied and then the new iframe is appened in div.
function getVideo(){
	var typeOfExercise = $('#exerciseType').val();
	var link = (exercises[typeOfExercise].youtubeEmbedLink);
	$('#workoutVideo').empty();
	$('#workoutVideo').append(link);
	return false;
}

//a preset number of exercises were created as objects to store, title, category, youtube Link, and the embed link.
var exercises = {
/* Body Weight */
"Burpee": new Exercise("Burpee","Body Weight",'https://www.youtube.com/watch?v=JZQA08SlJnM',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/JZQA08SlJnM" frameborder="0" allowfullscreen></iframe>'),

"Push Ups": new Exercise("Push Ups", "Body Weight", 'https://www.youtube.com/watch?v=Eh00_rniF8E',
'<iframe width="420" height="315" src="https://www.youtube.com/embed/Eh00_rniF8E" frameborder="0" allowfullscreen></iframe>'),

"Pull Ups & Chin-Ups": new Exercise("Pull Ups & Chin-Ups", "Body Weight",'https://www.youtube.com/watch?v=Z3UDvJjckhI',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/Z3UDvJjckhI" frameborder="0" allowfullscreen></iframe>'),

"Lunges": new Exercise("Lunges", "Body Weight",'https://www.youtube.com/watch?v=COKYKgQ8KR0',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/COKYKgQ8KR0" frameborder="0" allowfullscreen></iframe>'),

/* Core */

"Crunch": new Exercise("Crunch", "Core",'https://www.youtube.com/watch?v=Xyd_fa5zoEU',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/Xyd_fa5zoEU" frameborder="0" allowfullscreen></iframe>'),

"Sit-Up": new Exercise("Sit-Up", "Core", 'https://www.youtube.com/watch?v=1fbU_MkV7NE',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/1fbU_MkV7NE" frameborder="0" allowfullscreen></iframe>'),

"Bicycle": new Exercise("Bicycles", "Core", 'https://www.youtube.com/watch?v=9FGilxCbdz8',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/9FGilxCbdz8" frameborder="0" allowfullscreen></iframe>'),

"Superman": new Exercise("Superman","Core",'https://www.youtube.com/watch?v=cc6UVRS7PW4',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/cc6UVRS7PW4" frameborder="0" allowfullscreen></iframe>'),

"Banana": new Exercise("Banana", "Core",'https://www.youtube.com/watch?v=tJLH5wwkH9w',
'<iframe width="420" height="315" src="https://www.youtube.com/embed/tJLH5wwkH9w" frameborder="0" allowfullscreen></iframe>'),

/* Lower Body */
"Leg Raises": new Exercise("Leg Raises", "Lower Body",'https://www.youtube.com/watch?v=JB2oyawG9KI',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/JB2oyawG9KI" frameborder="0" allowfullscreen></iframe>'),

"Squats": new Exercise("Squats","Lower Body",'https://www.youtube.com/watch?v=nEQQle9-0NA',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/nEQQle9-0NA" frameborder="0" allowfullscreen></iframe>'),

"Leg Extension": new Exercise("Leg Extensions","Lower Body",'https://www.youtube.com/watch?v=YyvSfVjQeL0',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/YyvSfVjQeL0" frameborder="0" allowfullscreen></iframe>'),

"Leg Curls": new Exercise("Leg Curls", "Lower Body",'https://www.youtube.com/watch?v=ELOCsoDSmrg',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/ELOCsoDSmrg" frameborder="0" allowfullscreen></iframe>'),

"Calf Raises": new Exercise("Calf Raises", "Lower Body",'https://www.youtube.com/watch?v=-M4-G8p8fmc',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/-M4-G8p8fmc" frameborder="0" allowfullscreen></iframe>'),

"Dead Lift": new Exercise("Dead Lift", "Lower Body",'https://www.youtube.com/watch?v=u6UgD1H_AXw',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/u6UgD1H_AXw" frameborder="0" allowfullscreen></iframe>'),

/* Upper Body */
"Bench Press": new Exercise("Bench Press", "Upper Body",'https://www.youtube.com/watch?v=6JtP6ju0IMw',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/6JtP6ju0IMw" frameborder="0" allowfullscreen></iframe>'),

"Incline Bench Press": new Exercise("Incline Bench Press", "Upper Body", 'https://www.youtube.com/watch?v=BW6J7A07ve0',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/BW6J7A07ve0" frameborder="0" allowfullscreen></iframe>'),

"Decline Bench Press": new Exercise("Decline Bench Press", "Upper Body", 'https://www.youtube.com/watch?v=OR6WM5Z2Hqs',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/OR6WM5Z2Hqs" frameborder="0" allowfullscreen></iframe>'),

"Bicep Curls": new Exercise("Bicep Curls", "Upper Body", 'https://www.youtube.com/watch?v=uO_CNYidOw0',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/uO_CNYidOw0" frameborder="0" allowfullscreen></iframe>'),

"Tricep Extension": new Exercise("Tricep Extension", "Upper Body", 'https://www.youtube.com/watch?v=YbX7Wd8jQ-Q',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/YbX7Wd8jQ-Q" frameborder="0" allowfullscreen></iframe>'),

"Lat Pulldown": new Exercise("Lat Pulldown", "Upper Body", 'https://www.youtube.com/watch?v=IXmBylxu7Cw',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/IXmBylxu7Cw" frameborder="0" allowfullscreen></iframe>'),

/* Full Routines */
"Ten Minute - Back & Chest": new Exercise("Ten Minute - Back & Chest","Full Routine",'https://www.youtube.com/watch?v=_VSFeGef23E',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/_VSFeGef23E" frameborder="0" allowfullscreen></iframe>'),

"Ten Minute - Full Upper Body": new Exercise("Ten Minute - Full Upper Body", "Full Routine", 'https://www.youtube.com/watch?v=1L1v_IWBg6Y',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/1L1v_IWBg6Y" frameborder="0" allowfullscreen></iframe>'),

"BeachBody-Live": new Exercise("BeachBody-Live", "Full Routine", 'https://www.youtube.com/watch?v=xo_5ZmmAdJo',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/xo_5ZmmAdJo" frameborder="0" allowfullscreen></iframe>'),

"Les Miles Body Pump": new Exercise("Les Miles Body Pump","Full Routine", 'https://www.youtube.com/watch?v=VLWMnTaYw4A',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/VLWMnTaYw4A" frameborder="0" allowfullscreen></iframe>'),

"Les Miles Body Combat": new Exercise("Les Miles Body Combat","Full Routine",'https://www.youtube.com/watch?v=O6xrilXULFo',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/O6xrilXULFo" frameborder="0" allowfullscreen></iframe>'),

"Les Miles Core Attach": new Exercise("Les Miles Core Attach","Full Routine", 'https://www.youtube.com/watch?v=g5-QdAmuabA',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/g5-QdAmuabA" frameborder="0" allowfullscreen></iframe>'),

"Full Core Workout": new Exercise("Full Core Workout","Full Routine", 'https://www.youtube.com/watch?v=k7IVC2Eqr_k',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/k7IVC2Eqr_k" frameborder="0" allowfullscreen></iframe>'),

/* Yoga */
"Yoga Advanced": new Exercise("Yoga Advanced", "Yoga",'https://www.youtube.com/watch?v=q5nyrD4eM64',
'<iframe width="420" height="315" src="https://www.youtube.com/embed/q5nyrD4eM64" frameborder="0" allowfullscreen></iframe>'),

"Yoga Beginners": new Exercise("Yoga Beginners", "Yoga",'https://www.youtube.com/watch?v=0o0kNeOyH98',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/0o0kNeOyH98" frameborder="0" allowfullscreen></iframe>'),

/* Stretching */
"Stretching Full": new Exercise("Stretching Full", "Stretching", 'https://www.youtube.com/watch?v=1fztE4mK7C0',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/1fztE4mK7C0" frameborder="0" allowfullscreen></iframe>'),

"Lower Body Stretching": new Exercise("Lower Body Stretching", "Stretching",'https://www.youtube.com/watch?v=iN3sHkni1gI',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/iN3sHkni1gI" frameborder="0" allowfullscreen></iframe>'),

"Hamstring Stretch": new Exercise("Hamstring Stretch", "Stretching",'https://www.youtube.com/watch?v=FDwpEdxZ4H4',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/FDwpEdxZ4H4" frameborder="0" allowfullscreen></iframe>'),

"Back Stretch": new Exercise("Back Stretch", "Stretching", 'https://www.youtube.com/watch?v=CO3racIlTcg',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/CO3racIlTcg" frameborder="0" allowfullscreen></iframe>'),

"IT Band Stretch": new Exercise("IT Band Stretch", "Stretching", 'https://www.youtube.com/watch?v=T5CYbfByXPo',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/T5CYbfByXPo" frameborder="0" allowfullscreen></iframe>')
}

