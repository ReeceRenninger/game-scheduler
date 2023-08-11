import { useTheme } from '../ThemeContext';
import '../styles/home.css'

const Home = () => {
    const { darkMode } = useTheme();


    return (
        <>
            <div className={`home-container ${darkMode ? 'dark' : 'light'}`}>
                <h1>Home</h1>
              
                
               
            </div>
        </>
    );
};

export default Home;