import React from 'react';

import classes from '../Ticket.module.scss';
import PropTypes from 'prop-types';

const TicketInfo = ({ origin, destination, duration, stops, stopsLength, arrivalTime }) => {
  return (
    <div className={classes['ticket__main']}>
      <div className={classes['ticket__section']}>
        <span className={classes['ticket__column-name']}>
          {origin}-{destination}
        </span>
        <span className={classes['ticket__column-info']}>{arrivalTime}</span>
      </div>
      <div className={classes['ticket__section']}>
        <span className={classes['ticket__column-name']}>В пути</span>
        <span className={classes['ticket__column-info']}>{duration}</span>
      </div>
      <div className={classes['ticket__section']}>
        <span className={classes['ticket__column-name']}>{stopsLength}</span>
        <span className={classes['ticket__column-info']}>{stops.join(', ')}</span>
      </div>
    </div>
  );
};

TicketInfo.propTypes = {
  origin: PropTypes.string,
  destination: PropTypes.string,
  duration: PropTypes.string,
  stops: PropTypes.array,
  stopsLength: PropTypes.string,
  arrivalTime: PropTypes.string,
};

export default TicketInfo;
