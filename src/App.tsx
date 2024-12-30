import React, {useEffect, useState} from 'react';
import {TheaterSelector} from './components/TheaterSelector';
import {movies} from './services/movieService';
import {TheaterSeats} from './components/TheaterSeats';
import {theaters} from './utils/theaterData';
import {Seat, TheaterSelection} from './types/cinema';
import {ReservationService} from './services/reservationService';
import {toast} from './components/ui/Toast';
import {Movie} from "./types/movie";

export default function App() {
    const [data, setData] = useState<Movie[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/filmes')
            .then(response => response.json())
            .then(json => {
                const dataObjects: Movie[] = json.map((item: any) => ({
                    id: item.id,
                    title: item.nome, // Assuming 'titulo' is the title in the API response
                    duration: item.duracao, // Assuming 'duracao' is the duration in minutes
                    posterUrl: item.posterUrl,
                    synopsis: item.sinopse,
                    rating: item.classificacao,
                    genre: item.generos,
                    theater: item?.salas?.flatMap((s :any)=> ({
                        id: s.id,
                        name: s.nome,
                        rows: s.cadeiraPorFileira,
                        seatsPerRow: s.capacidade,
                        seats: s.assentos.map((seat :any)=> ({
                            id: seat?.id,
                            row: seat?.coluna,
                            number: seat?.numero,
                            status: !seat?.reservada ? 'available' : 'reserved'
                        })),
                    })),
                }));
                setData(dataObjects);

                console.log(dataObjects)
            })
            .catch(error => console.error(error));
    }, []);


    const [selection, setSelection] = useState<TheaterSelection>({
        theaterId: data[0]?.id,
        selectedSeats: [],
    });
    const [isReserving, setIsReserving] = useState(false);

    const selectedTheater = data.find((t) => t.id === selection.theaterId)!;

    const handleTheaterSelect = (theaterId: number) => {
        setSelection({theaterId, selectedSeats: []});
    };

    const handleSeatClick = (seatId: number) => {
        setSelection((prev) => ({
            ...prev,
            selectedSeats: prev.selectedSeats.includes(seatId)
                ? prev.selectedSeats.filter((id) => id !== seatId)
                : [...prev.selectedSeats, seatId],
        }));
    };

    const handleReservation = async () => {
        if (isReserving) return;

        setIsReserving(true);
        try {
            await ReservationService.reserveSeats(selection.theaterId, selection.selectedSeats);

            // Update local state to mark seats as reserved
            const updatedTheater = data.find(t => t.id === selection.theaterId);
            if (updatedTheater) {
                selection.selectedSeats.forEach(seatId => {
                    let seat = updatedTheater.theater.flatMap(sala => sala.seats.find(s => s.id === seatId));
                    if (seat.length != 0) {
                        seat.map(s => s!.status = 'reserved')
                    }
                });
            }

            setSelection(prev => ({...prev, selectedSeats: []}));
            toast.success('Seats reserved successfully!');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to reserve seats');
        } finally {
            setIsReserving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-2 text-gray-900">
                    Cinema Seat Reservation
                </h1>
                <p className="text-center text-gray-600 mb-12">
                    Select your preferred theater and seats
                </p>

                <TheaterSelector
                    theaters={data}
                    selectedTheaterId={selection.theaterId}
                    onTheaterSelect={handleTheaterSelect}
                />


                {selectedTheater?.theater.map((t, index) => (
                    <TheaterSeats
                        theater={t}
                        selectedSeats={selection?.selectedSeats}
                        onSeatClick={handleSeatClick}
                        onReserve={handleReservation}
                        isReserving={isReserving}
                    />
                ))}



            </div>
        </div>
    );
}
