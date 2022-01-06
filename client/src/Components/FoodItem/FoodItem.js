import './FoodItem.scss';
import { useNavigate } from 'react-router-dom';

function FoodItem(props) {
  const navigate = useNavigate();
  return (
    <div className={'FoodItem-main'}>
      <img className={'FoodItem-img'} src={props.image} alt="" />
      <h1>{props.name}</h1>
      <button
        className={'FoodItem-btn'}
        onClick={() => navigate(`/search/${props.id}`)}
      >
        See More
      </button>
    </div>
  );
}

export default FoodItem;
