import { useSelector } from 'react-redux';

import { filteredElem, sortUponLoading } from '../../helpers';
import Button from '../Button';
import FilteredTickets from '../FilteredTickets';
import Preloader from '../Preloader';

import classes from './TicketsList.module.scss';

const TicketsList = () => {
  const count = useSelector((state) => state.tickets.countTicketsOnPage);
  const { all } = useSelector((state) => state.tickets.filterTransfer);
  const { arrayFilter, tickets } = useSelector((state) => state.tickets);
  const { price, duration, optimum } = useSelector((state) => state.tickets.tabs);

  const sortTickets = sortUponLoading(price, duration, optimum, tickets);

  let filteredTickets = sortTickets.filter((ticket) =>
    filteredElem(ticket, all, arrayFilter, 'comeStops', 'backStops')
  );

  return (
    <div className={classes['tickets-list']}>
      <Preloader />
      <FilteredTickets filteredTickets={filteredTickets} />
      {filteredTickets.length > count && <Button />}
    </div>
  );
};

export default TicketsList;
