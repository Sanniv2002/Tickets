import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import VirtualTicket from './components/VirtualTicket';
import { Toaster } from 'react-hot-toast';

export type TicketData = {
  name: string;
  email: string;
  ticketNumber: string;
  degree: string;
  year: string;
  branch: string;
};

function App() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/ticket" element={<VirtualTicket />} />
      </Routes>
    </div>
  );
}

export default App;