import './InfoCard.scss';
import Icon from '@mdi/react';

import { mdiFoodForkDrink } from '@mdi/js';

import { mdiNutrition } from '@mdi/js';

import { mdiShieldSearch } from '@mdi/js';

import { mdiBottleTonicPlusOutline } from '@mdi/js';

import { mdiWeightLifter } from '@mdi/js';

function InfoCard({ data }) {
  return (
    <div className={'InfoCard-Card'}>
      <div className={'InfoCard-svgSection'}>
        <div
          className={`${'InfoCard-svgDiv'} ${
            data.idx === 1
              ? 'InfoCard-searchDiv'
              : data.idx === 2
              ? 'InfoCard-gymDiv'
              : data.idx === 3
              ? 'InfoCard-healthDiv'
              : data.idx === 4
              ? 'InfoCard-plannerDiv'
              : 'InfoCard-nutritionDiv'
          }`}
        >
          <Icon
            path={`${
              data.idx === 1
                ? mdiShieldSearch
                : data.idx === 2
                ? mdiWeightLifter
                : data.idx === 3
                ? mdiBottleTonicPlusOutline
                : data.idx === 4
                ? mdiFoodForkDrink
                : mdiNutrition
            }`}
            size={1.5}
            className={`${
              data.idx === 1
                ? 'InfoCard-search'
                : data.idx === 2
                ? 'InfoCard-gym'
                : data.idx === 3
                ? 'InfoCard-health'
                : data.idx === 4
                ? 'InfoCard-planner'
                : 'InfoCard-nutrition'
            }`}
          />
        </div>
      </div>

      <div className={'InfoCard-info'}>
        <h1>{data.title}</h1>
        <p>{data.txt}</p>
      </div>
    </div>
  );
}

export default InfoCard;
