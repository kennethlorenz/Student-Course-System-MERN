import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "./Copyright";
import { withRouter } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

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

function SignUp() {
  const classes = useStyles();
  const [student, setStudent] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    studentNumber: "",
    password: "",
    address: "",
    city: "",
    phoneNumber: "",
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/";

  const saveStudent = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      studentNumber: student.studentNumber,
      password: student.password,
      address: student.address,
      city: student.city,
      phoneNumber: student.phoneNumber,
    };
    axios
      .post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push("/show/" + result.data._id);
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={saveStudent}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={student.firstName}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lastName"
                  value={student.lastName}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  variant="outlined"
                  required
                  fullWidth
                  id="studentNumber"
                  label="Student Number"
                  name="studentNumber"
                  autoComplete="studentNumber"
                  value={student.studentNumber}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={student.email}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  value={student.address}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
                  value={student.city}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  variant="outlined"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  value={student.phoneNumber}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={student.password}
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
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

export default withRouter(SignUp);
