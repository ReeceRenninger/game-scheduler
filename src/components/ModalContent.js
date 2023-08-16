import { FormControl, FormLabel, TextField, Button } from '@mui/material';


const ModalContent = ({ event, formData, setFormData, handleSubmit }) => (
  <FormControl style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
    <FormLabel>Username</FormLabel>
    <TextField 
    value={formData.username} 
    onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
    label={`Username for ${event.title}`}
    type="text" variant='outlined' color='primary' />

    <FormLabel>Comments</FormLabel>
    <TextField 
    value={formData.comments} 
    onChange={(e) => setFormData({ ...formData, comments: e.target.value })} 
    label={`Comments for ${event.title}`}
    type="text" variant='outlined' color='primary' />
    
    <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">Submit</Button>
    
  </FormControl>
);

export default ModalContent;