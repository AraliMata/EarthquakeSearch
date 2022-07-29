import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import {GiEarthAmerica} from 'react-icons/gi';
import {FaGithub, FaLinkedin} from 'react-icons/fa';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>

        <p className='footer-subscription-text'>
          Thank you for visiting earthquake search.
        </p>
      </section>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              <GiEarthAmerica className='navbar-icon' />
              EartquakeSearch
            </Link>
          </div>
          <small className='website-rights'>Created by Aralí Mata</small>
          <div className='social-icons'>
        
            <Link
              className='social-icon-link'
              to={'//github.com/AraliMata/'}
              target='_blank'
              aria-label='Githun'
            >
              <FaGithub />
            </Link>
            <Link
              className='social-icon-link'
              to={'//mx.linkedin.com/in/aralimata'}
              target='_blank'
              aria-label='LinkedIn'
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
