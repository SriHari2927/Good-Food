import React from 'react'
import './ContactUs.css'
import { ImFacebook2 } from "react-icons/im";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { GrLinkedin } from "react-icons/gr";
import { FaTwitterSquare } from "react-icons/fa";
import { FaYoutubeSquare } from "react-icons/fa";
import logo from '../../../assets/Foodlogo.jpg';

const ContactUs = () => {
  return (
    <> 
    <div className='contact-last'> 
    <div id='contact-section'>
    
        <h1 className='contact-details text-center'>Contact Us</h1>   <br/>   <br/>
        <div className='footer-down'>
          <div className='name-foot'>
          <img className='foot' src={logo} alt='food' />
            {/* <img className='foot' src={logo} alt='food' style={{ height: '6rem', width: '7rem', borderRadius: '5px' }} /> */}
            <div>To nourish humanity with <br/> wholesome food and spread<br/> the joy of well-being.</div>
          </div>
 
          <div className='name-foot'>
            <div className='bold-word'>Good Food App</div>
            <div>Terms and Conditions</div>
            <div>Privacy Policy</div>
            <div>Refund & Cancellation</div>
            <div>FAQ</div>
            <div>Our Team</div>
          </div>
 
          <div className='name-foot'>
            <div className='bold-word'>Get in Touch</div>
            <div>contact@goodfood.in</div>
            <div>+91 9459383445</div>
          </div>
 
          <div className='name-foot'>
            <div className='bold-word'>Follow us on</div>
            <div>
              <ImFacebook2 size={22} /> <FaWhatsappSquare size={25} /> <FaInstagramSquare size={25} />
            </div>
            <div>
              <GrLinkedin size={22} /> <FaTwitterSquare size={25} /> <FaYoutubeSquare size={25} />
            </div>
          </div>
        </div>
      </div> 

      </div>
    </>
  )
}

export default ContactUs