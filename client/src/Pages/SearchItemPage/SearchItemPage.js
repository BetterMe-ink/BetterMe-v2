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

    const user = useSelector(state => state.user.user);

    const addFav = async () => {
        await axios.post(`http://localhost:4000/favorites/${user.user_id}/create`, {
            food_id: id
        })
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    return (
        <>
            <Nav />
                <div className={style.containerMain}>
                    <div className={style.main}>
                        <div className={style.SearchItemPage}>
                            <div className={style.col1}>
                                <img src={item ? item.image : ''} alt={item ? item.name : ''} />
                                { user ? <button onClick={addFav}>Add to your recipes List</button> : '' }
                            </div>

                            <div className={style.col2}>

                                <h1 className={style.title}>{item ? item.title : ''}</h1>
                                <br />
                                <h1>* {item ? item.sourceName : ''}</h1>
                                <br />
                                <br />
                                <p className={style.summary}>{item &&item ? parse(item.summary) : ''}</p>
                                <br /><br />
                            </div>
                        </div>
                        <div className={style.container}>
                            <div>
                                <h1>Vegetarian: {item && item.vegetarian ? 'Yes' : 'No' }</h1>
                                <br /><br /><br />
                                <h1>Dairy Free: {item && item.dairyFree ? 'Yes' : 'No' }</h1>
                                <br /><br /><br />
                                <h1>Vegan: {item && item.vegan ? 'Yes' : 'No' }</h1>
                            </div>
                            <div>
                                <h1>weight per Serving: {item ? item.nutrition.weightPerServing.amount : ''}{item ? item.nutrition.weightPerServing.unit : ''}</h1>
                                <br /><br /><br />
                                <h1>Time to make: {item ? item.readyInMinutes : ''} min</h1>
                                <br /><br /><br />
                                <h1>Price per serving: ${item ? item.pricePerServing : ''}</h1>
                            </div>
                            <br /><br /><br />
                        </div>
                        <div className={style.containerSection}>
                            <h1>Can Be Had for ?</h1>
                            <div className={style.dish}>
                                {item ? item.dishTypes.map((val, idx) => {
                                    return <h4 key={idx}>{val}</h4>
                                }) : ''}
                            </div>

                            <br /><br /><br />


                            <h1>Ingredients</h1>
                            <div className={style.slideIngredients}>
                                {item ? item.extendedIngredients.map((val, idx) => {
                                    return (
                                        <div className={style.ingredientsSection} key={idx}>
                                            <br />
                                            <li>{val.original}</li>
                                            <input type='radio' />
                                        </div>
                                    )
                                }) : ''}
                            </div>
                        </div>
                    </div>
                </div>
                <br /><br /><br />
            <Footer />
        </>
    )
}

export default SearchItemPage;
