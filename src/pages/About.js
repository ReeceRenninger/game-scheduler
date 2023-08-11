import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReeceImage from '../assets/headshotforsites.png';
import IkeImage from '../assets/ike.jpg';
import '../styles/about.css'

const About = () => {
  return (
    <Box className="about-us">
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          sx={{ height: 400 }}
          image={IkeImage}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Ike Steoger
          </Typography>
          <Typography variant="body2" color="text.secondary">
           Full-Stack Developer with a background in sales and customer service. I am a team player with a passion for learning and problem solving. I am looking to join a team where I can utilize my skills and experience to help create innovative and exciting applications.
          </Typography>
        </CardContent>
        <CardActions className='about-buttons'>
          <Button size="small" href="https://github.com/IkeSteoger">GitHub</Button>
          <Button size="small" href="https://www.linkedin.com/in/ikesteoger/">LinkedIn</Button>
        </CardActions>
      </Card>

      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          sx={{ height: 400 }}
          image={ReeceImage}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Reece Renninger
          </Typography>
          <Typography variant="body2" color="text.secondary">
            USMC Veteran with a background in military leadership and management. I am a Full-Stack Developer with a passion for learning and problem solving. I am looking to join a team where I can utilize my skills and experience to help a company grow.
          </Typography>
        </CardContent>
        <CardActions className='about-buttons'>
          <Button size="small" href="https://github.com/ReeceRenninger">GitHub</Button>
          <Button size="small" href="https://www.linkedin.com/in/reecerenninger/">LinkedIn</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default About;