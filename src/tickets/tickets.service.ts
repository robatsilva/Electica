import { Injectable } from '@nestjs/common';
import { Ticket } from './ticket.interface';
import { SortedTicketsResponseDto } from './dto/sorted-tickets-response.dto';
import { formatters, defaultFormatter } from './formatters';

@Injectable()
export class TicketsService {
  private itineraries: Map<string, Ticket[]> = new Map();

  sortAndStoreItinerary(tickets: Ticket[]): SortedTicketsResponseDto {
    const sortedTickets = this.sortTickets(tickets);
    const itineraryId = this.generateItineraryId();
    this.itineraries.set(itineraryId, sortedTickets);
    return { itineraryId, sortedTickets };
  }

  getItineraryById(id: string): Ticket[] | undefined {
    return this.itineraries.get(id);
  }

  getHumanReadableItinerary(id: string): string[] | undefined {
    const tickets = this.getItineraryById(id);
    if (!tickets) return undefined;
    const steps: string[] = [];
    if (tickets.length === 0) return steps;
    steps.push('Start.');
    tickets.forEach((ticket, idx) => {
      const formatter = formatters[ticket.type] || defaultFormatter;
      steps.push(formatter(ticket, idx));
    });
    steps.push('Last destination reached.');
    return steps;
  }

  private sortTickets(tickets: Ticket[]): Ticket[] {
    if (!tickets || tickets.length === 0) return [];
    const fromMap = new Map<string, Ticket>();
    const toSet = new Set<string>();
    for (const ticket of tickets) {
      fromMap.set(ticket.from, ticket);
      toSet.add(ticket.to);
    }
    let start: Ticket | undefined = undefined;
    for (const ticket of tickets) {
      if (!toSet.has(ticket.from)) {
        start = ticket;
        break;
      }
    }
    if (!start) return tickets;
    const sorted: Ticket[] = [];
    let current: Ticket | undefined = start;
    while (current) {
      sorted.push(current);
      current = fromMap.get(current.to);
    }
    return sorted;
  }

  private generateItineraryId(): string {
    return Math.random().toString(36).substring(2, 10);
  }
}
