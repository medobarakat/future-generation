import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup"; // Import yup
import { useFormik } from "formik"; // Import useFormik
import "../styles/AddCourseStyles.css"; // Import the external CSS file

function AddCourse() {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const generatedId = Math.floor(Math.random() * 9000) + 1000;

  const validationSchema = yup.object().shape({
    courseName: yup.string().required("Course name is required"),
    startDate: yup.string().required("Start date is required"),
    endDate: yup.string().required("End date is required"),
    cost: yup.number().required("Cost is required").positive("Cost must be positive"),
    capacity: yup.number().required("Capacity is required").positive("Capacity must be positive"),
    status: yup.string().required("Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      courseName: "",
      startDate: "",
      endDate: "",
      cost: "",
      capacity: "",
      status: "Not Started",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const newCourse = {
        id: generatedId,
        ...values,
      };

      axios
        .post("https://sheetdb.io/api/v1/l5mcztj8wtyhg?sheet=courses", newCourse)
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
        name="courseName"
        value={formik.values.courseName}
        onChange={formik.handleChange}
        error={formik.touched.courseName && Boolean(formik.errors.courseName)}
        helperText={formik.touched.courseName && formik.errors.courseName}
      />
      <TextField
        className="input-field"
        label="Start Date"
        type="date"
        variant="outlined"
        name="startDate"
        value={formik.values.startDate}
        onChange={formik.handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        error={formik.touched.startDate && Boolean(formik.errors.startDate)}
        helperText={formik.touched.startDate && formik.errors.startDate}
      />
      <TextField
        className="input-field"
        label="End Date"
        type="date"
        variant="outlined"
        name="endDate"
        value={formik.values.endDate}
        onChange={formik.handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        error={formik.touched.endDate && Boolean(formik.errors.endDate)}
        helperText={formik.touched.endDate && formik.errors.endDate}
      />
      <TextField
        className="input-field"
        label="Cost"
        type="number"
        variant="outlined"
        name="cost"
        value={formik.values.cost}
        onChange={formik.handleChange}
        error={formik.touched.cost && Boolean(formik.errors.cost)}
        helperText={formik.touched.cost && formik.errors.cost}
      />
      <TextField
        className="input-field"
        label="Capacity"
        type="number"
        variant="outlined"
        name="capacity"
        value={formik.values.capacity}
        onChange={formik.handleChange}
        error={formik.touched.capacity && Boolean(formik.errors.capacity)}
        helperText={formik.touched.capacity && formik.errors.capacity}
      />
      <Select
        className="input-field"
        value={formik.values.status}
        onChange={formik.handleChange}
        variant="outlined"
        name="status"
      >
        <MenuItem value="Not Started">Not Started</MenuItem>
        <MenuItem value="Started">Started</MenuItem>
        <MenuItem value="Canceled">Canceled</MenuItem>
      </Select>
      <Button
        className="submit-button"
        variant="contained"
        color="primary"
        onClick={formik.handleSubmit}
      >
        Add Course
      </Button>
    </div>
  );
}

export default AddCourse;
