import { useTheme } from '../ThemeContext';
import '../home.css'

const Home = () => {
    const { darkMode } = useTheme();


    return (
        <>
            <div className={`home-container ${darkMode ? 'dark' : 'light'}`}>
                <h1>Home</h1>

                <h2>Created by IkeStogi and CodingWithReece</h2>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/gFBTgBwmUno" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </>
    );
};

export default Home;