import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import style from "./General.module.scss";

function General() {
  const user = useSelector((state) => state.user.user);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const Diet = useRef(null);
  const Age = useRef(null);
  const Height = useRef(null);
  const Weight = useRef(null);
  const Allergies = useRef(null);
  const Hated = useRef(null);
  const Favorite = useRef(null);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:4000/users/details/${user.user_id}`)
        .then((res) => {
            console.log(res.data)
            setUserDetails(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const submit = async () => {
    setLoading(true);
    axios
      .put(
        `http://localhost:4000/users/details/${user.user_id}`,
        {
          diet_type: Diet.current.value || userDetails.diet_type,
          age: Age.current.value || userDetails.age,
          height: Height.current.value || userDetails.height,
          weight: Weight.current.value || userDetails.weight,
          allergies: Allergies.current.value || userDetails.allergies,
          favoriteFood: Favorite.current.value || userDetails.favoritefood,
          nonFavoriteFood: Hated.current.value || userDetails.nonfavoritefood,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setLoading(false);
        alert("Successfully updated!");
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        alert("User Failed to update");
      });
  };

  return (
    <div className={style.main}>
      <h1>Welcome to Account settings</h1>
      <br />
      <p>Change your account information</p>
      <br />
      <div className={style.container}>
        {userDetails ? (
          <div className={style.account}>
            <h1> Current Age: {userDetails && userDetails.age}</h1>
            <h1> Current Height: {userDetails && userDetails.height}</h1>
            <h1> Current Weight: {userDetails && userDetails.weight}</h1>
            <h1> Current Allergies: {userDetails && userDetails.allergies}</h1>
            <h1> Current Diet: {userDetails && userDetails.diet_type}</h1>
            <h1>Current Favorite Food: {userDetails && userDetails.favoritefood}</h1>
            <h1>Current Hated Food: {userDetails && userDetails.nonfavoritefood}</h1>
          </div>
        ) : (
          <div className={style.account}>
            <h1>You have no user details as yet, why not create some!</h1>
          </div>
        )}
        {loading ? (
          <div className={style.loadingDiv}>
            <div className={style.loader}></div>
          </div>
        ) : (
          <form className={style.content}>
            <label htmlFor="">Age</label>
            <br />
            <input ref={Age} type="text" placeholder="Enter your new Age..." />
            <br />
            <br />

            <label htmlFor="">Height</label>
            <br />
            <input
              ref={Height}
              type="text"
              placeholder="Enter your new Height..."
            />
            <br />
            <br />

            <label htmlFor="">Weight</label>
            <br />
            <input
              ref={Weight}
              type="text"
              placeholder="Enter your new Weight..."
            />
            <br />
            <br />

            <label htmlFor="">Diet</label>
            <br />
            <input
              ref={Diet}
              type="text"
              placeholder="Enter your new Diet..."
            />

            <br />
            <br />

            <label htmlFor="">Allergies</label>
            <br />
            <input
              ref={Allergies}
              type="text"
              placeholder="Enter your new Allergies..."
            />
            <br />
            <br />

            <label htmlFor="">Favorite Food</label>
            <br />
            <input
              ref={Favorite}
              type="text"
              placeholder="Enter your new Favorite Food..."
            />

            <label htmlFor="">Hated Food</label>
            <br />
            <input
              ref={Hated}
              type="text"
              placeholder="Enter your new Hated Food..."
            />
            <br />
            <br />
            <br />
            <br />
            <br />
            <button
              onClick={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              Submit Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default General;
