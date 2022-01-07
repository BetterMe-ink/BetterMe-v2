import './Footer.scss';
import { Link } from 'react-router-dom';

import Icon from '@mdi/react';
import { mdiFoodApple } from '@mdi/js';

function Footer() {
  return (
    <div className={'Footer-Footer'}>
      <div className={'Footer-logo'}>
        <Icon
          className={'Footer-svg'}
          path={mdiFoodApple}
          size={2.2}
          color="white"
        />
        <h2>Better Me</h2>
      </div>

      <div className={'Footer-container'}>
        <div className={'Footer-col1'}>
          <p className={'Footer-head'}>Community</p>
          <p>About Us</p>
          <p>Contact Us</p>
          <p>Join Us</p>
          <p>Follow us</p>
        </div>

        <div className={'Footer-col2'}>
          <p className={'Footer-head'}>Get Started</p>
          <Link className={'Footer-link'} to="/">
            Home
          </Link>
          <Link className={'Footer-link'} to="/search">
            Search
          </Link>
          <Link className={'Footer-link'} to="/mealplan">
            Meal Plan
          </Link>
          <Link className={'Footer-link'} to="/summary">
            Summary
          </Link>
          <Link className={'Footer-link'} to="/nutrition">
            Nutrition
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
