import React, { useState } from 'react';
import '../styles/SeatBooking.css';

const SeatBooking = () => {
  // Initialize seats: 6 rows with 7 seats, 1 row with 3 seats
  const initialRows = [];
  for (let row = 1; row <= 6; row++) {
    initialRows.push({
      rowNumber: row,
      seats: Array(7).fill(false) // false means seat is available
    });
  }
  // Add row 7 with 3 seats
  initialRows.push({
    rowNumber: 7,
    seats: Array(3).fill(false)
  });

  const [rows, setRows] = useState(initialRows);
  const [passengerCount, setPassengerCount] = useState(1);

  const allocateSeats = () => {
    const count = parseInt(passengerCount);
    const newRows = JSON.parse(JSON.stringify(rows)); // Deep clone

    // Special case: if booking exactly 3 seats, prioritize row 7 first
    if (count === 3) {
      const row7 = newRows[6];
      const availableSeats = row7.seats.filter(seat => !seat).length;
      
      if (availableSeats >= 3) {
        // Book first 3 available seats in row 7
        let booked = 0;
        for (let i = 0; i < row7.seats.length && booked < 3; i++) {
          if (!row7.seats[i]) {
            row7.seats[i] = true;
            booked++;
          }
        }
        setRows(newRows);
        return;
      }
    }

    // Normal case: search sequentially from first row to last
    for (let row of newRows) {
      let consecutiveAvailable = 0;
      let startIndex = -1;
      
      for (let i = 0; i < row.seats.length; i++) {
        if (!row.seats[i]) {
          if (startIndex === -1) startIndex = i;
          consecutiveAvailable++;
          
          if (consecutiveAvailable === count) {
            // Book the seats
            for (let j = startIndex; j < startIndex + count; j++) {
              row.seats[j] = true;
            }
            setRows(newRows);
            return;
          }
        } else {
          consecutiveAvailable = 0;
          startIndex = -1;
        }
      }
    }

    // If no consecutive seats found, try to book individual seats
    if (count === 1) {
      for (let row of newRows) {
        for (let i = 0; i < row.seats.length; i++) {
          if (!row.seats[i]) {
            row.seats[i] = true;
            setRows(newRows);
            return;
          }
        }
      }
    }

    alert("No suitable seats available for this group size.");
  };

  const resetSeats = () => {
    setRows(initialRows.map(row => ({
      rowNumber: row.rowNumber,
      seats: row.seats.map(() => false)
    })));
  };

  return (
    <div className="seat-booking">
      <h2>Smart Ticket Booking System</h2>
      
      <div className="controls">
        <label htmlFor="passengerCount">Select number of passengers (1–7):</label>
        <select 
          id="passengerCount" 
          value={passengerCount}
          onChange={(e) => setPassengerCount(e.target.value)}
        >
          {[1, 2, 3, 4, 5, 6, 7].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        <button onClick={allocateSeats}>Book Seats</button>
        <button onClick={resetSeats}>Reset All</button>
      </div>

      <div className="seating-area">
        {rows.map(row => (
          <div key={row.rowNumber} className="row">
            <strong>Row {row.rowNumber}:</strong>
            {row.seats.map((seat, index) => (
              <div 
                key={`row-${row.rowNumber}-seat-${index+1}`}
                className={`seat ${seat ? 'filled' : 'vacant'}`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatBooking;