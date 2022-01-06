import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Redux/slice/userSlice';

import style from './ProfilePage.module.scss';

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

function ProfilePage() {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const user = useSelector(state => state.user.user);

    const [active, setActive] = useState('General');

    useEffect(()=> {
        if (!user) navigate('/signup');
    });

    // console.log(user);

    return (
        <>
            <Nav />

                <div className={style.main}>
                    <div className={style.sideBar}>
                        <h1>Account Page</h1>
                        <img className={style.image} src={placeholder} alt="" />

                        <h2>{ user ? user.fullname : ''}</h2>
                        <div className={style.actions}>

                            <div className={`${active === 'General' ? style.active : ''}`} onClick={() => setActive('General')}>
                            <Icon 
                                path={mdiFlowerTulip}
                                size={1.5}
                                className={style.iconSvg}
                            />
                                <p>General</p>
                            </div>

                            <div className={`${active === 'Settings' ? style.active : ''}`} onClick={() => setActive('Settings')}>
                                <Icon 
                                    path={mdiCogOutline}
                                    size={1.5}
                                    className={style.iconSvg}
                                />
                                <p>Settings</p>
                            </div>

                            <div className={`${active === 'Account' ? style.active : ''}`} onClick={() => setActive('Account')}>
                                <Icon 
                                    path={mdiAccountCogOutline}
                                    size={1.5}
                                    className={style.iconSvg}
                                />
                                <p>Account</p>
                            </div>

                            <div className={`${active === 'Help' ? style.active : ''}`} onClick={() => setActive('Help')}>
                                <Icon 
                                    path={mdiHelpCircleOutline}
                                    size={1.5}
                                    className={style.iconSvg}
                                />
                                <p>Help</p>
                            </div>

                            <div className={`${active === 'Privacy' ? style.active : ''}`} onClick={() => setActive('Privacy')}>
                                <Icon 
                                    path={mdiCookieCogOutline}
                                    size={1.5}
                                    className={style.iconSvg}
                                />
                                <p>Privacy & Safety</p>
                            </div>

                        </div>

                        <div onClick={() => {
                            dispatch(logout())
                            window.location.replace('/')
                            }} className={style.logout}>
                            <Icon 
                                path={mdiLogout}
                                size={1.5}
                                className={style.iconSvg}
                            />
                            <h1>Logout</h1>
                        </div>
                    </div>
                    <div className={style.container}>
                        { active === 'General' ? 
                            <General />
                        : active === 'Settings' ? 
                            <div>
                                <h1>Setting Components</h1>
                                <br /><br />
                                <div className={style.settingsSection}>
                                    <p>Toggle Dark Mode</p>
                                    <label className={style.switch}>
                                        <input type="checkbox" />
                                        <span className={`${style.slider} ${style.round}`} ></span>
                                    </label>
                                </div>
                            </div>
                        : active === 'Account' ? 
                            <Account />
                        : active === 'Help' ? 
                            <div>
                                <h1>Help Component</h1>
                                <br /><br />
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi accusantium, delectus, mollitia eaque vero maxime laborum consequatur saepe ab, amet illo animi molestias iure optio corrupti error corporis minus. Aliquid.</p>
                                <br />
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quisquam natus odio harum ab. Magni iste a perferendis sit suscipit. Porro perspiciatis quibusdam rerum corrupti architecto ea optio adipisci exercitationem.</p>
                                <br />
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, perferendis earum officiis ratione dignissimos optio libero quia cumque, tempore atque rerum non alias distinctio beatae enim, vero architecto. Ex, sint.</p>
                                <br />
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi accusantium, delectus, mollitia eaque vero maxime laborum consequatur saepe ab, amet illo animi molestias iure optio corrupti error corporis minus. Aliquid.</p>
                                <br />
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quisquam natus odio harum ab. Magni iste a perferendis sit suscipit. Porro perspiciatis quibusdam rerum corrupti architecto ea optio adipisci exercitationem.</p>
                                <br />
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, perferendis earum officiis ratione dignissimos optio libero quia cumque, tempore atque rerum non alias distinctio beatae enim, vero architecto. Ex, sint.</p>
                            </div>
                        : active === 'Privacy' ? 
                        <div>
                                <h1>Privacy & Safety</h1>
                                <br /><br />
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi accusantium, delectus, mollitia eaque vero maxime laborum consequatur saepe ab, amet illo animi molestias iure optio corrupti error corporis minus. Aliquid.</p>
                                <br />
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quisquam natus odio harum ab. Magni iste a perferendis sit suscipit. Porro perspiciatis quibusdam rerum corrupti architecto ea optio adipisci exercitationem.</p>
                                <br />
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, perferendis earum officiis ratione dignissimos optio libero quia cumque, tempore atque rerum non alias distinctio beatae enim, vero architecto. Ex, sint.</p>
                                <br />
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi accusantium, delectus, mollitia eaque vero maxime laborum consequatur saepe ab, amet illo animi molestias iure optio corrupti error corporis minus. Aliquid.</p>
                                <br />
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quisquam natus odio harum ab. Magni iste a perferendis sit suscipit. Porro perspiciatis quibusdam rerum corrupti architecto ea optio adipisci exercitationem.</p>
                                <br />
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, perferendis earum officiis ratione dignissimos optio libero quia cumque, tempore atque rerum non alias distinctio beatae enim, vero architecto. Ex, sint.</p>
                            </div>
                        : ''}
                    </div>
                </div>

            <Footer />
        </>
    )
}

export default ProfilePage;
