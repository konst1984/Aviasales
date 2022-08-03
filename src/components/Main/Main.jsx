import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.min.css';

import { fetchSearchId, fetchTickets } from '../../reducers/ticketsSlice';
import Filter from '../Filter';
import Tabs from '../Tabs';
import TicketsList from '../TicketsList';

import classes from './Main.module.scss';

const Main = () => {
  const dispatch = useDispatch();
  const { isData, searchId, statusError, tickets } = useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(fetchSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (searchId && !isData) {
      dispatch(fetchTickets());
    }
  }, [dispatch, tickets, isData, statusError, searchId]);

  return (
    <div className={classes.main}>
      <Filter />
      <Tabs />
      <TicketsList />
    </div>
  );
};

export default Main;
