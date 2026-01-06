
import React from 'react';
import HistoryPageContent from '../../components/HistoryPage';
import { Booking } from '../../types';

interface HistoryPageProps {
  bookings: Booking[];
  onCancel: (id: string) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ bookings, onCancel }) => {
  return <HistoryPageContent bookings={bookings} onCancel={onCancel} />;
};

export default HistoryPage;
