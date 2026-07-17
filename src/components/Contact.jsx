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


  if (phone.length !== 10 || !/^\d+$/.test(phone)) {
    alert("Enter valid 10 digit phone number");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  alert("Enter a valid email address");
  return;
}

  if (!message.trim()) {
    alert("Enter your message");
    return;
  }

  const whatsappMessage = `Hello Rehoboth Refrigeration Hub,

Name: ${name}
Phone: ${phone}
Email: ${email}

Message:
${message}`;

  const url = `https://wa.me/919443791706?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  window.open(url, "_blank");
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
                <a href="tel:+919443791706">+91 9443791706</a>
              </p>
            </div>
          </div>

          <div className="info-item">
            <FaEnvelope className="icon" />
            <div>
              <h4>Email</h4>
              <p>
                <a href="mailto:williamharvey2018@gmail.com">
                  williamharvey2018@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="info-item">
  <FaMapMarkerAlt className="icon" />
  <div>
    <h4>Address</h4>
    <p>
      REHOBOTH REFRIGERATION HUB,<br />
      3/574B-Marakkadi Stop, Near: RAJATHAI Typewriting institue,<br />
      Sivanathipuram Main Road-627425,<br />
      Papanasam, Tirunelveli.
    </p>
  </div>
</div>

          <div className="info-item">
            <FaClock className="icon" />
            <div>
              <h4>Working Hours</h4>
              <p>Mon - Sat: 9 AM - 8 PM</p>
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
        href="https://wa.me/919443791706"
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
    title="Rehoboth Refrigeration Hub"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.8100999726075!2d77.41112210000003!3d8.709575899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04390039f63bb7%3A0xcbf3983d6845687a!2sREHOBOTH%20REFRIGERATION%20HUB!5e0!3m2!1sen!2sin!4v1783830884599!5m2!1sen!2sin"
    width="100%"
    height="400"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="strict-origin-when-cross-origin"
  ></iframe>
</div>
    </section>
  );
};

export default Contact;