import React from 'react';

import { useDispatch } from 'react-redux';

import { addCountTickets } from '../../reducers/ticketsSlice';

import classes from './Button.module.scss';

const Button = () => {
  const dispatch = useDispatch();
  return (
    <button type="button" className={classes['button-more']} onClick={() => dispatch(addCountTickets())}>
      Показать еще 5 билетов
    </button>
  );
};

export default Button;
