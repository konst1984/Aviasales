import { Alert } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import preloader from '../../assests/images/745.gif';
import { filteredElem } from '../../helpers';
import Button from '../Button';

import 'antd/dist/antd.min.css';
import Ticket from './Ticket';
import classes from './TicketsList.module.scss';

const TicketsList = ({ tickets, loading }) => {
  const count = useSelector((state) => state.tickets.countTicketsOnPage);
  const { all } = useSelector((state) => state.tickets.filterTransfer);
  const arrayFilter = useSelector((state) => state.tickets.arrayFilter);

  const filteredTickets = tickets.filter((ticket) => filteredElem(ticket, all, arrayFilter, 'comeStops'));

  const sliceTickets = filteredTickets
    .map((ticket) => {
      return <Ticket key={ticket.id} {...ticket} />;
    })
    .slice(0, count);

  return (
    <div className={classes['tickets-list']}>
      {!loading ? (
        <div className={classes.preloader}>
          <img src={preloader} alt="preloader" />
        </div>
      ) : null}
      {sliceTickets.length === 0 && loading ? (
        <Alert className={classes.alert} message="No flights found matching your filters" type="info" />
      ) : (
        sliceTickets
      )}
      {filteredTickets.length > count && <Button />}
    </div>
  );
};

TicketsList.defaultProps = {
  tickets: [],
};

TicketsList.propTypes = {
  tickets: PropTypes.array,
  loading: PropTypes.bool,
};

export default TicketsList;
