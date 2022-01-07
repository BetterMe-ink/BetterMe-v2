import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookie from 'js-cookie';
import moment from 'moment';

import Nav from '../../Components/Navigation/Navigation';
import Footer from '../../Components/Footer/Footer';

import './MealPlanPage.scss';
// import '../../index.css';

import exercise from '../../images/exercise.jpg';
import placeholder from '../../images/placeHolder.png';

function MealPage() {
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);

  let biscuit;
  if (Cookie.get('filledOut')) biscuit = Cookie.get('filledOut');
  const [filledOut, setFilledOut] = useState(biscuit || false);

  const [close, setClose] = useState(false);
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) setTimeout(() => navigate('/signup'), 1000);
    if (filledOut) setClose(true);
    else if (close) setClose(false);

    if (user) {
      axios
        .get(`http://localhost:4000/foodEntry/${user.user_id}`)
        .then((res) => {
            console.log(res)
            if (res.data !== 'No entries found') setFood((prev) => [...prev, ...res.data]);
        });
    }
  }, [user]);

  const M1 = useRef(null);
  const M2 = useRef(null);
  const M3 = useRef(null);

  function getDateInSQLFormat() {
    return new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
  }

  const rateHealth = val => {
    if (val <= 1000) {
      return 'normal/ ok ish';
    } else if (val <= 1300) {
      return 'healthy';
    } else {
      return 'Unhealthy/ bad ish';
    }
  };

  const rateHealthC = val => {
    if (val <= 1000) {
      return 'yellow';
    } else if (val <= 1300) {
      return 'green';
    } else {
      return 'red';
    }
  };

  const submitJournal = () => {
    // setLoading(true)
    axios
      .all([
        axios.get(
          `https://api.spoonacular.com/recipes/guessNutrition?title=${M1.current.value
            .split(' ')
            .join('+')}&apiKey=0f7da7b376034db9a8eaaff872a41ae7`
        ),
        axios.get(
          `https://api.spoonacular.com/recipes/guessNutrition?title=${M2.current.value
            .split(' ')
            .join('+')}&apiKey=0f7da7b376034db9a8eaaff872a41ae7`
        ),
        axios.get(
          `https://api.spoonacular.com/recipes/guessNutrition?title=${M3.current.value
            .split(' ')
            .join('+')}&apiKey=0f7da7b376034db9a8eaaff872a41ae7`
        ),
      ])
      .then(obj1 => {
        console.log(obj1);
        localStorage.setItem('calories', JSON.stringify({ value: obj1 }));
        axios
          .post(`http://localhost:4000/foodEntry/${user.user_id}`, {
            meal1: M1.current.value,
            meal1_cfp: `${obj1[0].data.carbs.value}, ${obj1[0].data.fat.value}, ${obj1[0].data.protein.value}`,
            meal2: M2.current.value,
            meal2_cfp: `${obj1[1].data.carbs.value}, ${obj1[1].data.fat.value}, ${obj1[1].data.protein.value}`,
            meal3: M3.current.value,
            meal3_cfp: `${obj1[2].data.carbs.value}, ${obj1[2].data.fat.value}, ${obj1[2].data.protein.value}`,
            total_calories:
              obj1[0].data.calories.value +
              obj1[1].data.calories.value +
              obj1[2].data.calories.value,
            weight: '50kg',
            date_created: getDateInSQLFormat(),
          })
          .then((res) => {
            // setLoading(false);
            console.log(res);
            setFood((prev) => [...prev, res.data]);
            setClose(true)
            localStorage.setItem("calories", JSON.stringify({value: food}));
            Cookie.set('filledOut', 1, {expires: 1});
          })
          .catch((err) => {
              console.log(err);
              setLoading(false);
          });
      })
      .catch((err) => {
          console.log(err);
          setLoading(false);
      });
  };

  if (localStorage.getItem('calories')) localStorage.getItem('calories');
  console.log(food);

  return (
    <>
      <Nav />
      <div className={'MealPlanPage-main'}>
        {/* { filledOut ?  */}
        <div className={`${'MealPlanPage-overlay'} ${close ? 'MealPlanPage-close' : ""}`}>
          { loading ? (
            <div className={'MealPlanPage-loadingDiv'}>
                <div className={'MealPlanPage-loader'}></div>
            </div>
            ) :
          <div className={'MealPlanPage-popover'}>
            <h1>Food Journal</h1>
            <br />
            <br />
            <p>Tell us about the food you ate today!</p>
            <br />
            <br />
            <label htmlFor="breakfast">Breakfast</label>
            <br />
            <input
              ref={M1}
              type="text"
              id="breakfast"
              placeholder="Enter what you ate for breakfast today..."
            />

            <br />
            <br />
            <label htmlFor="lunch">Lunch</label>
            <br />
            <input
              ref={M2}
              type="text"
              id="lunch"
              placeholder="Enter what you ate for lunch today..."
            />

            <br />
            <br />
            <label htmlFor="dinner">Dinner</label>
            <br />
            <input
              ref={M3}
              type="text"
              id="dinner"
              placeholder="Enter what you ate for dinner today..."
            />

            <br />
            <br />
            <br />

            <div className={'MealPlanPage-btnDiv'}>
              <button
                className={'MealPlanPage-btnSkip'}
                onClick={() => setClose(true)}
              >
                Skip
              </button>
              <button
                className={'MealPlanPage-btn'}
                onClick={() => submitJournal()}
              >
                Submit
              </button>
            </div>
            </div> 
        }
        </div>
        {/* : '' } */}
        <div
          className={'MealPlanPage-backDrop'}
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${exercise})`,
          }}
        />
        <div className={'MealPlanPage-container'}>
          <div className={'MealPlanPage-containerTitle'}>
            <div className={'MealPlanPage-titleDiv'}>
              <br />
              <h1>Welcome to Your Food Journal</h1>
              <br />
              {!food ? (
                <p>
                  You currently have no meals for us to track for you why not
                  create some
                </p>
              ) : (
                <p>Welcome back {user.username}</p>
              )}
              <br />
              <br />
            </div>
            <button onClick={() => setClose(false)}>
              Write in your food journal
            </button>
          </div>
          <br />
          <br />
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          User
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Breakfast
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Lunch
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Dinner
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Total Calories
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Day of The Week
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      { food && food.length > 0 && food[food.length - 1].meal1 ? food.map((f, idx) =>{
                            const m = moment(f.date_created).format('dddd')
                        return (
                          <tr key={idx}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={placeholder}
                                    alt="placeholder"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm text-gray-500">
                                    {user.username}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {f.meal1}
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                {f.meal1_cfp}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {f.meal2}
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                {f.meal2_cfp}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {f.meal3}
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                {f.meal3_cfp}
                              </div>
                            </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${rateHealthC(f.total_calories)}-100 text-${rateHealthC(f.total_calories)}-800`}>
                              {rateHealth(f.total_calories)}
                            </span>
                          </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {f.total_calories}g
                              </div>
                            </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {m}
                            </div>
                          </td>
                        </tr>
                      )}) : 
                            <tr>
                                <td>
                                    <p style={{marginLeft: '10px', padding: '10px'}}>Empty For Now </p>
                                </td>
                            </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
}

export default MealPage;