import { configureStore } from '@reduxjs/toolkit';

import ticketsReducer from '../reducers/ticketsSlice';

export default configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
});
