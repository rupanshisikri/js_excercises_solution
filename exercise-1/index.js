'use strict'
const students = require('./students.json');
const tests = require('./tests.json');

//to get test given by student
var getStudentTests = function(studentID){
		return tests.filter((testObj) => {
			return testObj.student === studentID;
		});
	};
	
//exercise funtion to get worst test based on lowest score
var worstTest = function(){
		
	let worstTestObj = tests.reduce((aTest, bTest) => {
			return aTest.score < bTest.score ? aTest : bTest;
		});
	
	let worstTestStudentObj = students.find((studentObj) => {
		return studentObj.id === worstTestObj.student;
	});
	
	let worstTest = {student: worstTestStudentObj, 
					score: worstTestObj.score,
					date: (new Date(worstTestObj.date)).toGMTString()};
					
	return worstTest;
};

//exercise funtion to get names of rejected students with average score < 6
var rejectedStudents = function(){
	
	//function to calculate average score
	let averageScore = function(studentID){
		let studentTests = getStudentTests(studentID);
		let totalScore = 0;
		for ( let i = 0; i < studentTests.length; i++ ) {
			totalScore += studentTests[i].score;
		}
		return totalScore/studentTests.length;
	}
	
	//filter out rejected students name
	let rejectedStudents = students.filter((studentObj) => {return averageScore(studentObj.id) < 6})
								.map((rejStudent) => {return rejStudent.firstName + " " + rejStudent.lastName});
								
	return rejectedStudents;
};

//exercise funtion to get names of students absent on a test date 
var absences = function(){
	
	let absences = [];
	
	//get test dates from tests and remove duplicates	
	let testDates = tests.map(ele => ele.date)
							.filter((ele, index, self) => { 
									return index === self.indexOf(ele);
								});

	for ( let i = 0; i < students.length; i++ ) {
		
		let studentTests = getStudentTests(students[i].id);
		
		for (let j = 0; j < testDates.length; j++){
			
			if (!studentTests.find((element) => {return element.date === testDates[j]})){ 
			
				absences.push(
					{student: students[i].firstName + students[i].lastName , date: (new Date(testDates[j]).toGMTString())}
				);
			}
		}
	}
	
	return absences;
};

//exercise funtion to get best test of students with age > 16
var bestOfLastYear = function(){
	
	let bestTests = [];
	
	let getStudentAge = function(birthDateString){
		
		let today = new Date();
		let birthDate = new Date(birthDateString);
		let age = today.getFullYear() - birthDate.getFullYear();
		let m = today.getMonth() - birthDate.getMonth();
		
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
			age--;
		}
		return age;
	}
	
	//get students with age >16
	let elderStudents = students.filter((studentObj) => {
							return getStudentAge(studentObj.birthDate) > 16;
						});
		
	let getBestTest = function(studentID){
						return getStudentTests(studentID).reduce((aTest, bTest) => {
															return aTest.score > bTest.score ? aTest : bTest;
														});
					};	
	
	for ( let i = 0; i < elderStudents.length; i++ ) {		
		bestTests.push(
			{student: elderStudents[i].firstName + " " + elderStudents[i].lastName, test: getBestTest(elderStudents[i].id)}
		);
	}
	
	return bestTests;
};

	
console.log("Worst Test: ");
console.log(worstTest());

console.log("\n\nRejected Students: ");
console.log(rejectedStudents());

console.log("\n\nAbsences: ");	
absences().forEach(function(element){ console.log(element); });

console.log("\n\nBest tests of Last year:");
console.log(bestOfLastYear());


exports.worstTest = worstTest;
exports.rejectedStudents = rejectedStudents;
exports.absences = absences;
exports.bestOfLastYear = bestOfLastYear;