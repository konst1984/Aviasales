import { createSlice } from '@reduxjs/toolkit';

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    countTicketsOnPage: 5,
    tabs: {
      price: true,
      duration: false,
      optima: false,
    },
    filterTransfer: {
      all: true,
      nonStop: true,
      one: true,
      two: true,
      three: true,
    },
    arrayFilter: [0, 1, 2, 3],
  },
  reducers: {
    addAllTickets(state, action) {
      state.tickets = [...state.tickets, ...action.payload];
    },
    allTabsFalse(state, action) {
      if (state.tabs[action.payload] === false) {
        Object.keys(state.tabs)
          .filter((item) => item !== action.payload)
          .map((item) => (state.tabs[item] = false));
        state.tabs[action.payload] = true;
      }
    },
    sortTicketsPrice(state) {
      if (state.tabs.price) {
        state.tickets = state.tickets.sort((prev, next) => prev.price - next.price);
      }
    },
    sortTicketsDuration(state) {
      if (state.tabs.duration) {
        state.tickets = state.tickets.sort(
          (prev, next) => prev.comeDuration + prev.backDuration - (next.comeDuration + next.backDuration)
        );
      }
    },
    sortTicketsOptimum(state) {
      const sumTicketParam = (el) => {
        return el.price + el.comeDuration + el.backDuration;
      };
      if (state.tabs.optima) {
        state.tickets = state.tickets.sort((prev, next) => sumTicketParam(prev) - sumTicketParam(next));
      }
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
});

export const {
  sortTicketsPrice,
  sortTicketsDuration,
  addAllTickets,
  addCountTickets,
  sortTicketsOptimum,
  allTabsFalse,
  switchAllFilter,
  switchFilter,
} = ticketsSlice.actions;
export default ticketsSlice.reducer;
