import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddCourse from './pages/AddCourse';
import AddStudent from './pages/AddStudent';
import StudentList from "./pages/StudentList";
import CourseList from "./pages/CourseList";
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
      <Navbar />
    <div className="App">
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/student-list" element={<StudentList />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
