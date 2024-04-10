import React from 'react';
import './ContactPage.css';
import { Navbar_Home } from '../Navbar/Navbar';

function ContactPage({ user, setUser }) {
    const handleFormSubmit = () => {
        window.location.href = 'mailto:sumith.tantry@gmail.com?subject=Inquiry&body=Hello, I would like to inquire about...';
    };
    const handleLogout = () => {
        setUser(null);
      };
    return (
        <>
            <Navbar_Home user={user} setUser={setUser} onLogout={handleLogout}/>
            <section className="contact" id="contact">
                <div className="contact-container">
                    <div className="heading text-center">
                        <h2>Contact <span> Us </span></h2>
                        <p>Feel free to reach out to us with any inquiries, suggestions, or feedback.
                            Our dedicated team is here to assist you promptly, ensuring a seamless and enjoyable experience with our services.</p>
                    </div>
                    <div className="contact-content">
                        <div className="contact-details">
                            <div className="title">
                                <h3>Contact details</h3>
                                <p>Contact us via phone, email, or visit our office for any assistance. We look forward to hearing from you! </p>
                            </div>
                            <div className="info">
                                <div className="contact-info">
                                    <i className="fas fa-mobile-alt"></i>
                                    <h4>PHONE :</h4>
                                    <p>  +919663867936 , +919513805900</p>
                                </div>
                                <div className="contact-info">
                                    <i className="far fa-envelope"></i>
                                    <h4>EMAIL :</h4>
                                    <p>  sumith.tantry@gmail.com, tanmayshibulal1234@gmail.com</p>
                                </div>
                                <div className="contact-info">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <h4>ADDRESS :</h4>
                                    <p>  XYZ, Bengaluru, Karnataka, India</p>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form">
                            <form onSubmit={handleFormSubmit}>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Name" />
                                    <input type="email" className="form-control" placeholder="Email" />
                                    <input type="text" className="form-control" placeholder="Subject" />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" rows="5" id="comment" placeholder="Message"></textarea>
                                </div>
                                <button className="btn" type="submit">Send Now!</button>
                                <p id="confirmation-text" style={{ display: 'none' }}>Received, thank you!</p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactPage;
