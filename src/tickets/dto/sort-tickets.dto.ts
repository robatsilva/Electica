import { Ticket } from '../ticket.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class TicketDetailsSchema {
  @ApiPropertyOptional({
    example: '45B',
    description: 'Seat number (optional)',
  })
  seatNumber?: string;

  @ApiPropertyOptional({ example: '1', description: 'Platform (optional)' })
  platform?: string;

  @ApiPropertyOptional({ example: '22', description: 'Gate (optional)' })
  gate?: string;

  @ApiPropertyOptional({
    example: 'Red suitcase',
    description: 'Luggage (optional)',
  })
  luggage?: string;

  // Additional arbitrary fields are not represented in Swagger, but allowed by the interface
}

class TicketSchema implements Ticket {
  @ApiProperty({ example: '123', description: 'Unique ticket ID' })
  id: string;

  @ApiProperty({
    example: 'train',
    description: 'Type of transit',
    enum: ['train', 'tram', 'bus', 'flight'],
    type: String,
  })
  type: 'train' | 'tram' | 'bus' | 'flight' | string;

  @ApiProperty({ example: 'Madrid', description: 'Origin location' })
  from: string;

  @ApiProperty({ example: 'Barcelona', description: 'Destination location' })
  to: string;

  @ApiPropertyOptional({
    type: TicketDetailsSchema,
    description: 'Additional details (optional)',
  })
  details?: TicketDetailsSchema;
}

export class SortTicketsDto {
  @ApiProperty({
    type: [TicketSchema],
    description: 'Array of tickets to be sorted',
    example: [
      {
        id: '1',
        type: 'train',
        from: 'Madrid',
        to: 'Barcelona',
        details: {
          seatNumber: '45B',
          platform: '1',
        },
      },
      {
        id: '2',
        type: 'flight',
        from: 'Barcelona',
        to: 'London',
        details: {
          gate: '22',
          luggage: 'Baggage drop at ticket counter 344',
        },
      },
    ],
  })
  tickets: Ticket[];
}
