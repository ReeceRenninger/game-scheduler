import React, { useState, useEffect } from "react"; 
import axios from "axios";
import ModalContent from "../components/ModalContent";
import Button from '@mui/material/Button';
import { Card, Grid } from '@mui/material';

//mui components to make a "card"
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const URL = 'http://localhost:3001'

const Scheduler = ({ upcomingEvents, handleUpcomingEvents, isSignedIn }) => {
  // event clicked state
  const [clickedEventId, setClickedEventId] = useState(null);
  // show modal state for user form
  const [showModal, setShowModal] = useState(false);
  // form data state to update on user input
  const [formData, setFormData] = useState({ username: '', comments: '' });
  // state to hold the guests to add to events
  const [participants, setParticipants] = useState([]);

//** MODAL HANDLERS */
const handleClose = () => setShowModal(false);

//** ADD USER HANDLER */
const handleOpen = (eventId) => {
  setClickedEventId(eventId);
  setShowModal(true);
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //hitting the addslot route with the form data
      await axios.put(`${URL}/api/join-event/:eventId`, formData);
      //resets form data to empty after submission occurs
      setFormData({ username: '', comments: '' });
      getEvents(); //grabs updated schedule after submission of form
    } catch (error) {
      console.error('Failed to add user to event:', error);
      alert('Failed to add user to event, please try again');
    }
  }

  const getEvents = async () => {
    try {
      const response = await axios.get(`${URL}/api/events`);
      setParticipants(response.data);
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
          setParticipants(response.data);
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

  useEffect(() => {
    if (isSignedIn) {
      // Fetch and set the upcoming events from Google Calendar
      handleUpcomingEvents();
    }
     // eslint-disable-next-line
  }, [isSignedIn]);

  return (
    <>
      <h2>Schedule Game Time</h2>
      {/* had to add HTMl form for submit to work, DOES NOT WORK ON THE FormControl */}
      <Modal
      open={showModal}
      onClose={handleClose}
      >
        
      <form>
        <ModalContent
        event={upcomingEvents.find(event => event.id === clickedEventId)}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
      </form>
     
      </Modal>
      {/* THIS IS JUST FOR TESTING WILL BE REMOVED ONCE WE CAN GET THE GOOGLE CALENDAR EVENTS TO BE ADJUSTABLE BY USERS */}
      <h2>Current Schedule</h2>
 
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
                  
                  <ul>
                    {participants.map((participant) => {
                      if (participant.eventId === event.id) {
                        return (
                          <>
                          <li key={participant.id}>{participant.username}</li>
                          <li key={participant.id}>{participant.comments}</li>
                          </>
                        )
                      }
                    })}
                  </ul>
                 
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleOpen(event.id)}>Join</Button>
                </CardActions>
              </Card>
            </Grid>
          </>)}
      </Grid>
    </>
  );
};

export default Scheduler;