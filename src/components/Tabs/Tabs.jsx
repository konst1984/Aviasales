import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { sortTicketsPrice, sortTicketsDuration, sortTicketsOptimum, allTabsFalse } from '../../reducers/ticketsSlice';

import Tab from './Tab';
import classes from './Tabs.module.scss';

const Tabs = () => {
  const dispatch = useDispatch();
  const { price, duration, optima } = useSelector((state) => state.tickets.tabs);

  const sortTickets = (name, func) => {
    dispatch(allTabsFalse(name));
    dispatch(func());
  };

  return (
    <div className={classes.tabs}>
      <Tab name={price} text="самый дешевый" eventClick={() => sortTickets('price', sortTicketsPrice)} />
      <Tab name={duration} text="самый быстрый" eventClick={() => sortTickets('duration', sortTicketsDuration)} />
      <Tab name={optima} text="оптимальный" eventClick={() => sortTickets('optima', sortTicketsOptimum)} />
    </div>
  );
};

export default Tabs;
