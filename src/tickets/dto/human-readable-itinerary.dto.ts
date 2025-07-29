import { ApiProperty } from '@nestjs/swagger';

export class HumanReadableItineraryDto {
  @ApiProperty({ description: 'Unique identifier for the itinerary' })
  itineraryId: string;

  @ApiProperty({
    type: [String],
    description: 'Human-readable steps of the itinerary',
  })
  steps: string[];
}
