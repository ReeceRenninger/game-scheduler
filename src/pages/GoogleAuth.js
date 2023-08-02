import ApiCalendar from 'react-google-calendar-api';

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

function handleItemClick(event, name) {
    if (name === 'sign-in') {
        apiCalendar.handleAuthClick()
    } else if (name === 'sign-out') {
        apiCalendar.handleSignoutClick();
    }
}

const GoogleAuth = () => {
    return (
        <>
            <button
                onClick={(e) => handleItemClick(e, 'sign-in')}
            >
                sign-in
            </button>
            <button
                onClick={(e) => handleItemClick(e, 'sign-out')}
            >
                sign-out
            </button>
        </>
    );
}

export default GoogleAuth;