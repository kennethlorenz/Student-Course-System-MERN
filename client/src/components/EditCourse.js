import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Copyright from "./Copyright";
import Spinner from "react-bootstrap/Spinner";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function EditCourse(props) {
  const classes = useStyles();
  console.log("edituser props:", props.match.params);
  const [course, setCourse] = useState({
    _id: "",
    courseName: "",
    courseCode: "",
    section: "",
    semester: "",
  });
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses/" + props.match.params.id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setCourse(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateCourse = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      courseName: course.courseName,
      courseCode: course.courseCode,
      section: course.section,
      semester: course.semester,
    };
    axios
      .put(apiUrl, data)
      .then((result) => {
        console.log("after calling put to update", result.data);
        setShowLoading(false);
        props.history.push("/showcourse/" + result.data._id);
      })
      .catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = (e) => {
    e.persist();
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}{" "}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Course
          </Typography>
          <form className={classes.form} noValidate onSubmit={updateCourse}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="ccode"
                  name="courseCode"
                  variant="outlined"
                  required
                  fullWidth
                  id="courseCode"
                  label="Course Code"
                  autoFocus
                  value={course.courseCode}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="courseName"
                  label="Course Name"
                  name="courseName"
                  autoComplete="courseName"
                  value={course.courseName}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="section"
                  label="Section"
                  name="section"
                  autoComplete="section"
                  value={course.section}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  variant="outlined"
                  required
                  fullWidth
                  id="semester"
                  label="Semester"
                  name="semester"
                  autoComplete="semester"
                  value={course.semester}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update Course
            </Button>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

export default withRouter(EditCourse);
