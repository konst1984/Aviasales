import React from 'react';

import { Alert } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Ticket from '../Ticket';
import classes from '../TicketsList.module.scss';

const FilteredTickets = ({ filteredTickets }) => {
  const { loading, errorId, errorTickets } = useSelector((state) => state.tickets);
  const count = useSelector((state) => state.tickets.countTicketsOnPage);

  const sliceTickets = filteredTickets
    .map((ticket) => {
      return <Ticket key={ticket.id} {...ticket} />;
    })
    .slice(0, count);

  return (
    <>
      {errorId ? (
        <Alert className={classes['alert-error']} message="Data receive key" type="error" />
      ) : errorTickets ? (
        <Alert
          className={classes['alert-error']}
          message="Data receive tickets list"
          type="error"
        />
      ) : sliceTickets.length === 0 && !loading ? (
        <Alert
          className={classes.alert}
          message="No flights found matching your filters"
          type="info"
        />
      ) : (
        sliceTickets
      )}
    </>
  );
};

FilteredTickets.defaultProps = {
  filteredTickets: [],
};

FilteredTickets.propTypes = {
  filteredTickets: PropTypes.array,
};

export default FilteredTickets;
