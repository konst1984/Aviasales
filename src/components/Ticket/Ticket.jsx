import React from 'react';

import PropTypes from 'prop-types';

import { transformTime, countTransfer } from '../../helpers';
import TicketInfo from '../TicketInfo';

import classes from './Ticket.module.scss';

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
