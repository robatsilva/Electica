import { Ticket } from './ticket.interface';

export type TicketFormatter = (ticket: Ticket, idx: number) => string;

export const formatters: Record<string, TicketFormatter> = {
  train: (ticket, idx) => {
    let step = `${idx + 1}. Board train ${ticket.details?.trainNumber ?? ticket.id}`;
    if (ticket.details?.platform)
      step += `, Platform ${ticket.details.platform}`;
    step += ` from ${ticket.from} to ${ticket.to}.`;
    if (ticket.details?.seatNumber)
      step += ` Seat number ${ticket.details.seatNumber}.`;
    return step;
  },
  tram: (ticket, idx) => {
    return `${idx + 1}. Board the Tram ${ticket.details?.tramNumber ?? ticket.id} from ${ticket.from} to ${ticket.to}.`;
  },
  bus: (ticket, idx) => {
    let step = `${idx + 1}. Board the bus from ${ticket.from} to ${ticket.to}.`;
    if (ticket.details?.seatNumber)
      step += ` Seat number ${ticket.details.seatNumber}.`;
    return step;
  },
  flight: (ticket, idx) => {
    let step = `${idx + 1}. From ${ticket.from}, board the flight ${ticket.details?.flightNumber ?? ticket.id} to ${ticket.to}`;
    if (ticket.details?.gate) step += ` from gate ${ticket.details.gate}`;
    if (ticket.details?.seatNumber)
      step += `, seat ${ticket.details.seatNumber}`;
    if (ticket.details?.luggage) step += `. ${ticket.details.luggage}`;
    step += '.';
    return step;
  },
};

export const defaultFormatter: TicketFormatter = (ticket, idx) => {
  return `${idx + 1}. Travel from ${ticket.from} to ${ticket.to}.`;
};
