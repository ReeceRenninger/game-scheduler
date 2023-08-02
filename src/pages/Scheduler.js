import React, { useState, useEffect } from "react"; //
import axios from "axios";

//mui components to make a "form"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';

const Scheduler = () => {
  // form data state to update on user input
  const [formData, setFormData] = useState({ username: '', comments: '' });
  // state to hold the events from the scheduler
  const [timeSlot, setTimeSlot] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //hitting the addslot route with the form data
      await axios.post('/api/addslot', formData);
      //resets form data to empty after submission occurs
      setFormData({ username: '', comments: '' });
      getSchedules(); //grabs updated schedule after submission of form
    } catch (error) {
      console.error('Failed to add timeslot:', error);
      alert('Failed to add timeslot, please try again');
    }
  }

  const getSchedules = async () => {
    try {
      const response = await axios.get('/api/schedule');
      setTimeSlot(response.data);
    } catch (error) {
      console.error('Failed to get schedule:', error);
    }
  }

  //!! run getSchedules on mount
  useEffect(() => {
    getSchedules();
  }, []);

  return (
    <>
      <h2>Schedule Game Time</h2>
      {/* had to add HTMl form for submit to work, DOES NOT WORK ON THE FormControl */}
      <form onSubmit={handleSubmit}>
      <FormControl >
        <FormLabel>Username</FormLabel>
        <TextField value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} type="text" variant='outlined' color='primary' />
        
        <FormLabel>Comments</FormLabel>
        <TextField value={formData.comments} onChange={(e) => setFormData({ ...formData, comments: e.target.value })} type="text" variant='outlined' color='primary' />
        {/* <TextField type="date" /> */}
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </FormControl>
      </form>
      <h2>Current Schedule</h2>
      <ul>
        {timeSlot.map((slot) => (
          <li key={slot.id}>
            <p>Username: {slot.username}</p>
            <p>Comments: {slot.comments}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Scheduler;
