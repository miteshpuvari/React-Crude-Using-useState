import React, { useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";

function App() {
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [allData, setAllData] = useState([]);
  const [editToggle, setEdditToggle] = useState(false);
  const [editId, setEditId] = useState();

  const Submit = (e) => {
    e.preventDefault();
    setEdditToggle(editToggle === true && false);
    setName("");
    setLastName("");
    if (!editToggle) {
      const id = Math.random();
      const newData = { id: id, name: name, lastName: lastName };
      setAllData((current) => [...current, newData]);
    } else if (editToggle) {
      const newArray = allData.filter((data) => data.id !== editId);
      setAllData(() => [
        ...newArray,
        { id: editId, name: name, lastName: lastName },
      ]);
    }
  };

  const edit = (data) => {
    setEditId(data.id);
    setEdditToggle(true);
    setName(data.name);
    setLastName(data.lastName);
  };

  const Delete = (val) => {
    const newDat = allData.filter((data) => data.id !== val.id);
    setAllData(newDat);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box minHeight={100} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h3">React Crude</Typography>
      </Box>
      <form onSubmit={Submit}>
        <Grid container  spacing={2}>
          <Grid item sx={{ display: "flex", flexDirection: "row" }} xs={10}>
            <TextField
              sx={{ m: 1 }}
              id="name"
              label="First Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              sx={{ m: 1 }}
              id="lastName"
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button sx={{ m: 1 }} variant="contained" type="submit">
              {editToggle ? "Edit" : "Add"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box sx={{ mt: 5 }}>
        <Paper elevation={3}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">First Name</TableCell>
                  <TableCell align="left">Last Name</TableCell>
                  <TableCell align="left">Operation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allData.map((data, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {data.name}
                    </TableCell>
                    <TableCell align="left">{data.lastName}</TableCell>
                    <TableCell align="left">
                      <Box>
                        <Button
                          sx={{ m: 1 }}
                          variant="contained"
                          onClick={() => edit(data)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => Delete(data)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
