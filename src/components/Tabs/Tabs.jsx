import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { sortUponLoading } from '../../helpers';
import { allTabsFalse, sortTicketsTabs } from '../../reducers/ticketsSlice';

import Tab from './Tab';
import classes from './Tabs.module.scss';

const Tabs = () => {
  const dispatch = useDispatch();
  const { price, duration, optimum } = useSelector((state) => state.tickets.tabs);
  const { tickets } = useSelector((state) => state.tickets);
  const sortOnParam = sortUponLoading(price, duration, optimum, tickets);
  const sortTickets = (name, func, arr) => {
    dispatch(allTabsFalse(name));
    dispatch(func(arr));
  };

  return (
    <div className={classes.tabs}>
      <Tab
        name={price}
        text="самый дешевый"
        eventClick={() => sortTickets('price', sortTicketsTabs, sortOnParam)}
      />
      <Tab
        name={duration}
        text="самый быстрый"
        eventClick={() => sortTickets('duration', sortTicketsTabs, sortOnParam)}
      />
      <Tab
        name={optimum}
        text="оптимальный"
        eventClick={() => sortTickets('optimum', sortTicketsTabs, sortOnParam)}
      />
    </div>
  );
};

export default Tabs;
