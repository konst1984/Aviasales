import React from 'react';

import classes from '../Filter.module.scss';

const Checkbox = ({ text, eventChange, check }) => {
  return (
    <label className={classes.label}>
      {text}
      <input className={classes.input} type="checkbox" onChange={eventChange} checked={check} />
      <span className={classes.checkbox}></span>
    </label>
  );
};

export default Checkbox;
