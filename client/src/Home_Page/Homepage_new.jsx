import './Homepage_new.css';
import { Navbar_Home } from '../Navbar/Navbar.jsx';
import { useNavigate } from 'react-router-dom';
const Homepage = ({ user, setUser }) => {
    const navigate = useNavigate();
    const navToRest = () => navigate("/restaurants")
    const handleLogout = () => {
        setUser(null);
      };
      const openChatbot = () => {
        window.open('http://127.0.0.1:5000', '_blank');
    };
    return (
        <>
            <Navbar_Home user={user} setUser={setUser} onLogout={handleLogout}/>
            <div className="Home_container">
                {/* <div className="homepage_image"></div> */}
                <h2 className='Home_homepage_heading'>Welcome to</h2>
                <div className="Home_brandNameContainer">
                    <h1 className="Home_brandName">DineSwift</h1></div>
                <h4 className="Home_description">From restaurant to your doorstep<br />
                    Effortless food delivery made easy.</h4>
                <button className="Home_order_button" onClick={navToRest}>Order Now</button>
                <button className="Home_chatbot_button" onClick={openChatbot}>Open Chatbot</button>
            </div>
        </>
    )
}
export default Homepage;