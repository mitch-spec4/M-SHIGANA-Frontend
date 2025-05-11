import React from "react";

const Contact = () => (
  <section className="contact-section fade-in">
    <h2>Contact Us</h2>
    <p>If you have any questions or need support, please reach out to us:</p>
    <ul>
      <li>Email: support@shigana.com</li>
      <li>Phone: +254 712345908</li>
      <li>Address: 123 Shigana St, FinTech City, World</li>
    </ul>
    <form>
      <label htmlFor="name">Name:</label><br />
      <input type="text" id="name" name="name" placeholder="Your name" /><br />
      <label htmlFor="email">Email:</label><br />
      <input type="email" id="email" name="email" placeholder="Your email" /><br />
      <label htmlFor="message">Message:</label><br />
      <textarea id="message" name="message" placeholder="Your message" rows="4"></textarea><br />
      <button type="submit">Send</button>
    </form>
  </section>
);

export default Contact;
