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
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small"><a href="https://github.com/IkeSteoger">GitHub</a></Button>
          <Button size="small"><a href="https://www.linkedin.com/in/ikesteoger/">LinkedIn</a></Button>
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
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small"><a href="https://github.com/ReeceRenninger">GitHub</a></Button>
          <Button size="small"><a href="https://www.linkedin.com/in/reecerenninger/">LinkedIn</a></Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default About;