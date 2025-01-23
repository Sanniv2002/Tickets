import { Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import VirtualTicket from './components/VirtualTicket';
import { Toaster } from 'react-hot-toast';
import { PaymentPage } from './components/PaymentPage';
import ThankYouPage from './components/ThankYouPage';

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
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<ThankYouPage />} />
      </Routes>
    </div>
  );
}

export default App;