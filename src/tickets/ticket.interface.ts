export interface Ticket {
  id: string;
  type: 'train' | 'tram' | 'bus' | 'flight' | string;
  from: string;
  to: string;
  details?: {
    seatNumber?: string;
    platform?: string;
    gate?: string;
    luggage?: string;
    [key: string]: any;
  };
}
