import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ticketGenerator } from '../helpers';

export const fetchSearchId = createAsyncThunk(
  'tickets/fetchSearchId',
  async function (_, { rejectWithValue }) {
    try {
      const res = await fetch('https://aviasales-test-api.kata.academy/search');
      if (!res.ok) {
        throw new Error('Could not fetch key to API!');
      }
      return await res.json();
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchTickets = createAsyncThunk(
  'todos/fetchTodos',
  async function requestData(_, { rejectWithValue, getState }) {
    const id = getState().tickets.searchId;
    try {
      const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`);
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }
      return await res.json();
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    countTicketsOnPage: 5,
    loading: false,
    isData: false,
    tabs: {
      price: true,
      duration: false,
      optimum: false,
    },
    filterTransfer: {
      all: true,
      nonStop: true,
      one: true,
      two: true,
      three: true,
    },
    arrayFilter: [0, 1, 2, 3],
    errorId: false,
    errorTickets: false,
    searchId: null,
    statusError: 0,
  },
  reducers: {
    allTabsFalse(state, action) {
      if (state.tabs[action.payload] === false) {
        Object.keys(state.tabs)
          .filter((item) => item !== action.payload)
          .map((item) => (state.tabs[item] = false));
        state.tabs[action.payload] = true;
      }
    },
    sortTicketsTabs(state, action) {
      state.tickets = action.payload;
    },
    addCountTickets(state) {
      state.countTicketsOnPage += 5;
    },
    switchAllFilter(state) {
      state.filterTransfer.all = !state.filterTransfer.all;

      if (state.filterTransfer.all) {
        for (let key in state.filterTransfer) {
          state.filterTransfer[key] = true;
          state.arrayFilter = [0, 1, 2, 3];
        }
      } else {
        for (let key in state.filterTransfer) {
          state.filterTransfer[key] = false;
          state.arrayFilter = [];
        }
      }
    },
    switchFilter(state, action) {
      state.filterTransfer[action.payload.name] = !state.filterTransfer[action.payload.name];
      if (state.filterTransfer[action.payload.name]) {
        state.arrayFilter.push(action.payload.value);
      } else {
        state.onAllFilters = false;
        state.filterTransfer.all = false;
        state.arrayFilter = state.arrayFilter.filter((value) => value !== action.payload.value);
      }
      state.filterTransfer.all =
        state.filterTransfer.nonStop &&
        state.filterTransfer.three &&
        state.filterTransfer.two &&
        state.filterTransfer.one;
    },
  },
  extraReducers: {
    [fetchSearchId.pending]: (state) => {
      state.loading = true;
      state.errorId = false;
    },
    [fetchSearchId.fulfilled]: (state, action) => {
      state.loading = false;
      state.searchId = action.payload.searchId;
    },
    [fetchSearchId.rejected]: (state) => {
      state.loading = false;
      state.errorId = true;
    },
    [fetchTickets.pending]: (state) => {
      state.loading = true;
      state.errorTickets = false;
    },
    [fetchTickets.fulfilled]: (state, action) => {
      state.tickets = [...state.tickets, ...action.payload.tickets.map(ticketGenerator)];
      state.isData = action.payload.stop;
      state.loading = !action.payload.stop;
    },
    [fetchTickets.rejected]: (state, action) => {
      if (action.payload === '500') {
        state.statusError += 1;
      } else {
        state.loading = false;
        state.errorTickets = true;
      }
    },
  },
});

export const { addCountTickets, allTabsFalse, sortTicketsTabs, switchAllFilter, switchFilter } =
  ticketsSlice.actions;
export default ticketsSlice.reducer;
