import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Grid, Paper } from "@mui/material";

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('id')
    axios.get(`http://localhost:3001/profile/${id}`)
      .then(response => {
        setUser(response.data[0]); 
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);
  return (
    <div className="flex-col justify-center items-center p-20">
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h4" gutterBottom align="center">
            PROFILE DETAILS
          </Typography>
          {user && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  <strong>Name:</strong> {user.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  <strong>Email:</strong> {user.email}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  <strong>City:</strong> {user.city}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  <strong>Slot Timing:</strong> {user.slot_timings}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  <strong>Centre Name:</strong> {user.centre_name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  <strong>Centre City:</strong> {user.booked_city}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  <strong>Booked Date:</strong> {user.booked_date}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Paper>
      </Container>
      <div className="pt-20 flex justify-center">

      <a href="/centres" className="mr-4 px-6 py-3 bg-black text-white text-black font-semibold rounded-md">GO TO CENTRES</a>
      </div>
      
    </div>
  );
}

export default ProfilePage;
