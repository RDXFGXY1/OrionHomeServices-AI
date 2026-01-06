
import React from 'react';
import ExpertDetailPageContent from '../../components/ExpertDetailPage';
import { Expert, Message } from '../../types';

interface ExpertDetailPageProps {
  expert: Expert;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  onBook: () => void;
  onBack: () => void;
  chatHistory: Message[];
  onAddMessage: (msg: Message) => void;
}

const ExpertDetailPage: React.FC<ExpertDetailPageProps> = ({ 
  expert, 
  isFavorited, 
  onToggleFavorite, 
  onBook, 
  onBack,
  chatHistory,
  onAddMessage
}) => {
  return (
    <ExpertDetailPageContent 
      expert={expert} 
      isFavorited={isFavorited} 
      onToggleFavorite={onToggleFavorite} 
      onBook={onBook} 
      onBack={onBack}
      chatHistory={chatHistory}
      onAddMessage={onAddMessage}
    />
  );
};

export default ExpertDetailPage;
