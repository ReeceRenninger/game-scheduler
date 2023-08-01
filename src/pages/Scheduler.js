import 'buffer'; 
import React, { useState, useEffect } from "react"; //
import axios from "axios"; 

const Scheduler = () => { 
  // form data state to update on user input
  const [formData, setFormData] = useState({username: '', contact:'', timeSlot:''});
  // state to hold the events from the scheduler
  const [timeSlot, setTimeSlot] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //hitting the addslot route with the form data
      await axios.post('/api/addslot', formData);
      //setting state of form data to empty
      setFormData({username: '', contact:'', timeSlot:''});
      getSchedules(); //function to grab all timeslots
    } catch (error) {
      console.error('Failed to add timeslot:', error);
      alert('Failed to add timeslot, please try again');
    }
  }

  const getSchedules = async () => {
    try {
      const response = await axios.get('/api/schedules');
      setTimeSlot(response.data);
    } catch (error) {
      console.error('Failed to get schedule:', error);
    }
  }

  //!! run getschedules on mount
  useEffect(() => {
    getSchedules();
  }, []);

  return (
     <div className="scheduler-container">
      <h2>Schedule Game Time</h2>
      <div className="time-slots">
        {timeSlot.map((event) => (
          <div key={event.id} className="slot">
            {event.start.dateTime} - {event.end.dateTime}
          </div>
        ))}
      </div>
      {/* need some type of button confirmation with event? */}
      <button >Confirm Schedule</button> 
    </div>
  );
};

export default Scheduler;
