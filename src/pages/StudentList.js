// src/components/StudentList.js
import React, { useEffect, useState } from 'react';
// import { getStudentListFromSheet } from '../utils/googleSheetsAPI';

function StudentList() {
  const [students, setStudents] = useState([]);

  // useEffect(() => {
  //   async function fetchStudents() {
  //     const fetchedStudents = await getStudentListFromSheet();
  //     setStudents(fetchedStudents);
  //   }
  //   fetchStudents();
  // }, []);

  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            <strong>{student.name}</strong>
            <p>Email: {student.email}</p>
            <p>Telephone: {student.telephone}</p>
            <p>Address: {student.address}</p>
            {/* Add more student details */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
