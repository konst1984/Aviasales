import React from 'react';

import { useSelector } from 'react-redux';

import preloader from '../../../assests/images/745.gif';
import classes from '../TicketsList.module.scss';

const Preloader = () => {
  const loading = useSelector((state) => state.tickets.loading);

  return (
    <>
      {loading ? (
        <div className={classes.preloader}>
          <img src={preloader} alt="preloader" />
        </div>
      ) : null}
    </>
  );
};

export default Preloader;
