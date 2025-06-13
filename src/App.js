import React from 'react';
import SeatBooking from './components/SeatBooking';

// Simple App component that does nothing but render SeatBooking
function App() {
  return (
    <div className="app" style={{ minHeight: '100vh' }}>
      <SeatBooking />
    </div>
  );
}

export default App;