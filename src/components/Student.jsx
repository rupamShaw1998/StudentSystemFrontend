import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Container } from "@mui/system";

const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };

export default function Student() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      const res = await fetch("http://localhost:8080/student/getAll");
      const data = await res.json();
      setStudents(data);
    } 
    catch(err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postStudent();
  };

  const postStudent = async () => {
    const student = { name, address }
    const settings = {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(student)
    }
    try {
      const res = await fetch("http://localhost:8080/student/add", settings);
      const data = await res.json();
      console.log(data);
    }
    catch(err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <Paper style={paperStyle}>
        <h1 style={{ color: "blue" }}>Add Student</h1>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="off"
          style={{ marginTop: "50px" }}
        >
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            fullWidth
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button 
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Paper>

      <h1 style={{ color: "green" }}>Students</h1>
      <Paper elevation={3} style={paperStyle}>
        {students &&
          students.length &&
          students.map((student) => (
            <Paper
              elevation={6}
              style={{ margin: "10px", padding: "15px", textAlign: "left" }}
              key={student.id}
            >
              Id: {student.id}
              <br />
              Name: {student.name}
              <br />
              Address: {student.address}
            </Paper>
          ))}
      </Paper>
    </Container>
  );
}
