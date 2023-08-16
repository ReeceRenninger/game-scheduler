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

const Scheduler = ({ googleEvents, handleGoogleEvents, isSignedIn }) => {
  // event clicked state
  const [clickedEventId, setClickedEventId] = useState(null);
  // show modal state for user form
  const [showModal, setShowModal] = useState(false);
  // form data state to update on user input
  const [formData, setFormData] = useState({ username: '', comments: '' });
  // state to hold the guests to add to events
  // state to hold events from DB
  const [dbEvents, setDbEvents] = useState([]);

  //** MODAL HANDLERS */
  const handleClose = () => setShowModal(false);

  //** ADD USER HANDLER */
  const handleOpen = (eventId) => {
    setClickedEventId(eventId);
    console.log(clickedEventId)
    setShowModal(true);
  };

  const getEvents = async () => {
    try {
      const response = await axios.get(`${URL}/api/events`);
      setDbEvents(response.data)
    } catch (error) {
      console.error('Failed to get events:', error);
    }
  }

  //** ADD GUEST TO AN EVENT */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //hitting the addslot route with the form data
      await axios.put(`${URL}/api/join-event/${clickedEventId}`, formData);
      //resets form data to empty after submission occurs
      setFormData({ username: '', comments: '' });
      getEvents(); //grabs updated schedule after submission of form
      handleClose()
    } catch (error) {
      console.error('Failed to add user to event:', error);
      alert('Failed to add user to event, please try again');
    }
  }


  const addGoogleSchedule = () => {
    googleEvents.map(async (event) => {
      if (event.start.dateTime) {
        const dateString = event.start.dateTime;
        const indexOfT = dateString.indexOf('T');
        const dateWithoutTime = dateString.substring(0, indexOfT);
        const emailString = event.creator.email;
        const indexOfAt = emailString.indexOf('@');
        const emailSansAt = emailString.substring(0, indexOfAt)
        let descriptionSansDash;
        if (event.description) {
          const descriptionString = event.description;
          const indexOfDash = descriptionString.indexOf('-');
          descriptionSansDash = descriptionString.substring(0, indexOfDash)
        }
        let payload = {
          "_id": event.id,
          "title": event.summary,
          "host": emailSansAt,
          "day": dateWithoutTime,
          "startTime": event.start.dateTime,
          "endTime": event.end.dateTime,
          "description": descriptionSansDash,
        };
        console.log(payload)
        try {
          await axios.post(`${URL}/api/create-event`, payload);
          const response = await axios.get(`${URL}/api/events`);
          setDbEvents(response.data)
        } catch (error) {
          console.error('Failed to get schedule:', error);
        }

      }
    })
  }

  // run getEvents on mount
  useEffect(() => {
    getEvents();
  }, [isSignedIn]);


  // TODO: This useEffect would automatically pull your calendar into our DB BUT we still have a bug with the sign in so its not quite perfect
  useEffect(() => {
    if (isSignedIn) {
      // Fetch and set the upcoming events from Google Calendar
      handleGoogleEvents();
    }
    // eslint-disable-next-line
  }, [isSignedIn]);

  return (
    <>
      <h2>Schedule Game Time</h2>
      <Modal
        open={showModal}
        onClose={handleClose}
      >
        <ModalContent
          event={dbEvents.find(event => event._id === clickedEventId)}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </Modal>
      {/* THIS IS JUST FOR TESTING WILL BE REMOVED ONCE WE CAN GET THE GOOGLE CALENDAR EVENTS TO BE ADJUSTABLE BY USERS */}
      <h2>Current Schedule</h2>

      <Button variant='contained' onClick={addGoogleSchedule}>add google schedule to db</Button>
      <Grid container spacing={2} m={2} >
        {dbEvents.map((event) =>
          <>
            <Grid item xs={4} >
              <Card variant='outlined' sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={`https://source.unsplash.com/random/?${event.title}`}
                  title={event.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {event.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {event.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.startTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.endTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event._id}
                  </Typography>
                  <ul>
                    {/* eslint-disable-next-line array-callback-return */}
                    {
                      event.participants.map((participant) => {
                        return (
                          <>
                            <li key={participant._id}>
                              <p>{participant.username}</p>
                              <p>{participant.comments}</p>
                            </li>
                          </>
                        )
                      })
                    }
                  </ul>

                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleOpen(event._id)}>Join</Button>
                </CardActions>
              </Card>
            </Grid>
          </>)}
      </Grid>
    </>
  );
};

export default Scheduler;