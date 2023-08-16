import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Scheduler from './pages/Scheduler';
import Home from './pages/Home';
import Header from './pages/Header';
import About from './pages/About';
import Footer from './components/Footer';
import ApiCalendar from 'react-google-calendar-api';
import { useState } from 'react';

const clientId = process.env.REACT_APP_CLIENT_ID;
const apiKey = process.env.REACT_APP_API_KEY;

const config = {
  "clientId": clientId,
  "apiKey": apiKey,
  "scope": "https://www.googleapis.com/auth/calendar",
  "discoveryDocs": [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
  ]
}

const apiCalendar = new ApiCalendar(config)

function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [googleEvents, setGoogleEvents] = useState([])

  const handleGoogleEvents = () => {
    if (isSignedIn) {
      apiCalendar.listUpcomingEvents(10)
        .then(({ result }) => {
          // console.log(result.items);
          setGoogleEvents(result.items)
        })
        .catch((error) => {
          // Handle any errors that might occur during the API call
          console.error('Error fetching upcoming events:', error);
        });
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} apiCalendar={apiCalendar} handleGoogleEvents={handleGoogleEvents} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scheduler" 
          element={<Scheduler 
          googleEvents={googleEvents} 
          handleGoogleEvents={handleGoogleEvents} 
          isSignedIn={isSignedIn} />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
