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

function CreateCourse(props) {
  const classes = useStyles();
  const email = props.screenEmail;
  console.log("props.screen", props.screenEmail);
  const [course, setCourse] = useState({
    courseCode: "",
    courseName: "",
    section: "",
    semester: "",
    email: "",
  });
  const [showLoading, setShowLoading] = useState(false);

  const apiUrl = "http://localhost:3000/api/courses";
  //
  const saveCourse = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      courseCode: course.courseCode,
      courseName: course.courseName,
      section: course.section,
      semester: course.semester,
      email: email,
    };
    //
    axios
      .post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        console.log("results from save course:", result.data);
        props.history.push("/courses");
      })
      .catch((error) => setShowLoading(false));
  };
  //
  const onChange = (e) => {
    e.persist();
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add a Course
        </Typography>
        <form className={classes.form} noValidate onSubmit={saveCourse}>
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
            Add Course
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(CreateCourse);
