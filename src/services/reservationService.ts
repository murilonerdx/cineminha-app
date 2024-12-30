import { Seat } from '../types/cinema';

// Simulating API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class ReservationService {
  static async reserveSeats(theaterId: number, seatIds: number[]): Promise<boolean> {
    // Simulate API call
    await delay(1500);
    
    // Simulate 90% success rate
    const isSuccess = Math.random() < 0.9;
    
    if (!isSuccess) {
      throw new Error('Failed to reserve seats. Please try again.');
    }
    
    return true;
  }
}
