import { addMinutes } from 'date-fns';

const ticketGenerator = (function transformTicket() {
  let idTick = 1;
  return function (ticket) {
    return {
      id: idTick++,
      price: ticket.price,
      carrier: ticket.carrier,
      comeOrigin: ticket.segments[0].origin,
      comeDestination: ticket.segments[0].destination,
      comeDuration: ticket.segments[0].duration,
      comeStops: ticket.segments[0].stops,
      timeComeTransfer: transferTime(ticket.segments[0].date, ticket.segments[0].duration),
      backOrigin: ticket.segments[1].origin,
      backDestination: ticket.segments[1].destination,
      backDuration: ticket.segments[1].duration,
      backStops: ticket.segments[1].stops,
      timeBackTransfer: transferTime(ticket.segments[1].date, ticket.segments[1].duration),
    };
  };
})();

const transformTime = (time) => {
  const hours = transformString(parseInt(String(time / 60)));
  const minutes = transformString(time - hours * 60);
  return `${hours}ч ${minutes}м`;
};

const transformString = (el) => {
  return String(el).padStart(2, '0');
};

const transferTime = (date, min) => {
  const hoursLeave = transformString(new Date(date).getHours());
  const minutesLeave = transformString(new Date(date).getMinutes());
  const hoursArrival = transformString(addMinutes(new Date(date), min).getHours());
  const minutesArrival = transformString(addMinutes(new Date(date), 1198).getMinutes());
  return `${hoursLeave}:${minutesLeave} - ${hoursArrival}:${minutesArrival}`;
};

const filteredElem = (elem, commonParam, arrayValues, param1, param2) => {
  if (!commonParam) {
    return arrayValues.includes(elem[param1].length || elem[param2].length);
  }
  return true;
};

const countTransfer = (value) => {
  switch (value) {
    case 0:
      return 'без пересадок';
    case 1:
      return '1 пересадка';
    case 2:
      return '2 пересадки';
    case 3:
      return '3 пересадки';
    default:
      return '';
  }
};

const sortUponLoading = (var1, var2, var3, arr) => {
  if (arr) {
    const arrayForSort = [...arr];
    if (var1) {
      return arrayForSort.sort((prev, next) => prev.price - next.price);
    } else if (var2) {
      return arrayForSort.sort(
        (prev, next) =>
          prev.comeDuration + prev.backDuration - (next.comeDuration + next.backDuration)
      );
    } else if (var3) {
      return arrayForSort.sort(
        (prev, next) =>
          prev.price +
          prev.comeDuration +
          prev.backDuration -
          (next.price + next.comeDuration + next.backDuration)
      );
    }
  }
};

export { ticketGenerator, transformTime, filteredElem, countTransfer, sortUponLoading };
