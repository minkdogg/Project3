//Form 1 - Calorie Counter - returns the number of calories needed to obtain a weight goal.
//also returns a persons RMR (resting metabolic rate). Formula is based off the Revised Harris-Benedict equation (
//Men = 88.362 + (Body Weight(in kilograms) * 13.397) + (4.799 * Height(in cm)) - (Age(in years)*5.677)
//Women = 655.0955 + (Body Weight(in kilograms) * 9.463) + (1.8496 * Height(in cm)) - (Age(in years)*4.6756)
//Form 2 - Fitness Calorie Counter - returns the number of calories burned during a given exercise.
//Values obtained from deriving calories burned per pound based on exercise from this site:
//http://www.bodybuilding.com/fun/calories.htm

$(init)

//multi-dimensional array linking pace to calorie burned ratio. Used to multiply by time and weight.
//ratio is per minute per pound and specific to activity.
var runningConstant = [[5.5,8.57],[6,7.62],[6.5,7.14],[7,6.66],[7.5,6.43],[8,5.96],[8.5,5.47],[9,5.24],[10,4.76],[11.5,4.29],[12,3.81]];
var swimmingConstant = [["freestyle",3.33],["backstroke",3.33],["breaststroke",4.76],["butterfly",5.24]];
var bikingConstant = [["Greater than 20mph",7.62],["16-19.9mph",5.72],["14-15.9mph",4.76],["12-13.9mph",3.81],["10-11.9mph",2.86],["Less than 10mph",1.90]];
var strengthConstant = [["heavy",2.86],["light",1.43]];
var walkingConstant = [[2,1.19],[2.5,1.43],[3,1.57],[3.5,1.86],[4,2.38],[4.5,3],[5,3.81]];

//initializes page to show proper select div for pace. Default div is running.
function init() {
		$('#running').show();
		$('#walking').hide();
		$('#swimming').hide();
		$('#biking').hide();
		$('#strength').hide();
		$('#calorieCounter').submit(calculateCalories);
		$('#fitnessType').change(getPace);
		$('#calorieFitness').submit(calculateFitness);
	};

//uses switch statement to determine the proper pace div to display based on exercise selected.
//updates on change of activity.
function getPace() {
	var fitness = $('#fitnessType').val();
	switch(fitness){
		case "Walking":
		$('#walking').show();
		$('#running').hide();
		$('#swimming').hide();
		$('#biking').hide();
		$('#strength').hide();
		break;
		case "Swimming":
		$('#walking').hide();
		$('#running').hide();
		$('#swimming').show();
		$('#biking').hide();
		$('#strength').hide();
		break;
		case "Biking":
		$('#walking').hide();
		$('#running').hide();
		$('#swimming').hide();
		$('#biking').show();
		$('#strength').hide();
		break;
		case "Strength Training":
		$('#walking').hide();
		$('#running').hide();
		$('#swimming').hide();
		$('#biking').hide();
		$('#strength').show();
		break;
	default:
		$('#running').show();
		$('#walking').hide();
		$('#swimming').hide();
		$('#biking').hide();
		$('#strength').hide();	
	}
}	
	
//function calculates calories needed for weight goal and RMR rate based on user inputs.
//Current Weight, goal weight, age, height, gender, and time are all required.
//form validation used through html5. min value is 0. All values are numbers.
//output values are disabled so user can't change.
function calculateCalories(){

	weightCal = $('#currentWeight').val();
	heightCal = $('#currentHeight').val();
	genderRadio = $("input:radio[name=genderCalorie]:checked");
	genderCal = genderRadio.val();
	ageCal = $('#ageCounter').val();
	fitnessCal = $('#fitnessCalories').val();
	goalCal = $('#goalWeight').val();
	timeCal = $('#timeFrame').val();
	var caloriesNeeded = 0;
	if (genderCal == "male"){
		console.log("Male")
		caloriesRMR = 66.473 + 13.751*.4536*weightCal + 5.0033*2.54*heightCal - 6.755*ageCal;
	}
	else {
		console.log("Female")
		caloriesRMR = 655.0955 + 9.463*.4536*weightCal + 1.8456*2.54*heightCal - 4.6756*ageCal;
		}

		caloriesNeededDay = ((caloriesRMR*1.35)+parseFloat(fitnessCal));
		console.log(caloriesNeededDay);
		
		//3750 is used to for the number of calories in one pound. This number is debated among scientists at this point.
		totalCaloriesLBS = (weightCal - goalCal)*3750;


		totalCaloriesLBSDay = totalCaloriesLBS/(timeCal*7);
		console.log(totalCaloriesLBSDay);
		
		
		if (weightCal-goalCal < 0){
			finalOutputCalories = caloriesNeededDay - totalCaloriesLBSDay;
			console.log(finalOutputCalories);
			finalOutputCalories = finalOutputCalories.toFixed(2);
		}
		else{
			finalOutputCalories = (caloriesNeededDay - totalCaloriesLBSDay);
			finalOutputCalories = finalOutputCalories.toFixed(2);
		}
		
		$('#caloriesOutput').val(finalOutputCalories);
		$('#caloriesRMR').val(caloriesRMR.toFixed(2));
		return false
	}

//based on fitness activity, pace, weight, and time, the number of calories burned are returned.
//switch statement used to access proper array on top based on activity selected.
//weight, time, activity, and pace are required values.
//output is disabled so user can't change value.
function calculateFitness() {
	var fitness = $('#fitnessType').val();
	var time = $('#timeFitness').val();
	var weight = $('#weightFitness').val();
	var calories = 0;
	var rate;
	switch(fitness){
		case "Walking":
		var pace = $('#fitnessPaceWalking').val();
		for (var count = 0; count < walkingConstant.length; count++){
			if (pace == walkingConstant[count][0]){
				rate = walkingConstant[count][1];
			}
		}
		break;
		case "Swimming":
		var pace = $('#fitnessPaceSwimming').val();
		for (var count = 0; count < swimmingConstant.length; count++){
			if (pace == swimmingConstant[count][0]){
				rate = swimmingConstant[count][1];
			}
		}
		break;
		case "Biking":
		var pace = $('#fitnessPaceBiking').val();
		for (var count = 0; count < bikingConstant.length; count++){
			if (pace == bikingConstant[count][0]){
				rate = bikingConstant[count][1];
			}
		}
		break;
		case "Strength Training":
		var pace = $('#fitnessPaceStrength').val();
		for (var count = 0; count < strengthConstant.length; count++){
			if (pace == strengthConstant[count][0]){
				rate = strengthConstant[count][1];
			}
		}
		break;
	default:
		var pace = $('#fitnessPace').val();
		for (var count = 0; count < runningConstant.length; count++){
			if (pace == runningConstant[count][0]){
				rate = runningConstant[count][1];
			}
		}
	}
	calories = ((rate*weight*time)/60).toFixed(0);
	$('#caloriesBurned').val(calories);
return false;	
}
	
	
	