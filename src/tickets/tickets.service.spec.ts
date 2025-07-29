import { Test, TestingModule } from '@nestjs/testing';
import { TicketsService } from './tickets.service';

describe('TicketsService', () => {
  let service: TicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketsService],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
  });

  describe('Sorting', () => {
    it('should return empty array if no tickets', () => {
      // @ts-ignore: access private method for test
      expect(service['sortTickets']([])).toEqual([]);
    });

    it('should return tickets as is if no valid start found (circular)', () => {
      const tickets = [
        { id: '1', type: 'bus', from: 'A', to: 'B', details: {} },
        { id: '2', type: 'bus', from: 'B', to: 'A', details: {} },
      ];
      // @ts-ignore: access private method for test
      expect(service['sortTickets'](tickets)).toEqual(tickets);
    });

    it('should handle single ticket', () => {
      const tickets = [
        { id: '1', type: 'taxi', from: 'X', to: 'Y', details: {} },
      ];
      // @ts-ignore: access private method for test
      expect(service['sortTickets'](tickets)).toEqual(tickets);
    });

    it('should sort tickets into correct order', () => {
      const tickets = [
        { id: '1', type: 'train', from: 'B', to: 'C', details: {} },
        { id: '2', type: 'train', from: 'A', to: 'B', details: {} },
        { id: '3', type: 'train', from: 'C', to: 'D', details: {} },
      ];
      // @ts-ignore: access private method for test
      const sorted = service['sortTickets'](tickets);
      expect(sorted.map((t) => t.from)).toEqual(['A', 'B', 'C']);
      expect(sorted.map((t) => t.to)).toEqual(['B', 'C', 'D']);
    });
  });

  describe('Human-readable itinerary', () => {
    it('should return human-readable steps for a train ticket', () => {
      const tickets = [
        {
          id: '1',
          type: 'train',
          from: 'A',
          to: 'B',
          details: { trainNumber: 'T123', platform: '1', seatNumber: '10A' },
        },
      ];
      // Store itinerary
      const { itineraryId } = service.sortAndStoreItinerary(tickets);
      const steps = service.getHumanReadableItinerary(itineraryId);
      expect(steps).toEqual([
        'Start.',
        '1. Board train T123, Platform 1 from A to B. Seat number 10A.',
        'Last destination reached.',
      ]);
    });

    it('should return human-readable steps for mixed tickets', () => {
      const tickets = [
        { id: '1', type: 'bus', from: 'A', to: 'B', details: {} },
        {
          id: '2',
          type: 'tram',
          from: 'B',
          to: 'C',
          details: { tramNumber: 'TR1' },
        },
        {
          id: '3',
          type: 'flight',
          from: 'C',
          to: 'D',
          details: {
            flightNumber: 'FL1',
            gate: '5',
            seatNumber: '22B',
            luggage: 'Self-check-in',
          },
        },
      ];
      const { itineraryId } = service.sortAndStoreItinerary(tickets);
      const steps = service.getHumanReadableItinerary(itineraryId);
      expect(steps).toEqual([
        'Start.',
        '1. Board the bus from A to B.',
        '2. Board the Tram TR1 from B to C.',
        '3. From C, board the flight FL1 to D from gate 5, seat 22B. Self-check-in.',
        'Last destination reached.',
      ]);
    });

    it('should return empty array for unknown itinerary id', () => {
      expect(service.getHumanReadableItinerary('unknown')).toBeUndefined();
    });
  });
});
