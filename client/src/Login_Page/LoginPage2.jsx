import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEyeSlash, faEye, faUser, faPhone, faCalendar, faMapMarker, faIdCard } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/Images/Logo.png";
import loginBuffet from "../assets/Images/loginBuffet2.jpg";
import "./LoginPage2.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Login_Page2({ onLoginSuccess }) {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [user, setUser] = useState(null);
    const handleClick = () => {
        setIsSignUp(!isSignUp); // Toggle the active state
    }
    const [signupData, setSignupData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        phone: '',
        dob: '',
        address: '',
    });
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
        userType: 'Customer',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/login', loginData);

            if (response.data.user) {
                onLoginSuccess(response.data.user);
                setUser(response.data.user);
                console.log(response.data.user);
                const userType = loginData.userType;

                switch (userType) {
                    case 'Customer':
                        navigate("/");
                        break;
                    case 'Restaurant':
                        navigate("/restaurant-dashboard");
                        break;
                    case 'Admin':
                        navigate("/admin-dashboard");
                        break;
                    default:
                        navigate("/"); // Default to homepage
                }
            } else {
                setErrorMessage("Invalid Credentials");
                console.error('Login failed:', response.data.message);
            }
        } catch (error) {
            setErrorMessage('Error during login');
            console.error('Error during login:', error.message);
        }
    };
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/signup', signupData);

            if (response.data.message === 'Sign-up successful') {
                setIsSignUp(false);
            } else {
                setErrorMessage("Error during signup");
            }
        } catch (error) {
            setErrorMessage('Error during signup');
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handleInputChange2 = (e) => {
        const { name, value } = e.target;
        setSignupData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="body">
            <div className={`container  ${isSignUp ? "sign-up-mode" : ""}`}>
                <div className="signin-signup">
                    <form action="" className="sign-in-form" onSubmit={handleLogin}>
                        <h2 className="title">Sign In</h2>
                        <div className="input-field">
                            <div className="icons"><FontAwesomeIcon icon={faUser} /></div>
                            <input type="text" placeholder="Username" name="username" value={loginData.username}
                                onChange={handleInputChange} />
                        </div>
                        <div className="input-field">
                            <div className="icons"><FontAwesomeIcon icon={faLock} /></div>
                            <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={loginData.password}
                                onChange={handleInputChange} />
                            <div className="icons"><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}
                            /></div>
                            
                        </div>
                        <input type="submit" value='Login' className='btn' />
                        {errorMessage && <p style={{ color: "red", fontSize: "0.8rem" }}>{errorMessage}</p>}
                        <p className="account-text">Dont have an account ? <a href="#" id='sign-in-btn' onClick={handleClick}>Sign up</a></p>
                        <p style={{ marginBlock: "0.5rem", fontWeight: "600", color: "red" }}>Login as</p>
                        <select name="userType" style={{ border: "2px solid red" }} value={loginData.userType}
                            onChange={handleInputChange}>
                            <option value="Customer">Customer</option>
                            <option value="Restaurant" >Restaurant</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </form>

                    <form action="" className="sign-up-form" onSubmit={handleSignup}>
                        <h2 className="title">Sign Up</h2>
                        <div className="input-fields">
                            <div className="input-field">
                                <div className='icons'><FontAwesomeIcon icon={faUser} /></div>
                                <input type="text" placeholder="Username" name="username" value={signupData.username} onChange={handleInputChange2} />
                            </div>
                            <div className="input-field">
                                <div className='icons'><FontAwesomeIcon icon={faEnvelope} /></div>
                                <input type="text" placeholder="Email" name="email" value={signupData.email} onChange={handleInputChange2} />
                            </div>
                        </div>

                        <div className="input-fields">
                            <div className="input-field">
                                <div className="icons"><FontAwesomeIcon icon={faLock} /></div>
                                <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={signupData.password} onChange={handleInputChange2} />
                                <div className="icons"><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}
                            /></div>
                            </div>
                            <div className="input-field">
                                <div className='icons'><FontAwesomeIcon icon={faIdCard} /></div>
                                <input type="text" placeholder="Name" name="name" value={signupData.name} onChange={handleInputChange2} />
                            </div>
                        </div>

                        <div className="input-fields">
                            <div className="input-field">
                                <div className='icons'><FontAwesomeIcon icon={faPhone} /></div>
                                <input type="text" placeholder="Phone" name="phone" value={signupData.phone} onChange={handleInputChange2} />
                            </div>
                            <div className="input-field">
                                <div className='icons'><FontAwesomeIcon icon={faCalendar} /></div>
                                <input type="text" placeholder="Date of Birth" name="dob" value={signupData.dob} onChange={handleInputChange2} />
                            </div>
                        </div>

                        <div className="input-fields">
                            <div className="input-field address">
                                <div className='icons'><FontAwesomeIcon icon={faMapMarker} /></div>
                                <input type="text" placeholder="Address" name="address" value={signupData.address} onChange={handleInputChange2} />
                            </div>
                        </div>

                        <input type="submit" value='Sign Up' className='btn' />
                        <p className="account-text">Already have an account ? <a href="#" id='sign-in-btn' onClick={handleClick}>Sign in</a></p>
                    </form>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <img src={logo} alt="Brand Logo" className='Logo_image' />
                        <img src={loginBuffet} alt="Login buffet Pic" className='Buffet_image' />
                    </div>

                    <div className="panel right-panel">
                        <img src={logo} alt="Brand Logo" className='Logo_image' />
                        <img src={loginBuffet} alt="Login buffet Pic" className='Buffet_image' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login_Page2;