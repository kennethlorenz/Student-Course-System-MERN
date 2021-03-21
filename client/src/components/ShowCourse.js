import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Spinner from "react-bootstrap/Spinner";
import Button from "@material-ui/core/Button";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function ShowCourse(props) {
  const classes = useStyles();

  console.log("props.match.params", props.match.params.id);
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses/" + props.match.params.id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log("results from courses", result.data);

      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editCourse = (id) => {
    props.history.push({
      pathname: "/editcourse/" + id,
    });
  };

  const dropCourse = (id) => {
    setShowLoading(true);
    const course = {
      courseCode: data.courseCode,
      courseName: data.courseName,
      semester: data.semester,
      section: data.section,
    };
    //
    axios
      .delete(apiUrl, course)
      .then((result) => {
        setShowLoading(false);
        props.history.push("/courses");
      })
      .catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <div class="row justify-content-center">
        <div class="col-auto">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Course Code</StyledTableCell>
                  <StyledTableCell>Course Name</StyledTableCell>
                  <StyledTableCell>Section</StyledTableCell>
                  <StyledTableCell>Semester</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {data.courseCode}
                  </StyledTableCell>
                  <StyledTableCell>{data.courseName}</StyledTableCell>
                  <StyledTableCell>{data.section}</StyledTableCell>
                  <StyledTableCell>{data.semester}</StyledTableCell>
                  <StyledTableCell>
                    <div className={classes.root}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          editCourse(data._id);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          dropCourse(data._id);
                        }}
                      >
                        Drop
                      </Button>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ShowCourse);
