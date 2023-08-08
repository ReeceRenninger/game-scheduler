import { Button } from '@mui/material';
import { If, Then } from 'react-if';

const GoogleAuth = ({ isSignedIn, setIsSignedIn, apiCalendar }) => {

  //!! tried breaking up the signup and sign in functions to see if that would help with the bug
  //!! tried fixing bug by adding the listUpcomingEvents to the handleSignIn - doesnt seem to want to work with async/await
  const handleSignIn = async () => {
    if (!isSignedIn) {
      await apiCalendar.handleAuthClick();
      setIsSignedIn(true);
    } else {
      console.log('already signed in');
    }
  }

  const handleSignOut = () => {
    if (isSignedIn) {
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
                    <Button variant='contained' color='success' onClick={handleSignIn}>
                        sign-in
                    </Button>
                </Then>
            </If>
            <If condition={isSignedIn}>
                <Then>
                    <Button variant='contained' color='error' onClick={handleSignOut}>
                        sign-out
                    </Button>
                </Then>
            </If>
        </>
    );
}

export default GoogleAuth;
