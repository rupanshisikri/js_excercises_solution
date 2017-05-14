const exercise = require('./index');
const students = require('./students.json');
const tests = require('./tests.json');

describe('exercise 1 worstTest', () => {
  it('should test worst test score', () => {
	  
	var worstScore = tests.reduce((a,b) =>{ return a.score < b.score ? a : b;}).score;
	
    expect(worstScore).toEqual(exercise.worstTest(students, tests).score);
  });
});

describe('exercise 1 worstTest', () => {
  it('should test- student attended the worst test', () => {
	  
	var worstTest = exercise.worstTest(students, tests);
	
	var test = tests.find((ele) => { 
					return (ele.student === worstTest.student.id) && ((new Date(ele.date)).toGMTString() === worstTest.date)
				});
	
    expect(test).toBeDefined();
  });
});

describe('exercise 1 rejectedStudents', () => {
  it('should test average score of a student in rejected students list to be less than 6', () => {
	  
	var rejectedStudents = exercise.rejectedStudents(students, tests);

	
	for (var i= 0; i < rejectedStudents.length; i++){
		
		var rejectedStudentName = rejectedStudents[i].split(" ");

		var rejectedStudent = students.find((ele)=>{
					return ele.firstName === rejectedStudentName[0] && ele.lastName === rejectedStudentName[1];
				});

		var studentTests = tests.filter((ele) => {
			return ele.student === rejectedStudent.id;
		});
		
		var averageScore = (studentTests.map(ele => ele.score)
									.reduce((a,b) => {return a+b}))/studentTests.length;
		
		
		expect(averageScore).toBeLessThan(6);
	}

  });
});

describe('exercise 1 absences', () => {
  it('should test presence instance not included in absences', () => {
	  
	var absences = exercise.absences(students, tests);
	
	for(var i= 0; i < tests.length; i++){
		
		var student = students.find((ele)=>{
						return ele.id === tests[i].student;
					});
		
		var presence = {student: student.firstName + student.lastName , 
						date: (new Date(tests[i].date)).toGMTString()
						};
		
		expect(absences).not.toContain(presence);
		
	}
	
  });
});

describe('exercise 1 bestOfLastYear', () => {
  it('should test score is best', () => {
	  
	var bestTests = exercise.bestOfLastYear(students, tests);
	
	for(var i= 0; i < bestTests.length; i++){
		
		var score = tests.find((ele) => {
			return ele.student === bestTests[i].test.student && ele.score > bestTests[i].test.score;
		});
		
		expect(score).toBeUndefined();
	}
	

  });
});



