import './Navigation.scss';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Icon from '@mdi/react';
import { mdiFoodApple } from '@mdi/js';
import { useEffect, useState } from 'react';

function Navigation({ transition }) {
  const user = useSelector(state => state.user.user);
  const route = window.location.pathname;

  // const [change, setChange] = useState(0);
  const [show, setShow] = useState(false);

  const transitionNavBar = () => {
    if (transition && window.scrollY > 250) setShow(true);
    else {
      setShow(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (transition && mounted && window.scrollY > 250) setShow(true);

    if (transition) {
      window.addEventListener('scroll', transitionNavBar);
    } else setShow(true);

    return () => {
      mounted = false;
      window.removeEventListener('scroll', transitionNavBar);
    };
  }, [show, transition]);

  return (
    <header
      className={`${'Navigation-Navigation'} ${show ? 'Navigation-show' : ''}`}
    >
      <div className={`${show ? 'Navigation-logo' : 'Navigation-logoTemp'}`}>
        <Icon
          className={'Navigation-svg'}
          path={mdiFoodApple}
          size={2.2}
          // color={'#e63946'}
        />
        <h2>Better Me</h2>
      </div>

      <div className={'Navigation-links'}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive && show
                ? 'Navigation-active'
                : isActive && !show
                ? 'Navigation-activeTemp'
                : ''
            } ${show ? 'Navigation-link' : 'Navigation-linkTemp'}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `${
              isActive && show
                ? 'Navigation-active'
                : isActive && !show
                ? 'Navigation-activeTemp'
                : ''
            } ${show ? 'Navigation-link' : 'Navigation-linkTemp'}`
          }
        >
          Search
        </NavLink>
        <NavLink
          to="/exercise"
          className={({ isActive }) =>
            `${
              isActive && show
                ? 'Navigation-active'
                : isActive && !show
                ? 'Navigation-activeTemp'
                : ''
            } ${show ? 'Navigation-link' : 'Navigation-linkTemp'}`
          }
        >
          Gym
        </NavLink>

        {user ? (
          <>
            {/* <NavLink
              to="/summary"
              className={({ isActive }) =>
                `${isActive && show ? 'Navigation-active' : ''} ${
                  show ? 'Navigation-link' : 'Navigation-linkTemp'
                }`
              }
            >
              Summary
            </NavLink> */}
            {/* <NavLink
              to="/nutrition"
              className={({ isActive }) =>
                `${isActive && show ? 'Navigation-active' : ''} ${
                  show ? 'Navigation-link' : 'Navigation-linkTemp'
                }`
              }
            >
              Nutrition
            </NavLink> */}
            <NavLink
              to="/mealplan"
              className={({ isActive }) =>
                `${isActive && show ? 'Navigation-active' : ''} ${
                  show ? 'Navigation-link' : 'Navigation-linkTemp'
                }`
              }
            >
              Meal Plan
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${isActive && show ? 'Navigation-active' : ''} ${
                  show ? 'Navigation-link' : 'Navigation-linkTemp'
                }`
              }
            >
              Profile
            </NavLink>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={`${show ? 'Navigation-btn' : 'Navigation-btnTemp'} ${
                route === '/login' ? 'Navigation-btnFocus' : ''
              }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`${show ? 'Navigation-btn' : 'Navigation-btnTemp'} ${
                route === '/signup' ? 'Navigation-btnFocus' : ''
              }`}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

//                 { user ?
//                     <>
//                         {/* <NavLink to='/summary' className={({ isActive }) => `${isActive && show ? style.active : ''} ${show ? style.link : style.linkTemp}`}>Summary</NavLink> */}
//                         <NavLink to='/mealplan' className={({ isActive }) => `${isActive && show ? style.active : ''} ${show ? style.link : style.linkTemp}`}>Journal</NavLink>
//                         <NavLink to='/nutrition' className={({ isActive }) => `${isActive && show ? style.active : ''} ${show ? style.link : style.linkTemp}`}>Nutrition</NavLink>
//                         <NavLink to='/profile' className={({ isActive }) => `${isActive && show ? style.active : ''} ${show ? style.link : style.linkTemp}`}>Profile</NavLink>
//                     </>
//                 : 
//                     <>
//                         <Link to='/login' className={`${show ? style.btn : style.btnTemp} ${route === '/login' ? style.btnFocus : ''}`}>Login</Link>
//                         <Link to='/signup' className={`${show ? style.btn : style.btnTemp} ${route === '/signup' ? style.btnFocus : ''}`}>Sign Up</Link>
//                     </>
//                 }
//             </div>
            
//         </header>
//     )

// };

export default Navigation;
