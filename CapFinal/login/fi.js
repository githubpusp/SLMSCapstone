document.addEventListener('DOMContentLoaded', fetchStudents);  
// Fetch and display all students  
function fetchStudents() {  
    fetch('https://15f936q80d.execute-api.ap-northeast-2.amazonaws.com/stage1/student')
 
        .then(response => response.json())  
        .then(data => {  
            const studentsList = document.getElementById('studentsList');  
            studentsList.innerHTML = '';  
            data.students.forEach(student => {  
                const listItem = document.createElement('li');  
                listItem.textContent = `${student.name} - Reg: ${student.student_reg}, Email: ${student.email || 'N/A'}`;  
                studentsList.appendChild(listItem);  
            });  
        })  
        .catch(error => console.error('Error fetching students:', error));  
}  
// Add or update a student based on form input  
function addOrUpdateStudent() {  
    const studentReg = document.getElementById('studentReg').value;  
    const studentName = document.getElementById('studentName').value;  
    const studentEmail = document.getElementById('studentEmail').value;  
    // Construct and send a POST request to add a new student  
    const studentData = { name: studentName, student_reg: studentReg, email: studentEmail };  
    fetch('https://15f936q80d.execute-api.ap-northeast-2.amazonaws.com/stage1/student'
, {  
        method: 'POST',  
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify(studentData)  
    })  
    .then(handleResponse,function(){
        alert("Added Student Successfully!!");
    })  
    .catch(error => console.error('Error adding student:', error));  
}  
// Fetch and display a single student based on the registration number  
function getStudent() {  
    const studentReg = document.getElementById('studentReg').value;  
    fetch('https://15f936q80d.execute-api.ap-northeast-2.amazonaws.com/stage1/student?student_reg=${studentReg}')
 
        .then(response => response.json())  
        .then(student => {  
            const studentsList = document.getElementById('studentsList');  
            studentsList.innerHTML = ''; // Clear the list to show only the fetched student  
            const listItem = document.createElement('li');  
            listItem.textContent = `${student.name} - Reg: ${student.student_reg}, Email: ${student.email || 'N/A'}`;  
            studentsList.appendChild(listItem);  
        })  
        .catch(error => console.error('Error fetching student:', error));  
}  
// Send a DELETE request to remove a student based on the registration number  
function deleteStudent() {  
    const studentReg = document.getElementById('studentReg').value;  
    fetch('https//15f936q80d.execute-api.ap-northeast-2.amazonaws.com/stage1/student'
, {  
        method: 'DELETE',  
        headers: {'Content-Type': 'application/json'},  
        body: JSON.stringify({ student_reg: studentReg })  
    })  
    .then(() => fetchStudents())  
    .catch(error => console.error('Error:', error));  
}  
// Handle the response, refresh the student list, and clear the form  
function handleResponse(response) {  
    if (!response.ok) throw new Error('Network response was not ok');  
    fetchStudents(); // Refresh the student list after any operation  
    clearForm(); // Clear the form fields  
}  
function redirectToS3() {  
    window.open("https://coursestodisplay.s3.ap-northeast-2.amazonaws.com/Responsive+Card+Slider/indexfor.html"
, "_blank");  
}  
// Clear the form fields  
function clearForm() {  
    document.getElementById('studentForm').reset();  
}