import { Injectable } from '@nestjs/common';
import { Ticket } from './ticket.interface';
import { SortedTicketsResponseDto } from './dto/sorted-tickets-response.dto';

@Injectable()
export class TicketsService {
  getHumanReadableItinerary(id: string): string[] | undefined {
    const tickets = this.getItineraryById(id);
    if (!tickets) return undefined;
    const steps: string[] = [];
    if (tickets.length === 0) return steps;
    steps.push('Start.');
    tickets.forEach((ticket, idx) => {
      let step = `${idx + 1}. `;
      switch (ticket.type) {
        case 'train':
          step += `Board train ${ticket.details?.trainNumber ?? ticket.id}`;
          if (ticket.details?.platform)
            step += `, Platform ${ticket.details.platform}`;
          step += ` from ${ticket.from} to ${ticket.to}.`;
          if (ticket.details?.seatNumber)
            step += ` Seat number ${ticket.details.seatNumber}.`;
          break;
        case 'tram':
          step += `Board the Tram ${ticket.details?.tramNumber ?? ticket.id} from ${ticket.from} to ${ticket.to}.`;
          break;
        case 'bus':
          step += `Board the bus from ${ticket.from} to ${ticket.to}.`;
          if (ticket.details?.seatNumber)
            step += ` Seat number ${ticket.details.seatNumber}.`;
          break;
        case 'flight':
          step += `From ${ticket.from}, board the flight ${ticket.details?.flightNumber ?? ticket.id} to ${ticket.to}`;
          if (ticket.details?.gate) step += ` from gate ${ticket.details.gate}`;
          if (ticket.details?.seatNumber)
            step += `, seat ${ticket.details.seatNumber}`;
          if (ticket.details?.luggage) step += `. ${ticket.details.luggage}`;
          step += '.';
          break;
        default:
          step += `Travel from ${ticket.from} to ${ticket.to}.`;
      }
      steps.push(step);
    });
    steps.push('Last destination reached.');
    return steps;
  }
  private itineraries: Map<string, Ticket[]> = new Map();

  sortAndStoreItinerary(tickets: Ticket[]): SortedTicketsResponseDto {
    // TODO: Implement sorting algorithm
    const sortedTickets = this.sortTickets(tickets);
    const itineraryId = this.generateItineraryId();
    this.itineraries.set(itineraryId, sortedTickets);
    return { itineraryId, sortedTickets };
  }

  getItineraryById(id: string): Ticket[] | undefined {
    return this.itineraries.get(id);
  }

  private sortTickets(tickets: Ticket[]): Ticket[] {
    if (!tickets || tickets.length === 0) return [];

    // Map from 'from' to ticket
    const fromMap = new Map<string, Ticket>();
    // Set of all 'to' locations
    const toSet = new Set<string>();

    for (const ticket of tickets) {
      fromMap.set(ticket.from, ticket);
      toSet.add(ticket.to);
    }

    // Find the starting ticket (whose 'from' is not any 'to')
    let start: Ticket | undefined = undefined;
    for (const ticket of tickets) {
      if (!toSet.has(ticket.from)) {
        start = ticket;
        break;
      }
    }
    if (!start) return tickets; // fallback: return as is

    // Chain tickets
    const sorted: Ticket[] = [start];
    let current = start;
    while (true) {
      const next = tickets.find((t) => t.from === current.to);
      if (!next) break;
      sorted.push(next);
      current = next;
    }
    return sorted;
  }

  private generateItineraryId(): string {
    return Math.random().toString(36).substring(2, 10);
  }
}
