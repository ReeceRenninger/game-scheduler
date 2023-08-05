import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FormControl, FormLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const localizer = momentLocalizer(moment);

const Scheduler = () => {
  const [userFormData, setUserFormData] = useState({ username: '', comments: '' });
  const [hostFormData, setHostFormData] = useState({ title: '', host: '', day: '', startTime: '', endTime: '', description: '', });
  const [timeSlot, setTimeSlot] = useState([]);
  const [showHostFormModal, setShowHostFormModal] = useState(false);
  const [showUserFormModal, setShowUserFormModal] = useState(false);
  const [events, setEvents] = useState([]);

  const handleHostFormModalOpen = () => setShowHostFormModal(true);
  const handleHostFormModalClose = () => setShowHostFormModal(false);

  const handleUserFormModalOpen = () => setShowUserFormModal(true);
  const handleUserFormModalClose = () => setShowUserFormModal(false);

  //join an event as a user
  const handleUserJoin = async (event) => {
    event.preventDefault();
    try {
      await axios.put('/api/join-event/:eventId', userFormData);
      setUserFormData({ username: '', comments: '' });
      getEvents(); //repopulates the event after submission
    } catch (error) {
      console.error('Failed to add user to event:', error);
      alert('Failed to add user to event, please try again');
    }
  }

  //create an event as a hot
  const handleHostCreate = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/create-event', hostFormData);
    } catch (error) {
      console.error('Failed to create event:', error);
      alert('Failed to create event, please try again');
    }
  }
  const getEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setTimeSlot(response.data);
      const events = response.data.map(event => ({
        id: event._id,
        title: event.username,
        host: event.host,
        startTime: event.startTime,
        endTime: event.endTime,
        description: event.description,
        //!! how do we grab the partcipants properly from the database by digging through the object?
      }));
      setEvents(events);
    } catch (error) {
      console.error('Failed to get events:', error);
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
    {/* need to create a modal to populate this form when user clicks event on calendar location and tie their information to the event via id */}
      <h2>Attend this event!</h2>

      <Button onClick={handleUserFormModalOpen}>Open User Join Modal</Button>
      <Modal
      open={showUserFormModal}
      onClose={handleUserFormModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
      <form onSubmit={handleUserJoin}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <TextField value={userFormData.username} onChange={(e) => setUserFormData({ ...userFormData, username: e.target.value })} type="text" variant='outlined' color='primary' />

          <FormLabel>Comments</FormLabel>
          <TextField value={userFormData.comments} onChange={(e) => setUserFormData({ ...userFormData, comments: e.target.value })} type="text" variant='outlined' color='primary' />
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </FormControl>
      </form>

      </Modal>

      {/* need to create a modal to populate when user wants to create a new event on the calendar for others */}
      <h2>Create an event</h2>
      <Button onClick={handleHostFormModalOpen}>Open Host Modal</Button>
      <Modal
      open={showHostFormModal}
      onClose={handleHostFormModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
      <form onSubmit={handleHostCreate}>
        <FormControl>
          <FormLabel>Event Title</FormLabel>
          <TextField value={hostFormData.title} onChange={(e) => setHostFormData({ ...hostFormData, title: e.target.value })} type="text" variant='outlined' color='primary' />

          <FormLabel>Host</FormLabel>
          <TextField value={hostFormData.host} onChange={(e) => setHostFormData({ ...hostFormData, host: e.target.value })} type="text" variant='outlined' color='primary' />

          <FormLabel>Day</FormLabel>
          <TextField value={hostFormData.day} onChange={(e) => setHostFormData({ ...hostFormData, day: e.target.value })} type="text" variant='outlined' color='primary' />

          <FormLabel>Start Time</FormLabel>
          <TextField value={hostFormData.startTime} onChange={(e) => setHostFormData({ ...hostFormData, startTime: e.target.value })} type="text" variant='outlined' color='primary' />

          <FormLabel>End Time</FormLabel>
          <TextField value={hostFormData.endTime} onChange={(e) => setHostFormData({ ...hostFormData, endTime: e.target.value })} type="text" variant='outlined' color='primary' />

          <FormLabel>Description</FormLabel>
          <TextField value={hostFormData.description} onChange={(e) => setHostFormData({ ...hostFormData, description: e.target.value })} type="text" variant='outlined' color='primary' />

          <Button type="submit" variant="contained" color="primary">Submit</Button>

          </FormControl>
        </form>
          </Modal>
      
      <h2>Calendar View</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </>
  );
};

export default Scheduler;

// import React, { useState, useEffect } from "react"; //
// import axios from "axios";

// //mui components to make a "form"
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { FormControl, FormLabel } from '@mui/material';

// const Scheduler = () => {
//   // form data state to update on user input
//   const [formData, setFormData] = useState({ username: '', comments: '' });
//   // state to hold the events from the scheduler
//   const [timeSlot, setTimeSlot] = useState([]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       //hitting the addslot route with the form data
//       await axios.post('/api/addslot', formData);
//       //resets form data to empty after submission occurs
//       setFormData({ username: '', comments: '' });
//       getSchedules(); //grabs updated schedule after submission of form
//     } catch (error) {
//       console.error('Failed to add timeslot:', error);
//       alert('Failed to add timeslot, please try again');
//     }
//   }

//   const getSchedules = async () => {
//     try {
//       const response = await axios.get('/api/schedule');
//       setTimeSlot(response.data);
//     } catch (error) {
//       console.error('Failed to get schedule:', error);
//     }
//   }

//   //!! run getSchedules on mount
//   useEffect(() => {
//     getSchedules();
//   }, []);

//   return (
//     <>
//       <h2>Schedule Game Time</h2>
//       {/* had to add HTMl form for submit to work, DOES NOT WORK ON THE FormControl */}
//       <form onSubmit={handleSubmit}>
//       <FormControl >
//         <FormLabel>Username</FormLabel>
//         <TextField value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} type="text" variant='outlined' color='primary' />
        
//         <FormLabel>Comments</FormLabel>
//         <TextField value={formData.comments} onChange={(e) => setFormData({ ...formData, comments: e.target.value })} type="text" variant='outlined' color='primary' />
//         {/* <TextField type="date" /> */}
//         <Button type="submit" variant="contained" color="primary">Submit</Button>
//       </FormControl>
//       </form>
//       {/* THIS IS JUST FOR TESTING WILL BE REMOVED ONCE WE CAN GET THE GOOGLE CALENDAR EVENTS TO BE ADJUSTABLE BY USERS */}
//       <h2>Current Schedule</h2>
//       <ul>
//         {timeSlot.map((slot) => (
//           <li key={slot.id}>
//             <p>Username: {slot.username}</p>
//             <p>Comments: {slot.comments}</p>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

// export default Scheduler;
