import { Ticket } from '../ticket.interface';
import { ApiProperty } from '@nestjs/swagger';

export class SortTicketsDto {
  @ApiProperty({ type: [Object], description: 'Array of tickets to sort' })
  tickets: Ticket[];
}
