import { Movie, Session, MovieSession } from '../types/movie';
import {generateTheater} from "../utils/theaterData";

export const movies: Movie[] = [
  {
    id: 'm1',
    title: 'Dune: Part Two',
    duration: 166,
    posterUrl: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?auto=format&fit=crop&q=80',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    rating: 'PG-13',
    genre: ['Science Fiction', 'Adventure', 'Drama'],
    theater: generateTheater('1', 'Theater 1', 8, 12)
  },
  {
    id: 'm2',
    title: 'Poor Things',
    duration: 141,
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80',
    synopsis: 'The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.',
    rating: 'R',
    genre: ['Drama', 'Romance', 'Sci-Fi'],
    theater: generateTheater('1', 'Theater 1', 2, 11)
  },
  {
    id: 'm3',
    title: 'Kung Fu Panda 4',
    duration: 94,
    posterUrl: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80',
    synopsis: 'Po must train a new warrior when he is chosen to become the spiritual leader of the Valley of Peace.',
    rating: 'PG',
    genre: ['Animation', 'Action', 'Comedy'],
    theater: generateTheater('1', 'Theater 1', 8, 10)
  }
];

const sessions: Session[] = [
  // Dune: Part Two Sessions
  {
    id: 's1',
    movieId: 'm1',
    theaterId: '1',
    format: 'IMAX 3D',
    startTime: '2024-03-21T14:30:00Z',
    endTime: '2024-03-21T17:16:00Z',
    price: { standard: 24.99, student: 19.99 },
    language: 'English',
    subtitled: false
  },
  {
    id: 's2',
    movieId: 'm1',
    theaterId: '2',
    format: '3D',
    startTime: '2024-03-21T16:00:00Z',
    endTime: '2024-03-21T18:46:00Z',
    price: { standard: 19.99, student: 15.99 },
    language: 'English',
    subtitled: true
  },
  // Poor Things Sessions
  {
    id: 's3',
    movieId: 'm2',
    theaterId: '3',
    format: 'VIP',
    startTime: '2024-03-21T19:00:00Z',
    endTime: '2024-03-21T21:21:00Z',
    price: { standard: 29.99, student: 24.99 },
    language: 'English',
    subtitled: false
  },
  // Kung Fu Panda 4 Sessions
  {
    id: 's4',
    movieId: 'm3',
    theaterId: '1',
    format: '3D',
    startTime: '2024-03-21T13:00:00Z',
    endTime: '2024-03-21T14:34:00Z',
    price: { standard: 17.99, student: 13.99 },
    language: 'English',
    subtitled: false
  }
];

export class MovieService {
  static async getMovies(): Promise<Movie[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return movies;
  }

  static async getMovie(id: string): Promise<Movie | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return movies.find(m => m.id === id);
  }

  static async getSessions(movieId?: string): Promise<MovieSession[]> {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const filteredSessions = movieId 
      ? sessions.filter(s => s.movieId === movieId)
      : sessions;

    return filteredSessions.map(session => ({
      ...session,
      movie: movies.find(m => m.id === session.movieId)!
    }));
  }

  static async getSession(id: string): Promise<MovieSession | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const session = sessions.find(s => s.id === id);
    if (!session) return undefined;

    return {
      ...session,
      movie: movies.find(m => m.id === session.movieId)!
    };
  }
}
