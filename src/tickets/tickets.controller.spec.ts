import { Test, TestingModule } from '@nestjs/testing';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { NotFoundException } from '@nestjs/common';

describe('TicketsController', () => {
  let controller: TicketsController;
  let service: TicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsController],
      providers: [TicketsService],
    }).compile();

    controller = module.get<TicketsController>(TicketsController);
    service = module.get<TicketsService>(TicketsService);
  });

  describe('createItinerary', () => {
    it('should create and return a sorted itinerary', () => {
      const tickets = [
        { id: '1', type: 'train', from: 'B', to: 'C' },
        { id: '2', type: 'train', from: 'A', to: 'B' },
        { id: '3', type: 'train', from: 'C', to: 'D' },
      ];
      const dto = { tickets };
      const result = controller.createItinerary(dto);
      expect(result.sortedTickets.map((t) => t.from)).toEqual(['A', 'B', 'C']);
      expect(result.sortedTickets.map((t) => t.to)).toEqual(['B', 'C', 'D']);
      expect(result.itineraryId).toBeDefined();
    });
  });

  describe('getItinerary', () => {
    it('should return the itinerary by id', () => {
      const tickets = [
        { id: '1', type: 'bus', from: 'A', to: 'B' },
        { id: '2', type: 'bus', from: 'B', to: 'C' },
      ];
      const { itineraryId } = controller.createItinerary({ tickets });
      const result = controller.getItinerary(itineraryId);
      expect(result.sortedTickets.length).toBe(2);
      expect(result.itineraryId).toBe(itineraryId);
    });

    it('should throw NotFoundException for unknown id', () => {
      expect(() => controller.getItinerary('unknown')).toThrow(
        NotFoundException,
      );
    });
  });

  describe('getHumanItinerary', () => {
    it('should return human-readable steps', () => {
      const tickets = [
        { id: '1', type: 'bus', from: 'A', to: 'B' },
        { id: '2', type: 'bus', from: 'B', to: 'C' },
      ];
      const { itineraryId } = controller.createItinerary({ tickets });
      const result = controller.getHumanItinerary(itineraryId);
      expect(result.itineraryId).toBe(itineraryId);
      expect(Array.isArray(result.steps)).toBe(true);
      expect(result.steps[0]).toBe('Start.');
    });

    it('should throw NotFoundException for unknown id', () => {
      expect(() => controller.getHumanItinerary('unknown')).toThrow(
        NotFoundException,
      );
    });
  });
});
