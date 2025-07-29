import { Ticket } from '../ticket.interface';

export class SortedTicketsResponseDto {
  itineraryId: string;
  sortedTickets: Ticket[];
}
