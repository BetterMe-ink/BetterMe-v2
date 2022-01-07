import React from 'react';
import './ExerciseItem.scss';

import { useNavigate } from 'react-router-dom';

function ExerciseItem(props) {
  const navigate = useNavigate();

  return (
    <div className={'ExerciseItem-main'}>
      <img className={'ExerciseItem-img'} src={props.image} alt='' />
      <div>
        <h1>{props.name}</h1>
        <h2>{props.equipment} exercise</h2>
        <h2>For: {props.target}</h2>
        <h2>Helps with your {props.bodyPart}</h2>
      </div>
      <button className={'ExerciseItem-btn'} onClick={() => alert('Coming soon!')}>
        See More
      </button>
    </div>
  );
}

export default ExerciseItem;
