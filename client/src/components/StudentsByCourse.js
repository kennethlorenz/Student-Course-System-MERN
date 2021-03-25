import React, { useState, useEffect } from "react";
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
import SignIn from "./SignIn";

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function StudentsByCourse(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [listError, setListError] = useState(false);
  const apiUrl = "http://localhost:3000/api/studentsbycourse";
  const classes = useStyles();
  const courseCode = props.courseCode;

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(apiUrl, courseCode)
        .then((result) => {
          console.log("result.data:", result.data);
          //check if the student has logged in
          if (result.data.screen !== "auth") {
            console.log("data in if:", result.data);
            setData(result.data);
            setShowLoading(false);
          }
        })
        .catch((error) => {
          console.log("error in fetchData:", error);
          setListError(true);
        });
    };
    fetchData();
  }, []);

  return (
    <div>
      {data.length !== 0 ? (
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
                      <StyledTableCell>First Name</StyledTableCell>
                      <StyledTableCell>Last Name</StyledTableCell>
                      <StyledTableCell>Email</StyledTableCell>
                      <StyledTableCell>City</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((student, id) => (
                      <StyledTableRow key={id}>
                        <StyledTableCell component="th" scope="row">
                          {student.firstName}
                        </StyledTableCell>
                        <StyledTableCell>{student.lastName}</StyledTableCell>
                        <StyledTableCell>{student.email}</StyledTableCell>
                        <StyledTableCell>{student.city}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default StudentsByCourse;
