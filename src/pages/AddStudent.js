import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../styles/AddStudentStyles.css"; // Import your external CSS file

function AddStudent() {
  const [studentname, setStudentname] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const generatedId = Math.floor(Math.random() * 9000) + 1000;

  const handleAddStudent = async () => {
    const newStudent = {
      id: generatedId,
      studentname,
      email,
      telephone,
      address,
    };

    axios
    .post("https://sheetdb.io/api/v1/l5mcztj8wtyhg?sheet=students", newCourse)
    .then((res) => {
      console.log(res);
      setSuccessModalOpen(true);

      
      setStudentname("");
      setEmail("");
      setTelephone("");
      setAddress("");
    });
  };


  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false); 
  };
  return (
    <div className="add-student-container">
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
