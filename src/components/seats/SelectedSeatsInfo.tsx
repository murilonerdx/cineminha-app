import React, {useEffect, useState} from 'react';
import { Theater } from '../../types/cinema';
import { calculateTotal } from '../../utils/seatUtils';

interface SelectedSeatsInfoProps {
  theater: Theater;
  selectedSeats: number[];
}

export function SelectedSeatsInfo({ theater, selectedSeats }: SelectedSeatsInfoProps) {
  const [reservationStatus, setReservationStatus] = useState(''); // State to store reservation message
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const error = urlParams.get('error');

    if (success === 'true') {
      setReservationStatus('Reservation successful!'); // Update state with success message
    } else if (error === 'true') {
      // Exibir mensagem de erro
      setReservationStatus('Reservation failed. Please try again.'); // Update state with error message
    }
  }, []);

  if (selectedSeats.length === 0) return null;
    // const [reservationStatus, setReservationStatus] = useState('');
    let selectedSeatsDisplay = selectedSeats
        .map((seatId) => {
          const seat = theater.seats.find((s) => s.id === seatId);
          return seat ? `${seat.row}${seat.number}` : '';
        });

    const total = calculateTotal(selectedSeats.length);

    const handleReserveSeats = async () => {
      // Prepare reservation data (assuming seat IDs are required)
      const reservationData = {
        cpf: 'cpf-exemplo',
        numeroCadeira: selectedSeatsDisplay,
      };

      try {
        const response = await fetch("http://localhost:8080/api/v1/reservas?idSala=" + theater.id, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reservationData),
        });

        if (!response.ok) {
          throw new Error(`Reservation failed with status: ${response.status}`);
        }


        selectedSeats
            .forEach((seatId) => {
              const seat = theater.seats.find((s) => s.id === seatId);
              theater.seats = theater.seats.map(t => {
                if(t == seat){
                  t.status = 'reserved'
                }
                return t
              })
            });
        selectedSeats = []
        selectedSeatsDisplay = []

        if (response.ok) {
          window.location.href = '/confirmation'; // Redireciona para a página de confirmação
        }
      } catch (error) {
        console.error('Reservation error:', error);
      }
    };



  return (
    <div className="border-t border-gray-100 pt-6 text-center">
      <div className="space-y-4">
        <div>
          <p className="text-gray-600 font-medium">Selected Seats</p>
          <p className="text-lg font-semibold text-gray-900 mt-1">
            {selectedSeatsDisplay}
          </p>
        </div>
        
        <div>
          <p className="text-gray-600 font-medium">Total</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            ${total.toFixed(2)}
          </p>
        </div>

        <button
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                     transition-colors font-semibold shadow-lg shadow-blue-600/20
                     hover:shadow-blue-600/30 transform hover:-translate-y-0.5"
            onClick={handleReserveSeats}
        >
          Reserve Seats
        </button>

        {reservationStatus && (
            <div className="alert alert-success">
              {reservationStatus}
            </div>
        )}
      </div>
    </div>
  );
}
