import React from 'react';
import style from './Background.module.scss';
const Background = ({ children }) => {
  return <div className={style.bg}>{children}</div>;
};

export default Background;
