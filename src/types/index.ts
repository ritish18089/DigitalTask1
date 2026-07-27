export type LeadStatus = 'NEW' | 'CONTACTED' | 'CLOSED';

export interface Lead {
  id: number;
  name: string;
  email: string;
  budget: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}
