import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Redux/slice/userSlice';

import './ProfilePage.scss';

import Nav from '../../Components/Navigation/Navigation';
import Footer from '../../Components/Footer/Footer';

import placeholder from '../../images/placeHolder.png';

// Components
import Account from './Components/AccountComponent/Account';
import General from './Components/GeneralComponent/General';

import Icon from '@mdi/react';
import { mdiCogOutline } from '@mdi/js';
import { mdiAccountCogOutline } from '@mdi/js';
import { mdiLogout } from '@mdi/js';
import { mdiCookieCogOutline } from '@mdi/js';
import { mdiHelpCircleOutline } from '@mdi/js';
import { mdiFlowerTulip } from '@mdi/js';

// Themes
import { ThemeContext } from '../../Theme/ThemeContext';

function ProfilePage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const [active, setActive] = useState('General');

  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (!user) setTimeout(() => navigate('/signup'), 1000);
  });

  return (
    <>
      <Nav />

      <div className={'ProfilePage-main'}>
        <div className={'ProfilePage-sideBar'}>
          <h1>Account Page</h1>
          <img className={'ProfilePage-image'} src={placeholder} alt='' />

          <h2>{user ? user.fullname : ''}</h2>
          <div className={'ProfilePage-actions'}>
            <div className={`${active === 'General' ? 'ProfilePage-active' : ''}`} onClick={() => setActive('General')}>
              <Icon color={'white'} path={mdiFlowerTulip} size={1.5} className={'ProfilePage-iconSvg'} />
              <p>General</p>
            </div>

            <div className={`${active === 'Settings' ? 'ProfilePage-active' : ''}`} onClick={() => setActive('Settings')}>
              <Icon color={'white'} path={mdiCogOutline} size={1.5} className={'ProfilePage-iconSvg'} />
              <p>Settings</p>
            </div>

            <div className={`${active === 'Account' ? 'ProfilePage-active' : ''}`} onClick={() => setActive('Account')}>
              <Icon color={'white'} path={mdiAccountCogOutline} size={1.5} className={'iconSvg'} />
              <p>Account</p>
            </div>

            <div className={`${active === 'Help' ? 'ProfilePage-active' : ''}`} onClick={() => setActive('Help')}>
              <Icon color={'white'} path={mdiHelpCircleOutline} size={1.5} className={'iconSvg'} />
              <p>Help</p>
            </div>

            <div className={`${active === 'Privacy' ? 'ProfilePage-active' : ''}`} onClick={() => setActive('Privacy')}>
              <Icon color={'white'} path={mdiCookieCogOutline} size={1.5} className={'ProfilePage-iconSvg'} />
              <p>Privacy & Safety</p>
            </div>
          </div>

          <div
            onClick={() => {
              dispatch(logout());
              window.location.replace('/');
            }}
            className={'ProfilePage-logout'}
          >
            <Icon path={mdiLogout} size={1.5} className={'ProfilePage-iconSvg'} />
            <h1>Logout</h1>
          </div>
        </div>
        <div className={'ProfilePage-container'}>
          {active === 'General' ? (
            <General />
          ) : active === 'Settings' ? (
            <div>
              <h1>Setting Components</h1>
              <br />
              <br />
              <div className={'ProfilePage-settingsSection'}>
                <p>Toggle Dark Mode</p>
                <label className={'ProfilePage-switch'}>
                  <input type='checkbox' defaultChecked={theme === 'dark' ? true : false} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
                  <span className={`${'ProfilePage-slider'} ${'ProfilePage-round'}`}></span>
                </label>
              </div>
            </div>
          ) : active === 'Account' ? (
            <Account />
          ) : active === 'Help' ? (
            <div>
              <h1>Help Component</h1>
              <br />
              <br />
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi accusantium, delectus, mollitia eaque vero maxime laborum consequatur saepe
                ab, amet illo animi molestias iure optio corrupti error corporis minus. Aliquid.
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quisquam natus odio harum ab. Magni iste a perferendis sit suscipit. Porro
                perspiciatis quibusdam rerum corrupti architecto ea optio adipisci exercitationem.
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, perferendis earum officiis ratione dignissimos optio libero quia cumque, tempore
                atque rerum non alias distinctio beatae enim, vero architecto. Ex, sint.
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi accusantium, delectus, mollitia eaque vero maxime laborum consequatur saepe
                ab, amet illo animi molestias iure optio corrupti error corporis minus. Aliquid.
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quisquam natus odio harum ab. Magni iste a perferendis sit suscipit. Porro
                perspiciatis quibusdam rerum corrupti architecto ea optio adipisci exercitationem.
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, perferendis earum officiis ratione dignissimos optio libero quia cumque, tempore
                atque rerum non alias distinctio beatae enim, vero architecto. Ex, sint.
              </p>
            </div>
          ) : active === 'Privacy' ? (
            <div>
              <h1>Privacy & Safety</h1>
              <br />
              <br />
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi accusantium, delectus, mollitia eaque vero maxime laborum consequatur saepe
                ab, amet illo animi molestias iure optio corrupti error corporis minus. Aliquid.
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quisquam natus odio harum ab. Magni iste a perferendis sit suscipit. Porro
                perspiciatis quibusdam rerum corrupti architecto ea optio adipisci exercitationem.
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, perferendis earum officiis ratione dignissimos optio libero quia cumque, tempore
                atque rerum non alias distinctio beatae enim, vero architecto. Ex, sint.
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi accusantium, delectus, mollitia eaque vero maxime laborum consequatur saepe
                ab, amet illo animi molestias iure optio corrupti error corporis minus. Aliquid.
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quisquam natus odio harum ab. Magni iste a perferendis sit suscipit. Porro
                perspiciatis quibusdam rerum corrupti architecto ea optio adipisci exercitationem.
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, perferendis earum officiis ratione dignissimos optio libero quia cumque, tempore
                atque rerum non alias distinctio beatae enim, vero architecto. Ex, sint.
              </p>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProfilePage;
