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
                            <h1>Setting Components</h1>
                        : active === 'Account' ? 
                            <Account />
                        : active === 'Help' ? 
                            <h1>Help Component</h1>
                        : active === 'Privacy' ? 
                            <h1>Privacy & Safety</h1>
                        : ''}
                    </div>
                </div>

            <Footer />
        </>
    )
}

export default ProfilePage;
