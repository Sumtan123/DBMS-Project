import "./LoginCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLock, faUser} from '@fortawesome/free-solid-svg-icons'


function LoginCard() {
    return(
        <div className="loginContainer">
            <form action="" className="sign-in-form">
                    <h2 className="title">Sign In</h2>
                    <div className="input-field">
                        <FontAwesomeIcon icon={faUser}/>
                        <input type="text" placeholder="Username" className="details"/>
                    </div>
                    <div className="input-field">
                        <FontAwesomeIcon icon={faLock} />
                        <input type="text" placeholder="Password" className="details"/>
                    </div>
                    <input type="submit" value='Login' className='btn'/>
                </form>
        </div>
    )
}

export default LoginCard;