import style from './SearchItemPage.module.scss';
import Nav from '../../Components/Navigation/Navigation';
import Footer from '../../Components/Footer/Footer';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';

import Cookie from 'js-cookie';

function SearchItemPage() {
  const { id } = useParams();

  // const [item, setItem] = useState(null);

  // useEffect(() => {
  //     axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=a55ef03413ed41f996c002316020cdde`)
  //         .then(res => {
  //             localStorage.setItem('item', JSON.stringify(res.data));
  //             setItem(res.data)
  //         })
  //         .catch(err => console.log(err));
  // }, [id])

  const item = JSON.parse(localStorage.getItem('item'));
  console.log(item);

  const user = useSelector((state) => state.user.user);

  const addFav = async () => {
    await axios
      .post(`http://localhost:4000/favorites/${user.user_id}/create`, {
        food_id: id,
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Nav />
      <div className={style.containerMain}>
        <div className={style.main}>
          <div className={style.SearchItemPage}>
            <div className={style.col1}>
              <img src={item ? item.image : ''} alt={item ? item.name : ''} />
              {user ? <button onClick={addFav}>Add to your recipes List</button> : ''}
            </div>

            <div className={style.col2}>
              <h1 className={style.title}>{item ? item.title : ''}</h1>
              <br />
              <h1>* {item ? item.sourceName : ''}</h1>
              <br />
              <br />
              <p className={style.summary}>{item && item ? parse(item.summary) : ''}</p>
              <br />
              <br />
            </div>
          </div>
          <div className={style.container}>
            <div>
              <strong>Vegetarian: </strong>
              <h1>{item && item.vegetarian ? 'Yes' : 'No'}</h1>
              <br />
              <br />
              <br />
              <strong>Dairy Free: </strong>
              <h1>{item && item.dairyFree ? 'Yes' : 'No'}</h1>
              <br />
              <br />
              <br />
              <strong>Vegan: </strong>
              <h1>{item && item.vegan ? 'Yes' : 'No'}</h1>
            </div>
            <div>
            <strong>Weight per Serving: </strong>
              <h1>
                {item ? item.nutrition.weightPerServing.amount : ''}
                {item ? item.nutrition.weightPerServing.unit : ''}
              </h1>
              <br />
              <br />
              <br />
              <strong>Time to make:</strong>
              <h1> {item ? item.readyInMinutes : ''} min</h1>
              <br />
              <br />
              <br />
              <strong>Price per serving: </strong>
              <h1>${item ? Math.floor(item.pricePerServing)/100 : ''}</h1>
            </div>
            <div>
            <strong>Calories: </strong>
              <h1>
                {item ? Math.floor(item.nutrition.nutrients[0].amount) : ''} {" "}
                {item ? item.nutrition.nutrients[0].title : ''}
              </h1>
              <br />
              <br />
              <strong>Macros:</strong>
              <h1>
                {item ? Math.floor(item.nutrition.nutrients[3].amount) : ''} 
                {item ? item.nutrition.nutrients[3].unit : ''}{" "}
                {item ? 'Carbs' : ''}{" "}
                ({item ? Math.floor(item.nutrition.nutrients[4].amount) : ''} 
                {item ? ' Net Carbs' : ''})
                <br/>
                {item ? Math.floor(item.nutrition.nutrients[1].amount) : ''}
                {item ? item.nutrition.nutrients[1].unit : ''}{" "}
                {item ? item.nutrition.nutrients[1].title : ''}<br/>
                {item ? Math.floor(item.nutrition.nutrients[8].amount) : ''}
                {item ? item.nutrition.nutrients[8].unit : ''}{" "}
                {item ? item.nutrition.nutrients[8].title : ''}
              </h1>
              <br />
              <br />
              <strong>Smart Point Score: </strong>
              <h1>{item ? item.weightWatcherSmartPoints + " points" : ''}</h1>
            </div>
            <br />
            <br />
            <br />
            <div className={style.dish}>
              <div>
                <strong>Can Be Had for ?</strong>
                <br/><br/>
              </div>
              
              {item
                ? item.dishTypes.map((val, idx) => {
                    return <h4 key={idx}>{val}</h4>;
                  })
                : ''}
            </div>
          </div>
          <div className={style.containerSection}>
            <div style={{textAlign: 'center'}}>
            <h1>Ingredients</h1>
            </div>

            <br />
            <br />
            <br />

            <div className={style.slideIngredients}>
              {item
                ? <div className={style.ingredientList}>
                  {item.extendedIngredients.map((val, idx) => {
                    return (
                      <label className={style.ingredientsSection} key={idx}>
                        <br />
                        <li>{val.original}</li>
                        <input className={style.checkbox}  type='checkbox' />
                      </label>
                    );
                  })}
                  </div>
                : ''}
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <Footer />
    </>
  );
}

export default SearchItemPage;
