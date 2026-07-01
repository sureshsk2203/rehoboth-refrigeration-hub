import React, { useState } from "react";
import "./Contact.css";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

const Contact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!name.trim()) {
      alert("Enter your name");
      return;
    }

    if (name.charAt(0) !== name.charAt(0).toUpperCase()) {
      alert("Name first letter must be capital");
      return;
    }

    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      alert("Enter valid 10 digit phone number");
      return;
    }

    if (!email.includes("@gmail.com")) {
      alert("Enter valid email");
      return;
    }

    alert("Validation Success");
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-info">
          <h1>GET IN TOUCH</h1>
          <p>We are here to help you!</p>

          <div className="info-item">
            <FaPhoneAlt className="icon" />
            <div>
              <h4>Phone</h4>
              <p>
                <a href="tel:+919952989168">+91 9952989168</a>
              </p>
            </div>
          </div>

          <div className="info-item">
            <FaEnvelope className="icon" />
            <div>
              <h4>Email</h4>
              <p>
                <a href="mailto:kgovindharaj2004@gmail.com">
                  kgovindharaj2004@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="info-item">
            <FaMapMarkerAlt className="icon" />
            <div>
              <h4>Address</h4>
              <p>Chennai, Tamil Nadu - 600001</p>
            </div>
          </div>

          <div className="info-item">
            <FaClock className="icon" />
            <div>
              <h4>Working Hours</h4>
              <p>Mon - Sat: 9 AM - 7 PM</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send us a Message</h2>

          <div className="form-grid">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              maxLength={10}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, ""))
              }
            />
          </div>

          <textarea
            rows="6"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button onClick={sendMessage}>Send Message</button>
        </div>
      </div>

      <a
        href="https://wa.me/919952989168"
        className="whatsapp-btn"
        target="_blank"
        rel="noreferrer"
      >
        <FaWhatsapp />
      </a>

      <a href="tel:+919443791706" className="call-btn">
        <FaPhoneAlt />
      </a>

      <div className="map-container">
        <iframe
          title="map"
          src="https://maps.google.com/maps?q=Adayakarungulam,Ambasamudram,Tirunelveli,Tamil%20Nadu&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="350"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;