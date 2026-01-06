
export enum SeverityLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  EMERGENCY = 'Emergency'
}

export type ViewState = 'home' | 'browse' | 'scan' | 'expert-detail' | 'history' | 'profile' | 'wallet' | 'support' | 'safety' | 'shop' | 'projects' | 'membership' | 'learning' | 'insurance' | 'ai-consult' | 'partner-onboarding' | 'inbox' | 'rewards' | 'analytics' | 'security-hub' | 'documents' | 'community';

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface CostLineItem {
  item: string;
  price: number;
  isLabor: boolean;
}

export interface DiagnosticResult {
  issueName: string;
  description: string;
  steps: string[];
  safetyWarnings: string[];
  expertCategory: string;
  severity: SeverityLevel;
  estimatedCostRange: string;
  costBreakdown: {
    parts: CostLineItem[];
    labor: CostLineItem;
    totalEstimate: number;
    savingsWithMembership: number;
  };
  requiresExpert: boolean;
}

export interface ProBrief {
  technicalSummary: string;
  suggestedTools: string[];
  partsRequired: string[];
  expertInstructions: string;
}

export interface Expert {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  category: string;
  avatar: string;
  isVerified: boolean;
  pricePerHour: number;
  description: string;
  availability: string[];
  skills: string[];
  location: string;
  serviceRadius: number; 
  yearsOfExperience: number;
  completedJobs: number;
  languages: string[];
  responseTime: string;
  certifications: string[];
  badges: string[];
}

export interface Booking {
  id: string;
  expertId: string;
  expertName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'expert';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
}

// --- NEGOTIATOR TYPES ---
export interface NegotiationLog {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface NegotiationResult {
  bestMatch: Expert;
  negotiatedPrice: number;
  negotiatedTime: string;
  savingsFound: number;
  summary: string;
}
