import ApiCalendar from 'react-google-calendar-api';
import { Button } from '@mui/material';
import { useState } from 'react';
import { If, Then } from 'react-if';

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



const GoogleAuth = () => {

    const [isSignedIn, setIsSignedIn] = useState(false);
    
    const  handleSignIn = (event) => {
        if(!isSignedIn){
            apiCalendar.handleAuthClick();
            setIsSignedIn(true);
        } else {
            console.log('already signed in');
        }
    }
    
    const handleSignOut = (event) => {
        if(isSignedIn){
            apiCalendar.handleSignoutClick();
            setIsSignedIn(false);
        } else {
            console.log('already signed out');
        }
    }
    
    // bug with this code, user automatically sees the logout button even if they did not complete the login process
    return (
        <>
            <If condition={!isSignedIn}>
                <Then>
                    {/* (e) => handleItemClick(e, 'sign-in', setIsSignedIn) */}
                    <Button variant='contained' color='success' onClick={handleSignIn}>
                        sign-in
                    </Button>
                </Then>
            </If>
            <If condition={isSignedIn}>
                <Then>
                    {/* (e) => handleItemClick(e, 'sign-out', setIsSignedIn) */}
                    <Button variant='contained' color='error' onClick={handleSignOut}>
                        sign-out
                    </Button>
                </Then>
            </If>
        </>
    );
}

export default GoogleAuth;


// function handleItemClick(event, name, setIsSignedIn) {
//     if (name === 'sign-in') {
//         apiCalendar.handleAuthClick()
//         setIsSignedIn(true);
//     } else if (name === 'sign-out') {
//         apiCalendar.handleSignoutClick();
//         setIsSignedIn(false);
//     }
// }