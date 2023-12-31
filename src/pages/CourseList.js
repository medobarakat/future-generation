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
  const [oldSelectedCourse, setOldSelectedCourse] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
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
    setOldSelectedCourse(course);
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedCourse(null);
    setIsDialogOpen(false);
  };

  const handleUpdateCourse = () => {
    console.log(selectedCourse)
    console.log(oldSelectedCourse)
    // there is no update api that can change the data directly to the database !
    // so i can handle it if there was one
    handleCloseDialog();
  };

  const handleRemoveCourse = () => {
     // there is no update api that can change the data directly to the database !
    // so i can handle it if there was one
    console.log(selectedCourse)

  };

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
