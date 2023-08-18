import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup"; // Import yup
import { useFormik } from "formik"; // Import useFormik
import "../styles/AddStudentStyles.css"; // Import the external CSS file
import { MenuItem, Select } from "@mui/material";

function AddStudent() {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [courses, setCouses] = useState([]);
  const generatedId = Math.floor(Math.random() * 9000) + 1000;

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "https://sheetdb.io/api/v1/l5mcztj8wtyhg?sheet=courses"
      );
      setCouses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const validationSchema = yup.object().shape({
    studentname: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    telephone: yup.string().required("Telephone is required"),
    address: yup.string().required("Address is required"),
    assignedCourses: yup.string().required("Assigned course is required"),
  });

  const formik = useFormik({
    initialValues: {
      studentname: "",
      email: "",
      telephone: "",
      address: "",
      assignedCourses: "none",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const newStudent = {
        id: generatedId,
        ...values,
      };

      axios
        .post(
          "https://sheetdb.io/api/v1/l5mcztj8wtyhg?sheet=students",
          newStudent
        )
        .then((res) => {
          console.log(res);
          setSuccessModalOpen(true);
          formik.resetForm(); // Reset form after successful submission
        });
    },
  });

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
        name="studentname"
        value={formik.values.studentname}
        onChange={formik.handleChange}
        error={formik.touched.studentname && Boolean(formik.errors.studentname)}
        helperText={formik.touched.studentname && formik.errors.studentname}
      />
      <TextField
        className="input-field"
        label="Email"
        variant="outlined"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        className="input-field"
        label="Telephone"
        variant="outlined"
        name="telephone"
        value={formik.values.telephone}
        onChange={formik.handleChange}
        error={formik.touched.telephone && Boolean(formik.errors.telephone)}
        helperText={formik.touched.telephone && formik.errors.telephone}
      />
      <TextField
        className="input-field"
        label="Address"
        variant="outlined"
        name="address"
        value={formik.values.address}
        onChange={formik.handleChange}
        error={formik.touched.address && Boolean(formik.errors.address)}
        helperText={formik.touched.address && formik.errors.address}
      />
      <Select
        className="input-field"
        value={formik.values.assignedCourses}
        onChange={formik.handleChange}
        variant="outlined"
        name="assignedCourses"
      >
        <MenuItem value="none">None</MenuItem>
        {courses.map((course) => (
          <MenuItem key={course.id} value={course.courseName}>
            {course.courseName}
          </MenuItem>
        ))}
      </Select>
      <Button
        className="submit-button"
        variant="contained"
        color="primary"
        onClick={formik.handleSubmit}
      >
        Add Student
      </Button>
    </div>
  );
}

export default AddStudent;
