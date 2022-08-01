import React from 'react';

import PropTypes from 'prop-types';

import { transformTime } from '../../../helpers';

import classes from './Ticket.module.scss';

export const countTransfer = (count) => {
  switch (count) {
    case 0:
      return 'без пересадок';
    case 1:
      return '1 пересадка';
    case 2:
      return '2 пересадки';
    case 3:
      return '3 пересадки';
    default:
      return '';
  }
};

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

const Ticket = ({
  timeBackTransfer,
  backStops,
  price,
  carrier,
  comeOrigin,
  comeDestination,
  comeDuration,
  comeStops,
  timeComeTransfer,
  backOrigin,
  backDestination,
  backDuration,
}) => {
  return (
    <div className={classes.ticket}>
      <div className={classes['ticket__header']}>
        <span className={classes['ticket__price']}>{price} Р </span>
        <span className={classes['ticket__logo']}>
          <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="logo" />
        </span>
      </div>
      <TicketInfo
        origin={comeOrigin}
        destination={comeDestination}
        duration={transformTime(comeDuration)}
        stops={comeStops}
        stopsLength={countTransfer(comeStops.length)}
        arrivalTime={timeComeTransfer}
      />
      <TicketInfo
        origin={backOrigin}
        destination={backDestination}
        duration={transformTime(backDuration)}
        stops={backStops}
        stopsLength={countTransfer(backStops.length)}
        arrivalTime={timeBackTransfer}
      />
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

Ticket.propTypes = {
  timeBackTransfer: PropTypes.string,
  backStops: PropTypes.array,
  price: PropTypes.number,
  carrier: PropTypes.string,
  comeOrigin: PropTypes.string,
  comeDestination: PropTypes.string,
  comeDuration: PropTypes.number,
  comeStops: PropTypes.array,
  timeComeTransfer: PropTypes.string,
  backOrigin: PropTypes.string,
  backDestination: PropTypes.string,
  backDuration: PropTypes.number,
};
export default Ticket;
