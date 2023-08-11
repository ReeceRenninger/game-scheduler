import React, { useState, useEffect } from "react"; //
import axios from "axios";

//mui components to make a "form"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Card, FormControl, FormLabel, Grid } from '@mui/material';

//mui components to make a "card"
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const URL = 'http://localhost:3001'

const Scheduler = ({ upcomingEvents, handleUpcomingEvents, isSignedIn }) => {
  // form data state to update on user input
  const [formData, setFormData] = useState({ username: '', comments: '' });
  // state to hold the events from the scheduler
  const [timeSlot, setTimeSlot] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //hitting the addslot route with the form data
      await axios.put('/api/join-event/:eventId', formData);
      //resets form data to empty after submission occurs
      setFormData({ username: '', comments: '' });
      getEvents(); //grabs updated schedule after submission of form
    } catch (error) {
      console.error('Failed to add user to event:', error);
      alert('Failed to add uyser to event, please try again');
    }
  }

  const getEvents = async () => {
    try {
      const response = await axios.get(`${URL}/api/events`);
      setTimeSlot(response.data);
    } catch (error) {
      console.error('Failed to get events:', error);
    }
  }

  const addGoogleSchedule = () => {
    upcomingEvents.map(async (event) => {
      if(event.start.dateTime){
        const dateString = event.start.dateTime;
        console.log('dateString: ', dateString);
        const indexOfT = dateString.indexOf('T');
        const dateWithoutTime = dateString.substring(0, indexOfT);
        const emailString = event.creator.email;
        const indexOfAt = emailString.indexOf('@');
        const emailSansAt = emailString.substring(0, indexOfAt)
        let payload = {
          "id": event.id,
          "title": event.summary,
          "host": emailSansAt,
          "day": dateWithoutTime,
          "startTime": event.start.dateTime,
          "endTime": event.end.dateTime,
          "description": event.description,
        };
        console.log(payload)
        try {
          await axios.post(`${URL}/api/create-event`, payload);
          const response = await axios.get(`${URL}/api/events`);
          setTimeSlot(response.data);
        } catch (error) {
          console.error('Failed to get schedule:', error);
        }

      }
    })
  }

  //!! run getEvents on mount
  useEffect(() => {
    getEvents();
  }, [isSignedIn]);

  //!! useEffect borked, not sure what to feed it for refreshes
  useEffect(() => {
    if (isSignedIn) {
      // Fetch and set the upcoming events from Google Calendar
      handleUpcomingEvents();
  
      // Once the events are updated, add them to your local state
      // addGoogleSchedule();
    }
  }, [isSignedIn]);

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
      {/* THIS IS JUST FOR TESTING WILL BE REMOVED ONCE WE CAN GET THE GOOGLE CALENDAR EVENTS TO BE ADJUSTABLE BY USERS */}
      <h2>Current Schedule</h2>
      <ul>
        {timeSlot.map((slot) => (
          <li key={slot.id}>
            <p>Username: {slot.username}</p>
            <p>Comments: {slot.comments}</p>
          </li>
        ))}
      </ul>
      {/* <Button variant='contained' color='error' onClick={handleUpcomingEvents}>upcoming events</Button> */}
      <Button variant='contained' onClick={addGoogleSchedule}>add google schedule</Button>
      <Grid container spacing={2} m={2} >
        {upcomingEvents.map((event) =>
          <>
            <Grid item xs={4} >
              <Card variant='outlined' sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={`https://source.unsplash.com/random/?${event.summary}`}
                  title={event.summary}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {event.summary}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.start.dateTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.end.dateTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.id}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Join</Button>
                </CardActions>
              </Card>
            </Grid>
          </>)}
      </Grid>
    </>
  );
};

export default Scheduler;