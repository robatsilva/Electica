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

  it('should be defined', () => {
    expect(service).toBeDefined();
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
