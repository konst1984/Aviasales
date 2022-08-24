import React, { memo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { switchFilter, switchAllFilter } from '../../reducers/ticketsSlice';
import Checkbox from '../Checkbox';

import classes from './Filter.module.scss';

const Filter = memo(() => {
  const dispatch = useDispatch();
  let { all, nonStop, one, two, three } = useSelector((state) => state.tickets.filterTransfer);

  return (
    <div className={classes.filter}>
      <p className={classes.title}>Количество пересадок</p>
      <Checkbox text={'Все'} eventChange={() => dispatch(switchAllFilter())} check={all} />
      <Checkbox
        text={'Без пересадок'}
        eventChange={() => dispatch(switchFilter({ name: 'nonStop', value: 0 }))}
        check={nonStop}
      />
      <Checkbox
        text={'1 пересадка'}
        eventChange={() => dispatch(switchFilter({ name: 'one', value: 1 }))}
        check={one}
      />
      <Checkbox
        text={'2 пересадки'}
        eventChange={() => dispatch(switchFilter({ name: 'two', value: 2 }))}
        check={two}
      />
      <Checkbox
        text={'3 пересадки'}
        eventChange={() => dispatch(switchFilter({ name: 'three', value: 3 }))}
        check={three}
      />
    </div>
  );
});

export default Filter;
