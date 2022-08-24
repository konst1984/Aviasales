import React from 'react';

import PropTypes from 'prop-types';

import classes from '../Tabs/Tabs.module.scss';

const Tab = ({ name, eventClick, text }) => {
  return (
    <button className={name ? `${classes.tab} ${classes.focus}` : classes.tab} onClick={eventClick}>
      {text}
    </button>
  );
};

Tab.propTypes = {
  name: PropTypes.bool,
  eventClick: PropTypes.func,
  text: PropTypes.string,
};

export default Tab;
