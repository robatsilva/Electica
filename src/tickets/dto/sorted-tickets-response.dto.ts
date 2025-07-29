import { Ticket } from '../ticket.interface';
import { ApiProperty } from '@nestjs/swagger';

export class SortedTicketsResponseDto {
  @ApiProperty({ description: 'Unique identifier for the itinerary' })
  itineraryId: string;

  @ApiProperty({ type: [Object], description: 'Sorted tickets' })
  sortedTickets: Ticket[];
}
