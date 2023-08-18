import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Dialog from "@mui/material/Dialog"; // Import Dialog component
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "../styles/AddCourseStyles.css"; // Import the external CSS file

function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cost, setCost] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState("Not Started");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const generatedId = Math.floor(Math.random() * 9000) + 1000;

  const handleAddCourse = async () => {
    const newCourse = {
      id: generatedId,
      courseName,
      startDate,
      endDate,
      cost,
      capacity,
      status,
    };

    axios
      .post("https://sheetdb.io/api/v1/l5mcztj8wtyhg?sheet=courses", newCourse)
      .then((res) => {
        console.log(res);
        setSuccessModalOpen(true);
        setCourseName("")
        setStartDate("")
        setEndDate("")
        setCost("")
        setCapacity("")
        setStatus("")
      });
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false); 
  };

  return (
    <div className="add-course-container">
      <Dialog
        open={successModalOpen}
        onClose={handleCloseSuccessModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Course Added Successfully</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The course has been added to the database successfully.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <h2>Add Course</h2>
      <TextField
        className="input-field"
        label="Course Name"
        variant="outlined"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />
      <TextField
        className="input-field"
        label="Start Date"
        type="date"
        variant="outlined"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        className="input-field"
        label="End Date"
        type="date"
        variant="outlined"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        className="input-field"
        label="Cost"
        type="number"
        variant="outlined"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
      />
      <TextField
        className="input-field"
        label="Capacity"
        type="number"
        variant="outlined"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
      />
      <Select
        className="input-field"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        variant="outlined"
      >
        <MenuItem value="Not Started">Not Started</MenuItem>
        <MenuItem value="Started">Started</MenuItem>
        <MenuItem value="Canceled">Canceled</MenuItem>
      </Select>
      <Button
        className="submit-button"
        variant="contained"
        color="primary"
        onClick={handleAddCourse}
      >
        Add Course
      </Button>
    </div>
  );
}

export default AddCourse;
