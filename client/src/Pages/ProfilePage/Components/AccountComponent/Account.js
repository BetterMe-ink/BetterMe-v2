import { useRef, useState } from 'react';
import './Account.scss';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

function Account() {
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user.user);

  const date = moment(user.date_joined);
  
  const FullName = useRef(null);
  const Email = useRef(null);
  const Username = useRef(null);
  const Password = useRef(null);

  const submit = async () => {
    setLoading(true);
    axios
      .put(
        `http://localhost:4000/users/${user.user_id}`,
        {
          fullName: FullName.current.value || user.fullname,
          email: Email.current.value || user.email,
          username: Username.current.value || user.username,
          password: Password.current.value || user.password,
        },
        { withCredentials: true }
      )
      .then(res => {
        setLoading(false);
        alert('Successfully updated!');
        window.location.reload();
      })
      .catch(err => {
        setLoading(false);
        alert('User Failed to update');
        console.log(err);
      });
  };

  return (
    <div className={'AccountComponent-main'}>
      <h1>Welcome to Account settings</h1>
      <br />
      <p>Change your account information</p>

      <div className={'AccountComponent-container'}>
        <div className={'AccountComponent-account'}>
          <h1> Current Full name: {user.fullname}</h1>
          <h1> Current User name: {user.username}</h1>
          <h1> Current Email: {user.email}</h1>
          <h1> Days Since Becoming Better: {date.fromNow()}</h1>
        </div>

        {loading ? (
          <div className={'AccountComponent-loadingDiv'}>
            <div className={'AccountComponent-loader'}></div>
          </div>
        ) : (
          <form className={'AccountComponent-content'}>
            <label htmlFor="">Full Name</label>
            <br />
            <input
              ref={FullName}
              type="text"
              placeholder="Enter your new Full Name"
            />
            <br />
            <br />

            <label htmlFor="">Username</label>
            <br />
            <input
              ref={Username}
              type="text"
              placeholder="Enter your new Username"
            />
            <br />
            <br />

            <label htmlFor="">Email</label>
            <br />
            <input
              ref={Email}
              type="text"
              placeholder="Enter your new Email..."
            />
            <br />
            <br />

            <label htmlFor="">Password</label>
            <br />
            <input
              ref={Password}
              type="password"
              placeholder="Enter your new Password..."
            />

            <br />
            <br />
            <br />
            <button onClick={submit}>Submit Changes</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Account;
