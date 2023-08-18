import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/StudentListStyles.css"; // Import your external CSS file

function StudentList() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [oldSelectedStudent, setOldSelectedStudent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "https://sheetdb.io/api/v1/l5mcztj8wtyhg?sheet=students"
      ); // Replace with your API endpoint for fetching students
      setStudents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleEditStudent = (student) => {
    setOldSelectedStudent(student);
    setSelectedStudent(student);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedStudent(null);
    setIsDialogOpen(false);
  };

  const handleUpdateStudent = () => {
    console.log(selectedStudent);
    handleCloseDialog();
      // there is no update api that can change the data directly to the database !
    // so i can handle it if there was one
  };

  const handleRemoveStudent = () => {
    console.log(selectedStudent);
     // there is no update api that can change the data directly to the database !
    // so i can handle it if there was one
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <form className="editform">
              <TextField
                label="Student Name"
                variant="outlined"
                fullWidth
                value={selectedStudent.studentname}
                onChange={(e) =>
                  setSelectedStudent({
                    ...selectedStudent,
                    studentName: e.target.value,
                  })
                }
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={selectedStudent.email}
                onChange={(e) =>
                  setSelectedStudent({
                    ...selectedStudent,
                    email: e.target.value,
                  })
                }
              />
              <TextField
                label="Telephone"
                variant="outlined"
                fullWidth
                value={selectedStudent.telephone}
                onChange={(e) =>
                  setSelectedStudent({
                    ...selectedStudent,
                    telephone: e.target.value,
                  })
                }
              />
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                value={selectedStudent.address}
                onChange={(e) =>
                  setSelectedStudent({
                    ...selectedStudent,
                    address: e.target.value,
                  })
                }
              />
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateStudent} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <h2 style={{ textAlign: "center" }}>Student List</h2>
      <TableContainer component={Paper}>
        <Table sx={{ marginTop: "1rem" }}>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telephone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Assigned Courses</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.studentname}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.telephone}</TableCell>
                <TableCell>{student.address}</TableCell>
                <TableCell>{student.assignedCourses}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => handleEditStudent(student)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleRemoveStudent(student)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StudentList;
