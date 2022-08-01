import React, { useState, useEffect } from 'react';

import { Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.min.css';

import { getId } from '../../api';
import { ticketGenerator } from '../../helpers';
import { addAllTickets, sortTicketsDuration, sortTicketsOptimum, sortTicketsPrice } from '../../reducers/ticketsSlice';
import Filter from '../Filter';
import Tabs from '../Tabs';
import TicketsList from '../TicketsList';

import classes from './Main.module.scss';

const Main = () => {
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.tickets);
  const tabs = useSelector((state) => state.tickets.tabs);

  useEffect(() => {
    getId()
      .then((data) => setSearchId(data.searchId))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const sortInNowTime = () => {
    if (tabs['price']) {
      return dispatch(sortTicketsPrice());
    } else if (tabs['duration']) {
      return dispatch(sortTicketsDuration());
    } else if (tabs['optima']) {
      return dispatch(sortTicketsOptimum());
    }
  };

  useEffect(() => {
    if (searchId && loading === false) {
      const subscribe = async () => {
        try {
          let response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
          if (response.status === 500) {
            await subscribe();
          } else {
            let ticketsPack = await response.json();
            if (ticketsPack.stop) {
              setLoading(true);
            }
            const arrayTickets = ticketsPack.tickets.map(ticketGenerator);
            dispatch(addAllTickets(arrayTickets));
            sortInNowTime();
            setError(false);
          }
        } catch (e) {
          console.log(e);
          setError(true);
        }
      };
      subscribe();
    }
    // console.log(tickets);
  }, [searchId, tickets, loading, error]);

  return (
    <div className={classes.main}>
      <Filter />
      <Tabs />
      {error ? (
        <Alert className={classes['alert-error']} message="Data receive error" type="error" />
      ) : (
        <TicketsList tickets={tickets} loading={loading} />
      )}
    </div>
  );
};

export default Main;
