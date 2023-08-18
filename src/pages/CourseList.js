// src/components/CourseList.js
import React, { useEffect, useState } from 'react';
// import { getCourseListFromSheet } from '../utils/googleSheetsAPI';

function CourseList() {
  const [courses, setCourses] = useState([]);

  // useEffect(() => {
  //   async function fetchCourses() {
  //     const fetchedCourses = await getCourseListFromSheet();
  //     setCourses(fetchedCourses);
  //   }
  //   fetchCourses();
  // }, []);

  return (
    <div>
      <h2>Course List</h2>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>
            <strong>{course.courseName}</strong>
            <p>Start Date: {course.startDate}</p>
            <p>End Date: {course.endDate}</p>
            <p>Cost: {course.cost}</p>
            <p>Capacity: {course.capacity}</p>
            <p>Status: {course.status}</p>
            {/* Add more course details */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
