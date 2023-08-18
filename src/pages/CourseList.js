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
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/CourseListStyles.css"; // Import your external CSS file

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const formatDate = (apiDate) => {
    const date = new Date(apiDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Convert "YYYY-MM-DD" date string to API format
  const formatToApiDate = (formattedDate) => {
    const [year, month, day] = formattedDate.split("-");
    return new Date(year, month - 1, day).toISOString();
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "https://sheetdb.io/api/v1/l5mcztj8wtyhg?sheet=courses"
      );
      setCourses(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedCourse(null);
    setIsDialogOpen(false);
  };

  const handleUpdateCourse = () => {
    // Implement the update logic here
    console.log("Updating course:", selectedCourse);
    handleCloseDialog();
  };

  const handleRemoveCourse = () => {};

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent>
          {selectedCourse && (
            <form className="editform">
              <TextField
                label="Course Name"
                variant="outlined"
                fullWidth
                value={selectedCourse.courseName}
                // onChange={(e) =>
                //   setSelectedCourse({
                //     ...selectedCourse,
                //     courseName: e.target.value,
                //   })
                // }
                disabled
              />
              <TextField
                label="Start Date"
                type="date"
                variant="outlined"
                fullWidth
                value={selectedCourse.startDate}
                // onChange={(e) =>
                //   setSelectedCourse({
                //     ...selectedCourse,
                //     startDate: e.target.value,
                //   })
                // }
                disabled
              />
              <TextField
                label="End Date"
                type="date"
                variant="outlined"
                fullWidth
                value={selectedCourse.endDate}
                // onChange={(e) =>
                //   setSelectedCourse({
                //     ...selectedCourse,
                //     endDate: e.target.value,
                //   })
                // }
                disabled
              />
              <TextField
                label="Cost"
                type="number"
                variant="outlined"
                fullWidth
                value={selectedCourse.cost}
                onChange={(e) =>
                  setSelectedCourse({
                    ...selectedCourse,
                    cost: e.target.value,
                  })
                }
              />
              <TextField
                label="Capacity"
                type="number"
                variant="outlined"
                fullWidth
                value={selectedCourse.capacity}
                onChange={(e) =>
                  setSelectedCourse({
                    ...selectedCourse,
                    capacity: e.target.value,
                  })
                }
              />
              <TextField
                select
                label="Status"
                variant="outlined"
                fullWidth
                value={selectedCourse.status}
                onChange={(e) =>
                  setSelectedCourse({
                    ...selectedCourse,
                    status: e.target.value,
                  })
                }
              >
                <MenuItem value="Not Started">Not Started</MenuItem>
                <MenuItem value="Started">Started</MenuItem>
                <MenuItem value="Canceled">Canceled</MenuItem>
              </TextField>
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateCourse} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <h2 style={{ textAlign: "center" }}>Course List</h2>
      <TableContainer component={Paper}>
        <Table sx={{ marginTop: "1rem" }}>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow key={index}>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>{course.startDate}</TableCell>
                <TableCell>{course.endDate}</TableCell>
                <TableCell>{course.cost}</TableCell>
                <TableCell>{course.capacity}</TableCell>
                <TableCell>{course.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => handleEditCourse(course)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleRemoveCourse(course)}
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

export default CourseList;
