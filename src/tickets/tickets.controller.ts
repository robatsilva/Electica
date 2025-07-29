import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { SortTicketsDto } from './dto/sort-tickets.dto';
import { SortedTicketsResponseDto } from './dto/sorted-tickets-response.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post('itinerary')
  createItinerary(
    @Body() sortTicketsDto: SortTicketsDto,
  ): SortedTicketsResponseDto {
    return this.ticketsService.sortAndStoreItinerary(sortTicketsDto.tickets);
  }

  @Get('itinerary/:id')
  getItinerary(@Param('id') id: string): SortedTicketsResponseDto {
    const itinerary = this.ticketsService.getItineraryById(id);
    if (!itinerary) {
      throw new NotFoundException('Itinerary not found');
    }
    return { itineraryId: id, sortedTickets: itinerary };
  }

  @Get('itinerary/:id/human')
  getHumanItinerary(@Param('id') id: string) {
    const steps = this.ticketsService.getHumanReadableItinerary(id);
    if (!steps) {
      throw new NotFoundException('Itinerary not found');
    }
    return { itineraryId: id, steps };
  }
}
