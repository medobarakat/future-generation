import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Dialog from "@mui/material/Dialog"; // Import Dialog component
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "../styles/AddStudentStyles.css"; // Import your external CSS file
import { MenuItem, Select } from "@mui/material";

function AddStudent() {
  const [studentname, setStudentname] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [assignedCourses, setAssignedCourses] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [courses, setCouses] = useState();
  const generatedId = Math.floor(Math.random() * 9000) + 1000;

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    axios
      .get("https://sheetdb.io/api/v1/l5mcztj8wtyhg?sheet=courses")
      .then((res) => {
        console.log(res.data);
        setCouses(res.data)
      });
  };

  const handleAddStudent = async () => {
    const newStudent = {
      id: generatedId,
      studentname,
      email,
      telephone,
      address,
      assignedCourses,
    };

    axios
      .post(
        "https://sheetdb.io/api/v1/l5mcztj8wtyhg?sheet=students",
        newStudent
      )
      .then((res) => {
        console.log(res);
        setSuccessModalOpen(true);
        setStudentname("");
        setEmail("");
        setTelephone("");
        setAddress("");
        setAssignedCourses("");
      });
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
  };
  return (
    <div className="add-student-container">
      <Dialog
        open={successModalOpen}
        onClose={handleCloseSuccessModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Student Added Successfully
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The Student has been added to the database successfully.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <h2>Add Student</h2>
      <TextField
        className="input-field"
        label="Name"
        variant="outlined"
        value={studentname}
        onChange={(e) => setStudentname(e.target.value)}
      />
      <TextField
        className="input-field"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        className="input-field"
        label="Telephone"
        variant="outlined"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
      />
      <TextField
        className="input-field"
        label="Address"
        variant="outlined"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Select
        className="input-field"
        value={assignedCourses}
        onChange={(e) => setAssignedCourses(e.target.value)}
        variant="outlined"
      >
        <MenuItem value="none">none</MenuItem>
        {
          courses?.map((course)=>(

            <MenuItem key={course.id} value={course.courseName}>{course.courseName}</MenuItem>
          ))
        }
      </Select>
      <Button
        className="submit-button"
        variant="contained"
        color="primary"
        onClick={handleAddStudent}
      >
        Add Student
      </Button>
    </div>
  );
}

export default AddStudent;
